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
  fetchUser: async () => {
    set({ isLoading: true, error: null, fetchingUser: true });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/fetch-user`,
        { withCredentials: true }
      );
      const { user } = response;
      set({ user, isLoading: false, fetchingUser: false });
      return user;
    } catch (error) {
      set({
        error: error.response.data.message,
        fetchingUser: false,
        isLoading: false,
      });
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/logout`);
      set({ user: null, error: null, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message,
        fetchingUser: false,
        isLoading: false,
      });
    }
  },
}));
