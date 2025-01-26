import {create} from "zustand";
export const useMusicStore = create ((set) => ({
    currentPlayingID: null,
    setCurrentPlayingID: (id) => set({currentPlayingID: id}),
    likedSongs: [],
    addToLikedSongs: (song) => set((state) => ({ likedSongs: [...state.likedSongs, song] })),
    removeFromLikedSongs: (songID) => set((state) => ({
        likedSongs: state.likedSongs.filter((song) => song.id !== songID),
    })),
}))