import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Navbar } from "./components";
import {
  Dashboard,
  StatisticsPage,
  AddExpensePage,
  UpdateExpensePage,
} from "./pages";

import QueryProvider from "./utils/QueryClientProvider";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpensePage />} />
            <Route
              path="/update-expense/:expenseId"
              element={<UpdateExpensePage />}
            />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
