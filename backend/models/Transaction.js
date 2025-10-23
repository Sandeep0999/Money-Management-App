import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Salary",
        "Freelance",
        "Investment",
        "Food",
        "Bills",
        "Entertainment",
        "Shopping",
        "Transport",
        "Healthcare",
        "Education",
        "Other",
      ],
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Transaction", transactionSchema)
