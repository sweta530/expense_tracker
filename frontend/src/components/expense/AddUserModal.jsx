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
import { userSchema } from "../../utils/validationSchema";
import { useAddUser } from "../../api/users";

export function AddUserModal({ open, onClose, setValue }) {
  const { mutateAsync: addUser } = useAddUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const onSubmit = async (data) => {
    try {
      const addedUser = await addUser(data);
      setValue("user_id", addedUser.id);
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to add user", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <TextField
          {...register("name")}
          label="Name"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ my: 2 }}
        />
        <TextField
          {...register("email")}
          label="Email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ my: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Add User</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserModal;
