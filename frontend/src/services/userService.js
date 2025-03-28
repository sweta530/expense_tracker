import axiosInstance from "./axiosInstance";

export const userService = {
  getUsers: async () => {
    try {
      const response = await axiosInstance.get("/users");
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to fetch users");
    }
  },

  addUser: async (userData) => {
    try {
      const response = await axiosInstance.post("/users", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to add user");
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to update user");
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to delete user");
    }
  },
};
