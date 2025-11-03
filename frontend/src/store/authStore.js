import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  // initial states
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  // functions
  signup: async (formData) => {
    set({ isLoading: true, message: null });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/signup`,
        formData
      );
      console.log(response);
      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      console.log(error.response.data.message);
      set({
        isLoading: false,
        error: error.response.data.message || "Error Signing Up",
        message: null,
      });

      throw error;
    }
  },
}));
