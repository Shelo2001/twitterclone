import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useAuth = create(
    devtools((set) => ({
        user: {},
        token: null,
        loading: false,
        errorUser: null,
        login: async (data) => {
            try {
                set({ loading: true });
                const res = await axios.post(
                    `${import.meta.env.VITE_BASE_API_URL}/login`,
                    data
                );
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                set({ user: await res.data.user, token: await res.data.token });
                window.location.href = "/";
            } catch (error) {
                set({
                    errorUser:
                        (await error?.response?.data?.error) ||
                        (await error?.response?.data?.message),
                });
                setTimeout(() => {
                    set({
                        errorUser: null,
                    });
                }, 3000);
            }
        },
        register: async (data) => {
            try {
                set({ loading: true });
                const res = await axios.post(
                    `${import.meta.env.VITE_BASE_API_URL}/register`,
                    data
                );
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                set({ user: await res.data.user, token: await res.data.token });
                window.location.href = "/";
            } catch (error) {
                set({
                    errorUser:
                        (await error?.response?.data?.error) ||
                        (await error?.response?.data?.message),
                    loading: false,
                });
                setTimeout(() => {
                    set({
                        errorUser: null,
                    });
                }, 3000);
            }
        },
        logout: async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/logout`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data.message === "Successfully logged out") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
            }
        },
        getUserProfile: async (id) => {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/profile/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            set({
                user: res.data.user,
            });
        },
    }))
);
