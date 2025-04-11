import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./useAuthStore";

const useUserStore = create((set, get) => ({
    userId: null,  
    likedSongs: [],

    setUserId: (id) => set({ userId: id }), 
    fetchLikedSongs: async () => {
        const { userId } = get();  
        if (!userId) return;

        try {
            const response = await axios.get(`/like/liked-songs/${userId}`);
            set({ likedSongs: response.data.likedSongs });
        } catch (error) {
            console.error("Error fetching liked songs:", error);
        }
    },

    likeSong: async (songId) => {
        const { userId, likedSongs } = get();
        if (!userId) return;

        try {
            await axios.post(`/like/liked-songs/${userId}`, { songId });
            set({ likedSongs: [...likedSongs, songId] });
        } catch (error) {
            console.error("Error liking song:", error);
        }
    },

    unlikeSong: async (songId) => {
        const { userId, likedSongs } = get();
        if (!userId) return;

        try {
            await axios.post(`/like/unlike-song/${userId}`, { songId });
            set({ likedSongs: likedSongs.filter((id) => id !== songId) });
        } catch (error) {
            console.error("Error unliking song:", error);
        }
    },
}));

export default useUserStore;
