"use client"

import { useState } from "react"
import { addTransaction, updateTransaction } from "../utils/api"
import { toast } from "react-toastify"

const categories = {
  income: ["Salary", "Freelance", "Investment", "Other"],
  expense: ["Food", "Bills", "Entertainment", "Shopping", "Transport", "Healthcare", "Education", "Other"],
}

export default function TransactionForm({ onSuccess, editingTransaction = null }) {
  const [formData, setFormData] = useState(
    editingTransaction || {
      type: "expense",
      category: "Food",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && { category: categories[value][0] }),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction._id, formData)
        toast.success("Transaction updated successfully!")
      } else {
        await addTransaction(formData)
        toast.success("Transaction added successfully!")
      }
      setFormData({
        type: "expense",
        category: "Food",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      })
      onSuccess()
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving transaction")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-dark">
        {editingTransaction ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories[formData.type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-dark mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional description"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition font-medium"
      >
        {editingTransaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  )
}
