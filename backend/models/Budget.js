import mongoose from "mongoose"

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Food", "Bills", "Entertainment", "Shopping", "Transport", "Healthcare", "Education", "Other"],
    },
    limit: {
      type: Number,
      required: [true, "Please provide a budget limit"],
      min: 0,
    },
    month: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Budget", budgetSchema)
