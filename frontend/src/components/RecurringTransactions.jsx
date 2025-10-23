"use client"

import { useState } from "react"
import { Plus, Repeat2, Trash2 } from "lucide-react"
import { toast } from "react-toastify"

export default function RecurringTransactions() {
  const [recurring, setRecurring] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    frequency: "monthly",
    category: "Bills",
    type: "expense",
  })

  const frequencies = ["daily", "weekly", "monthly", "yearly"]
  const categories = ["Food", "Bills", "Entertainment", "Shopping", "Transport", "Healthcare", "Education", "Other"]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.amount) {
      toast.error("Please fill all required fields")
      return
    }

    const newRecurring = {
      id: Date.now(),
      ...formData,
      amount: Number.parseFloat(formData.amount),
      createdAt: new Date().toISOString(),
    }

    setRecurring([...recurring, newRecurring])
    toast.success("Recurring transaction added!")
    setFormData({ name: "", amount: "", frequency: "monthly", category: "Bills", type: "expense" })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setRecurring(recurring.filter((r) => r.id !== id))
    toast.success("Recurring transaction removed!")
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md card-hover">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Repeat2 className="text-primary" size={24} />
          <h3 className="text-2xl font-bold text-dark">Recurring Transactions</h3>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition card-hover"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded-lg mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Transaction name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            />

            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Amount"
              step="0.01"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            />

            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            >
              {frequencies.map((f) => (
                <option key={f} value={f}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button
              type="submit"
              className="bg-primary text-white rounded-lg hover:bg-secondary transition font-medium card-hover"
            >
              Add Recurring
            </button>
          </div>
        </form>
      )}

      {recurring.length > 0 ? (
        <div className="space-y-3">
          {recurring.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 bg-light rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-dark">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  {item.category} • {item.frequency}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-semibold ${item.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition smooth-transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-8">No recurring transactions yet</p>
      )}
    </div>
  )
}
