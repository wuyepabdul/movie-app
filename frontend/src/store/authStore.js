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
        formData,
        { withCredentials: true }
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
  signin: async (formData) => {
    set({ isLoading: true, message: null, error: null });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/signin`,
        formData,
        { withCredentials: true }
      );

      const { user, message } = response;
      set({
        user,
        isLoading: false,
        message,
      });

      return { user, message };
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },
}));
