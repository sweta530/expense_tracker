import React, { useRef, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  ClickAwayListener,
} from "@mui/material";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDeleteExpense, useGetAllExpenses } from "../api/expenses";
import { useGetAllCategory } from "../api/category";
import { useGetAllUsers } from "../api/users";
import { useNavigate } from "react-router-dom";
import { EXPENSE_RECORDS_LIMIT } from "../utils/constants";
import { DeleteExpenseModal } from "../components/expense";

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [dateRange, setDateRange] = useState([
    { startDate: null, endDate: null, key: "selection" },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const dateRef = useRef(null);

  const { data, isLoading } = useGetAllExpenses({
    limit: EXPENSE_RECORDS_LIMIT,
    page,
    ...filters,
  });
  const expenses = data?.items || [];
  const pageInfo = data?.page_info || { current_page: 1, total_pages: 1 };

  const { mutateAsync: deleteExpense } = useDeleteExpense();
  const { data: categories = [] } = useGetAllCategory();
  const { data: usersData = [] } = useGetAllUsers();

  const [openDialog, setOpenDialog] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handleDeleteClick = (expenseId) => {
    setExpenseToDelete(expenseId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (expenseToDelete) {
      await deleteExpense(expenseToDelete);
    }
    setOpenDialog(false);
    setExpenseToDelete(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setExpenseToDelete(null);
  };

  const applyFilters = () => {
    setFilters({
      user_id: selectedUser || null,
      category: selectedCategory || null,
      start_date: dateRange[0].startDate
        ? format(dateRange[0].startDate, "yyyy-MM-dd")
        : null,
      end_date: dateRange[0].endDate
        ? format(dateRange[0].endDate, "yyyy-MM-dd")
        : null,
    });
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedUser("");
    setDateRange([{ startDate: null, endDate: null, key: "selection" }]);
    setFilters({});
    setPage(1);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 2, md: 4 } }}
    >
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Expense Dashboard
      </Typography>

      {/* Filter Section */}
      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          mb: { xs: 2, md: 4 },
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Category Dropdown */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="All Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              variant="outlined"
              sx={{ minWidth: "200px" }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* User Dropdown */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="All User"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              variant="outlined"
              sx={{ minWidth: "200px" }}
            >
              <MenuItem value="">All Users</MenuItem>
              {usersData.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Date Range Picker */}
          <Grid item xs={12} sm={12} md={4} sx={{ position: "relative" }}>
            <ClickAwayListener onClickAway={() => setShowDatePicker(false)}>
              <Box ref={dateRef}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Select Date Range"
                  value={
                    dateRange[0].startDate && dateRange[0].endDate
                      ? `${format(
                          dateRange[0].startDate,
                          "MM/dd/yyyy"
                        )} - ${format(dateRange[0].endDate, "MM/dd/yyyy")}`
                      : "All "
                  }
                  onClick={() => {
                    setShowDatePicker(true);
                  }}
                  readOnly
                />
                {showDatePicker && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 10,
                      bgcolor: "background.paper",
                      boxShadow: 3,
                      borderRadius: 2,
                      mt: 1,
                    }}
                  >
                    <DateRange
                      ranges={dateRange}
                      onChange={(ranges) => setDateRange([ranges.selection])}
                    />
                  </Box>
                )}
              </Box>
            </ClickAwayListener>
          </Grid>
        </Grid>

        {/* Apply & Clear Buttons */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth onClick={applyFilters}>
              Apply Filter
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth onClick={clearFilters}>
              Clear Filter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Expense Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              {[
                "Date",
                "User",
                "Category",
                "Amount",
                "Description",
                "Actions",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : expenses.length > 0 ? (
              expenses.map((expense) => (
                <TableRow key={expense.id} hover>
                  <TableCell align="center">
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    {usersData.find((u) => u.id === expense.user_id)?.name ||
                      "Unknown"}
                  </TableCell>
                  <TableCell align="center">{expense.category}</TableCell>
                  <TableCell align="center">${expense.amount}</TableCell>
                  <TableCell align="left">
                    {" "}
                    {expense.description.length > 50
                      ? `${expense.description.slice(0, 50)}...`
                      : expense.description}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => navigate(`/update-expense/${expense.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(expense.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No expenses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={pageInfo.total_pages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          size="large"
        />
      </Box>
      <DeleteExpenseModal
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Container>
  );
}
