import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { expenseService } from "../services/expenseService";

const GET_ALL_EXPENSES_KEY = ({
  limit,
  page,
  user_id,
  category,
  start_date,
  end_date,
}) => [
  "get-all-expenses",
  { limit, page, user_id, category, start_date, end_date },
];
const GET_EXPENSE_BY_ID_KEY = (expenseId) => ["get-expense-by-id", expenseId];
const GET_TOP_SPENDING_DAYS_KEY = ["top-spending-days"];
const GET_MONTHLY_EXPENDITURE_CHANGE_KEY = ["monthly-expenditure-change"];
const GET_EXPENDITURE_PREDICTION_KEY = ["expenditure-prediction"];

export const useGetAllExpenses = ({
  limit,
  page,
  user_id,
  category,
  start_date,
  end_date,
}) => {
  return useQuery({
    queryKey: GET_ALL_EXPENSES_KEY({
      limit,
      page,
      user_id,
      category,
      start_date,
      end_date,
    }),
    queryFn: () =>
      expenseService.getExpenses({
        limit,
        page,
        ...(user_id && { user_id }),
        ...(category && { category }),
        ...(start_date && { start_date }),
        ...(end_date && { end_date }),
      }),
    select: (data) => data?.data,
  });
};

export const useGetExpenseById = (expenseId) => {
  return useQuery({
    queryKey: GET_EXPENSE_BY_ID_KEY(expenseId),
    queryFn: () => expenseService.getExpensesById(expenseId),
  });
};

export const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => expenseService.addExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-expenses"] });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => expenseService.updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-expenses"] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => expenseService.deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-expenses"] });
    },
  });
};

export const useGetTopSpendingDays = () => {
  return useQuery({
    queryKey: GET_TOP_SPENDING_DAYS_KEY,
    queryFn: () => expenseService.getTopSpendingDays(),
  });
};

export const useGetMonthlyExpenditureChange = () => {
  return useQuery({
    queryKey: GET_MONTHLY_EXPENDITURE_CHANGE_KEY,
    queryFn: () => expenseService.getMonthlyExpenditureChange(),
  });
};

export const useGetExpenditurePrediction = () => {
  return useQuery({
    queryKey: GET_EXPENDITURE_PREDICTION_KEY,
    queryFn: () => expenseService.getExpenditurePrediction(),
  });
};
