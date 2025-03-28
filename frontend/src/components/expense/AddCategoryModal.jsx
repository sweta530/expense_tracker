import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../utils/validationSchema";
import { useAddCategory } from "../../api/category";

export function AddCategoryModal({ open, onClose, setValue }) {
  const { mutateAsync: addCategory } = useAddCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(categorySchema) });

  const onSubmit = async (data) => {
    try {
      const addedCategory = await addCategory(data);
      setValue("category", addedCategory.name);
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <TextField
          {...register("name")}
          label="Category Name"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ my: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Add Category</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCategoryModal;
