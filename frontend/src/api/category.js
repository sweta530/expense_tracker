import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../services/categoryService";

const GET_ALL_CATEGORYS_KEY = ["get-all-category"];

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: GET_ALL_CATEGORYS_KEY,
    queryFn: () => categoryService.getCategory(),
    select: (data) => data?.data,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_ALL_CATEGORYS_KEY });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => categoryService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_ALL_CATEGORYS_KEY });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_ALL_CATEGORYS_KEY });
    },
  });
};
