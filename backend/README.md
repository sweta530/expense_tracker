# Backend

## Project Overview

This is the backend service for the Expense Tracker application, built using Node.js, Express, and MySQL. It provides APIs for managing expenses and generating statistical insights.

## Features

- **Expense Management:** Add, update, delete, and retrieve expenses.
- **Category Management:** Add, update, delete, and retrieve categories.
- **User Management:** Add, update, delete, and retrieve users.
- **Filtering:** Fetch expenses by category, user, or date range.
- **Statistical Reports:**
  - **Top Spending Days:** Get top 3 spending days.
  - **Monthly Change:** Calculate the percentage change in expenditure from the previous month.
  - **Prediction:** Predict the next month's total expenditure based on the average spending of the last 3 months.

## Technologies Used

- **Node.js & Express.js** - Backend framework
- **MySQL** - Database (without ORM)
- **dotenv** - Environment variables

## Project Structure

```
backend/
│-- src/
│   │-- routes/
│   │-- controllers/
│   │-- models/
│   │-- utils/
│   │-- constants/
│   │-- config/
│   │-- validation/
│-- .env.example
│-- package.json
│-- README.md
│-- index.js
```

## Setup Instructions

### Prerequisites

- Install **Node.js v20^** and **MySQL**.

### Steps

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the environment variables:
   - Copy `.env.example` to `.env` and update values accordingly.
4. Start the backend server:
   ```sh
   npm run start
   ```
   - The server runs on **port 8000** by default.

## Database Setup

1. Create a MySQL database named `petpooja_practical`.
2. Import the SQL schema:
   ```sh
   mysql -u <your_username> -p petpooja_practical < ../database/petpooja_practical.sql
   ```

## API Testing

- Import `../petpooja_practical.postman_collection.json` into Postman to test APIs.
