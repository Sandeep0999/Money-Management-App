"use client"

import { useEffect, useState } from "react"
import { getTransactions } from "../utils/api"
import TransactionForm from "../components/TransactionForm"
import TransactionList from "../components/TransactionList"
import { toast } from "react-toastify"
import { Plus, Filter, TrendingUp, TrendingDown, Download } from "lucide-react"
import { exportToCSV, exportToExcel, exportSummaryReport, exportToJSON } from "../utils/exportData"

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [stats, setStats] = useState({ income: 0, expense: 0 })
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    fetchTransactions()
  }, [filters])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const params = {}
      if (filters.type) params.type = filters.type
      if (filters.category) params.category = filters.category
      if (filters.startDate) params.startDate = filters.startDate
      if (filters.endDate) params.endDate = filters.endDate

      const response = await getTransactions(params)
      setTransactions(response.data.transactions)

      // Calculate stats
      const income = response.data.transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
      const expense = response.data.transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0)
      setStats({ income, expense })
    } catch (error) {
      toast.error("Failed to load transactions")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  const handleSuccess = () => {
    setShowForm(false)
    setEditingTransaction(null)
    fetchTransactions()
  }

  const handleExportCSV = () => {
    if (transactions.length === 0) {
      toast.warning("No transactions to export")
      return
    }
    const filename = `transactions-${new Date().toISOString().split("T")[0]}.csv`
    exportToCSV(transactions, filename)
    toast.success("Transactions exported as CSV")
    setShowExportMenu(false)
  }

  const handleExportExcel = () => {
    if (transactions.length === 0) {
      toast.warning("No transactions to export")
      return
    }
    const filename = `transactions-${new Date().toISOString().split("T")[0]}.xlsx`
    exportToExcel(transactions, filename)
    toast.success("Transactions exported as Excel")
    setShowExportMenu(false)
  }

  const handleExportJSON = () => {
    if (transactions.length === 0) {
      toast.warning("No transactions to export")
      return
    }
    const filename = `transactions-${new Date().toISOString().split("T")[0]}.json`
    exportToJSON(transactions, filename)
    toast.success("Transactions exported as JSON")
    setShowExportMenu(false)
  }

  const handleExportSummary = () => {
    if (transactions.length === 0) {
      toast.warning("No transactions to export")
      return
    }
    const filename = `transaction-summary-${new Date().toISOString().split("T")[0]}.csv`
    exportSummaryReport(transactions, stats, filename)
    toast.success("Summary report exported")
    setShowExportMenu(false)
  }

  return (
    <div className="min-h-screen bg-light pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-dark">Transactions</h1>
          <div className="flex gap-3">
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition card-hover"
              >
                <Download size={20} />
                Export
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 animate-fade-in-up">
                  <button
                    onClick={handleExportCSV}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition rounded-t-lg"
                  >
                    Export as CSV
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Export as Excel
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Export as JSON
                  </button>
                  <button
                    onClick={handleExportSummary}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition rounded-b-lg"
                  >
                    Export Summary Report
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setEditingTransaction(null)
                setShowForm(!showForm)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition card-hover"
            >
              <Plus size={20} />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-white p-4 rounded-lg shadow-md card-hover flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Income</p>
              <p className="text-2xl font-bold text-green-600">${stats.income.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md card-hover flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">${stats.expense.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {showForm && <TransactionForm onSuccess={handleSuccess} editingTransaction={editingTransaction} />}

        {/* Filters */}
        <div
          className="bg-white p-6 rounded-lg shadow-md mb-6 card-hover animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-dark">Filters</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Transport">Transport</option>
              <option value="Salary">Salary</option>
            </select>

            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            />

            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            />
          </div>
        </div>

        {/* Transactions List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : transactions.length > 0 ? (
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <TransactionList transactions={transactions} onEdit={handleEdit} onDelete={fetchTransactions} />
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg shadow-md text-center animate-fade-in-up">
            <p className="text-gray-600 text-lg">No transactions found. Start by adding one!</p>
          </div>
        )}
      </div>
    </div>
  )
}
