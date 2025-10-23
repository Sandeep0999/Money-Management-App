"use client"

import { useEffect, useState } from "react"
import { getAnalytics } from "../utils/api"
import { ExpenseChart, IncomeExpenseChart } from "../components/Charts"
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react"
import { toast } from "react-toastify"
import RecurringTransactions from "../components/RecurringTransactions"

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const currentDate = new Date()
      const month = currentDate.getMonth() + 1
      const year = currentDate.getFullYear()
      const response = await getAnalytics({ month, year })
      setAnalytics(response.data)
    } catch (error) {
      toast.error("Failed to load analytics")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const categoryData = analytics?.categoryBreakdown
    ? Object.entries(analytics.categoryBreakdown).map(([name, value]) => ({
        name,
        value,
      }))
    : []

  const savingsRate = analytics?.income
    ? (((analytics.income - analytics.expenses) / analytics.income) * 100).toFixed(1)
    : 0
  const isHealthy = savingsRate > 20

  return (
    <div className="min-h-screen bg-light pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-dark mb-8 animate-fade-in-up">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Balance</p>
                <h2 className="text-3xl font-bold text-dark mt-2">${(analytics?.balance || 0).toFixed(2)}</h2>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Wallet className="text-primary" size={24} />
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Income</p>
                <h2 className="text-3xl font-bold text-green-600 mt-2">${(analytics?.income || 0).toFixed(2)}</h2>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
                <h2 className="text-3xl font-bold text-red-600 mt-2">${(analytics?.expenses || 0).toFixed(2)}</h2>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Health Card */}
        <div
          className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mb-8 card-hover animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className={isHealthy ? "text-green-600" : "text-yellow-600"} size={24} />
                <h3 className="text-lg font-semibold text-dark">Financial Health</h3>
              </div>
              <p className="text-gray-600">
                Savings Rate:{" "}
                <span className={`font-bold ${isHealthy ? "text-green-600" : "text-yellow-600"}`}>{savingsRate}%</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Status</p>
              <p className={`text-lg font-bold ${isHealthy ? "text-green-600" : "text-yellow-600"}`}>
                {isHealthy ? "Excellent" : "Good"}
              </p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div
            className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-lg font-semibold text-dark mb-4">Expense Breakdown</h3>
            {categoryData.length > 0 ? (
              <ExpenseChart data={categoryData} />
            ) : (
              <p className="text-gray-600 text-center py-8">No expense data available</p>
            )}
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <h3 className="text-lg font-semibold text-dark mb-4">Income vs Expenses</h3>
            <IncomeExpenseChart
              data={[
                {
                  name: "This Month",
                  income: analytics?.income || 0,
                  expense: analytics?.expenses || 0,
                },
              ]}
            />
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <RecurringTransactions />
        </div>
      </div>
    </div>
  )
}
