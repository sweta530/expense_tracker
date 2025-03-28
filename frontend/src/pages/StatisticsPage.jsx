import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useGetExpenditurePrediction,
  useGetMonthlyExpenditureChange,
  useGetTopSpendingDays,
} from "../api";

export function StatisticsPage() {
  const { data: topSpendingDays, isLoading: isLoadingTopSpendingDays } =
    useGetTopSpendingDays();
  const { data: monthlyExpenditureChange, isLoading: isLoadingMonthlyChange } =
    useGetMonthlyExpenditureChange();
  const {
    data: expenditurePrediction,
    isLoading: isLoadingExpenditurePrediction,
  } = useGetExpenditurePrediction();

  console.log(topSpendingDays);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Expense Statistics
      </Typography>

      {/* Top Spending Days */}
      <Grid item xs={12} sx={{ mb: 3 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Top Spending Days
          </Typography>
          {isLoadingTopSpendingDays ? (
            <Typography>Loading top spending days...</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Total Spent</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topSpendingDays?.data?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(item.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>${item.total_spent}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Grid>

      {/* Monthly Expenditure Change */}
      <Grid item xs={12} sx={{ mb: 3 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Monthly Expenditure Change
          </Typography>
          {isLoadingMonthlyChange ? (
            <Typography>Loading monthly changes...</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Amount Spent Last Month</TableCell>
                    <TableCell>Amount Spent Current Month</TableCell>
                    <TableCell>Percentage Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {monthlyExpenditureChange?.data?.lastMonth}
                    </TableCell>
                    <TableCell>
                      {monthlyExpenditureChange?.data?.currentMonth}
                    </TableCell>
                    <TableCell>
                      {monthlyExpenditureChange?.data?.percentageChange}%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Grid>

      {/* Expenditure Prediction */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Next Month Expenditure Prediction
          </Typography>
          {isLoadingExpenditurePrediction ? (
            <Typography>Loading expenditure prediction...</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Predicted Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      ${expenditurePrediction?.data?.predicted_spending}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Grid>
    </Container>
  );
}
