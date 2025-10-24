import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"
import transactionRoutes from "./routes/transactions.js"
import budgetRoutes from "./routes/budgets.js"
import analyticsRoutes from "./routes/analytics.js"

dotenv.config()

const app = express()

app.use(express.json())
connectDB();

app.use(cors({
  origin: [
    "https://site-moneymate.onrender.com",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.options("*", cors());

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/budgets", budgetRoutes)
app.use("/api/analytics", analyticsRoutes)


app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
