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
  signUp: async (formData) => {
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

    }
  },
  signIn: async (formData) => {
    set({ isLoading: true, message: null, error: null });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/signin`,
        formData,
        { withCredentials: true }
      );

      const { user, message } = response.data;
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
      const { user } = response.data;

      set({ user, isLoading: false, fetchingUser: false });
      return user;
    } catch (error) {
      set({
        fetchingUser: false,
        error: error.response.data.message || "Error fetching user",
        user: null,
        isLoading: false,
      });
    }
  },
  logOut: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/logout`,
        { withCredentials: true }
      );
      set({
        user: null,
        error: null,
        isLoading: false,
        message: response.data.message,
      });
      return response.data.message;
    } catch (error) {
      set({
        error: null,
        fetchingUser: false,
        isLoading: false,
      });
    }
  },
}));
