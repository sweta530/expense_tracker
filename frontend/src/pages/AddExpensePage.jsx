import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAddExpense, useGetAllCategory, useGetAllUsers } from "../api";
import { AddCategoryModal, AddUserModal } from "../components";
import { expenseSchema } from "../utils/validationSchema";

export function AddExpensePage() {
  const navigate = useNavigate();
  const { mutateAsync: addExpense } = useAddExpense();
  const { data: categories = [] } = useGetAllCategory();
  const { data: usersData = [] } = useGetAllUsers();

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
      date: new Date().toISOString().split("T")[0],
      description: "",
    },
  });

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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
      await addExpense(formattedData);
      navigate("/");
    } catch (error) {
      console.error("Failed to add expense", error);
    }
  };

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
        Add New Expense
      </Typography>

      {/* User Selection */}
      <FormControl fullWidth error={!!errors.user_id} variant="outlined">
        <InputLabel id="user-select-label">Select User</InputLabel>
        <Controller
          name="user_id"
          control={control}
          render={({ field }) => (
            <Select {...field} labelId="user-select-label" label="Select User">
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

      {/* Category Selection */}
      <FormControl fullWidth error={!!errors.category}>
        <InputLabel id="category-select-label">Select Category</InputLabel>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Select Category"
              labelId="category-select-label"
            >
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

      {/* Amount Input */}
      <FormControl fullWidth error={!!errors.amount}>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Add Amount"
              type="number"
              error={!!errors.amount}
              inputProps={{ step: "0.01", min: "0" }}
            />
          )}
        />
        <Typography color="error">{errors.amount?.message}</Typography>
      </FormControl>

      {/* Date Input */}
      <FormControl fullWidth error={!!errors.date}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Select Date"
              type="date"
              error={!!errors.date}
              InputLabelProps={{ shrink: true }}
              onClick={(e) => e.target.showPicker()}
            />
          )}
        />
        <Typography color="error">{errors.date?.message}</Typography>
      </FormControl>

      {/* Description Input */}
      <FormControl fullWidth error={!!errors.description}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Add Description"
              error={!!errors.description}
              multiline
              rows={3}
            />
          )}
        />
        <Typography color="error">{errors.description?.message}</Typography>
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Expense
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
