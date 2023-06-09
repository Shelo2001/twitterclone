import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Search } from "semantic-ui-react";
import { useAuth } from "../services/auth";
import axios from "axios";
import Pusher from "pusher-js";

const Navbar = () => {
    const { logout } = useAuth();

    const logoutHandler = () => {
        logout();
    };
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_BASE_API_URL
                    }/users/search?query=${searchQuery}`
                );
                const fetchedSuggestions = response.data;
                setSuggestions(fetchedSuggestions);
            } catch (error) {
                console.error(error);
            }
        };

        if (searchQuery) {
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    const handleSearchChange = ({ value }) => {
        setSearchQuery(value);
    };

    const handleResultSelect = ({ result }) => {
        window.location.href = `/profile/${result.suggestion.fullname}/${result.suggestion.id}`;
    };
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        var pusher = new Pusher("ad0b65d72f5bb275e8ce", {
            cluster: "eu",
        });

        const channel = pusher.subscribe(`notification.${user?.fullname}`);
        channel.bind(`notification`, function (data) {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                data,
            ]);
        });
    }, []);

    console.log(notifications);

    return (
        <div className="navbar">
            <div>
                <Link to="/">
                    <img src="" />
                </Link>
            </div>
            <div>
                <Search
                    value={searchQuery}
                    onSearchChange={handleSearchChange}
                    onResultSelect={handleResultSelect}
                    results={suggestions.map((suggestion) => ({
                        title: `${suggestion.fullname} @${suggestion.username}`,
                        suggestion,
                    }))}
                    placeholder="Search users..."
                />
            </div>
            <div>
                <Button
                    onClick={logoutHandler}
                    circular
                    icon="logout"
                    color="blue"
                />
            </div>
        </div>
    );
};

export default Navbar;
