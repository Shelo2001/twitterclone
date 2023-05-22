import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const usePosts = create(
    devtools((set) => ({
        loading: false,
        myPosts: [],
        errorPost: null,
        createPost: async (data) => {
            try {
                set({ loading: true });
                const token = localStorage.getItem("token");
                const res = await axios.post(
                    `${import.meta.env.VITE_BASE_API_URL}/post/create`,
                    data,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (res.data) {
                    set({ loading: false });
                }
            } catch (error) {
                set({
                    errorPost:
                        (await error?.response?.data?.error) ||
                        (await error?.response?.data?.message),
                });
                setTimeout(() => {
                    set({
                        errorPost: null,
                    });
                }, 3000);
            }
        },

        getMyPosts: async (id) => {
            set({ loading: true });
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/post/myposts/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            set({ loading: false, myPosts: res.data });
        },

        likeOrUnlikePost: async (data) => {
            set({ loading: true });
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/post/like`,
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            set({ loading: false });
        },

        createComment: async (data) => {
            try {
                set({ loading: true });
                const token = localStorage.getItem("token");
                const res = await axios.post(
                    `${import.meta.env.VITE_BASE_API_URL}/post/comment/create`,
                    data,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (res.data) {
                    set({ loading: false });
                }
            } catch (error) {
                set({
                    errorPost:
                        (await error?.response?.data?.error) ||
                        (await error?.response?.data?.message),
                });
                setTimeout(() => {
                    set({
                        errorPost: null,
                    });
                }, 3000);
            }
        },
    }))
);
