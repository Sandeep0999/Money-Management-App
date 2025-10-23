"use client"

import { useEffect, useState } from "react"
import { getBudgets, setBudget, getTransactions } from "../utils/api"
import BudgetCard from "../components/BudgetCard"
import { toast } from "react-toastify"
import { Plus, AlertCircle } from "lucide-react"

const categories = ["Food", "Bills", "Entertainment", "Shopping", "Transport", "Healthcare", "Education", "Other"]

export default function Budgets() {
  const [budgets, setBudgets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    category: "Food",
    limit: "",
    month: new Date().toISOString().slice(0, 7),
  })

  useEffect(() => {
    fetchBudgets()
    fetchTransactions()
  }, [])

  const fetchBudgets = async () => {
    try {
      const month = new Date().toISOString().slice(0, 7)
      const response = await getBudgets({ month })
      setBudgets(response.data.budgets)
    } catch (error) {
      toast.error("Failed to load budgets")
    } finally {
      setLoading(false)
    }
  }

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions({ type: "expense" })
      setTransactions(response.data.transactions)
    } catch (error) {
      console.error("Failed to load transactions")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await setBudget(formData)
      toast.success("Budget set successfully!")
      setFormData({
        category: "Food",
        limit: "",
        month: new Date().toISOString().slice(0, 7),
      })
      setShowForm(false)
      fetchBudgets()
    } catch (error) {
      toast.error(error.response?.data?.message || "Error setting budget")
    }
  }

  const getSpentAmount = (category) => {
    const currentMonth = new Date().toISOString().slice(0, 7)
    return transactions
      .filter((t) => {
        const transactionMonth = new Date(t.date).toISOString().slice(0, 7)
        return t.category === category && transactionMonth === currentMonth
      })
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const exceededBudgets = budgets.filter((b) => getSpentAmount(b.category) > b.limit)

  return (
    <div className="min-h-screen bg-light pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-dark">Budget Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition card-hover"
          >
            <Plus size={20} />
            Set Budget
          </button>
        </div>

        {/* Alert for exceeded budgets */}
        {exceededBudgets.length > 0 && (
          <div
            className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6 flex items-start gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-800">Budget Alert</h3>
              <p className="text-red-700 text-sm">
                {exceededBudgets.length} budget(s) exceeded: {exceededBudgets.map((b) => b.category).join(", ")}
              </p>
            </div>
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md mb-8 card-hover animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            <h2 className="text-2xl font-bold mb-4 text-dark">Set Monthly Budget</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Budget Limit</label>
                <input
                  type="number"
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Month</label>
                <input
                  type="month"
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition font-medium card-hover"
            >
              Set Budget
            </button>
          </form>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : budgets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgets.map((budget, index) => (
              <div key={budget._id} className="animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                <BudgetCard budget={budget} spent={getSpentAmount(budget.category)} onDelete={fetchBudgets} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg shadow-md text-center animate-fade-in-up">
            <p className="text-gray-600 text-lg">No budgets set yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}
