import axiosInstance from "./axiosInstance";

export const expenseService = {
  getExpenses: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/expenses?${queryParams}`;

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to fetch expenses");
    }
  },

  getExpensesById: async (id) => {
    try {
      const response = await axiosInstance.get("/expenses/" + id);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to fetch expenses");
    }
  },

  addExpense: async (expenseData) => {
    try {
      const response = await axiosInstance.post("/expenses", expenseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to add expense");
    }
  },

  updateExpense: async (id, expenseData) => {
    try {
      const response = await axiosInstance.put(`/expenses/${id}`, expenseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to update expense");
    }
  },

  deleteExpense: async (id) => {
    try {
      const response = await axiosInstance.delete(`/expenses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Failed to delete expense");
    }
  },

  getTopSpendingDays: async () => {
    try {
      const response = await axiosInstance.get("/expenses/stats/top-days");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || new Error("Failed to fetch top spending days")
      );
    }
  },

  getMonthlyExpenditureChange: async () => {
    try {
      const response = await axiosInstance.get(
        "/expenses/stats/monthly-change"
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        new Error("Failed to fetch monthly expenditure change")
      );
    }
  },

  getExpenditurePrediction: async () => {
    try {
      const response = await axiosInstance.get("/expenses/stats/predict");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        new Error("Failed to fetch expenditure prediction")
      );
    }
  },
};
