import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  userId: localStorage.getItem("userId") || null,
  accessToken: localStorage.getItem("accessToken") || null,

  login: async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password });

      if (response.data.userId && response.data.accessToken) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("accessToken", response.data.accessToken);

        set(() => ({
          userId: response.data.userId,
          accessToken: response.data.accessToken,
        }));
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  },

  logout: () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");

    set(() => ({
      userId: null,
      accessToken: null,
    }));
  },
}));

export default useAuthStore;
