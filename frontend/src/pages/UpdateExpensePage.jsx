import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  useGetExpenseById,
  useUpdateExpense,
  useGetAllUsers,
  useGetAllCategory,
} from "../api";
import { expenseSchema } from "../utils/validationSchema";
import { AddUserModal, AddCategoryModal } from "../components";

export function UpdateExpensePage() {
  const { expenseId } = useParams();
  const navigate = useNavigate();

  const { data: expense, isLoading } = useGetExpenseById(expenseId);
  const { data: categories = [] } = useGetAllCategory();
  const { data: usersData = [] } = useGetAllUsers();
  const { mutateAsync: updateExpense } = useUpdateExpense();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(expenseSchema),
    defaultValues: {
      user_id: "",
      category: "",
      amount: "",
      date: "",
      description: "",
    },
  });

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    if (expense?.data) {
      setValue("user_id", expense.data.user_id);
      setValue("category", expense.data.category);
      setValue("amount", expense.data.amount);
      setValue("date", new Date(expense.data.date).toISOString().split("T")[0]);
      setValue("description", expense.data.description);
    }
  }, [expense, setValue]);

  const onSubmitExpense = async (data) => {
    try {
      let dateString = "";
      if (typeof data.date === "string") {
        dateString = data.date.includes("T")
          ? data.date.split("T")[0]
          : data.date;
      } else {
        dateString = new Date(data.date).toISOString().split("T")[0];
      }

      const formattedData = {
        ...data,
        date: dateString,
      };

      await updateExpense({ id: expenseId, data: formattedData });
      navigate("/");
    } catch (error) {
      console.error("Failed to update expense", error);
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitExpense)}
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Update Expense
      </Typography>

      <FormControl fullWidth error={!!errors.user_id}>
        <InputLabel>User</InputLabel>
        <Controller
          name="user_id"
          control={control}
          render={({ field }) => (
            <Select {...field} label="User">
              {usersData.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
              <MenuItem onClick={() => setIsUserModalOpen(true)}>
                + Add New User
              </MenuItem>
            </Select>
          )}
        />
        <Typography color="error">{errors.user_id?.message}</Typography>
      </FormControl>

      <FormControl fullWidth error={!!errors.category}>
        <InputLabel>Category</InputLabel>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select {...field} label="Category">
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
              <MenuItem onClick={() => setIsCategoryModalOpen(true)}>
                + Add New Category
              </MenuItem>
            </Select>
          )}
        />
        <Typography color="error">{errors.category?.message}</Typography>
      </FormControl>

      <FormControl fullWidth error={!!errors.amount}>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Amount"
              type="number"
              error={!!errors.amount}
              inputProps={{ step: "0.01", min: "0" }}
            />
          )}
        />
        <Typography color="error">{errors.amount?.message}</Typography>
      </FormControl>

      <FormControl fullWidth error={!!errors.date}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Date"
              type="date"
              error={!!errors.date}
              InputLabelProps={{ shrink: true }}
              onClick={(e) => e.target.showPicker()}
            />
          )}
        />
        <Typography color="error">{errors.date?.message}</Typography>
      </FormControl>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Description"
            multiline
            rows={3}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Update Expense
      </Button>

      <AddUserModal
        open={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        setValue={setValue}
      />

      <AddCategoryModal
        open={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        setValue={setValue}
      />
    </Box>
  );
}
