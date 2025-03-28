import axiosInstance from "./axiosInstance";

export const categoryService = {
  getCategory: async () => {
    try {
      const response = await axiosInstance.get("/categories");
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to fetch category");
    }
  },

  addCategory: async (categoryData) => {
    try {
      const response = await axiosInstance.post("/categories", categoryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to add category");
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const response = await axiosInstance.put(
        `/categories/${id}`,
        categoryData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to update category");
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await axiosInstance.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to delete category");
    }
  },
};
