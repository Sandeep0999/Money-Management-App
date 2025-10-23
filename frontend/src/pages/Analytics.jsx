"use client"

import { useEffect, useState } from "react"
import { getAnalytics } from "../utils/api"
import { ExpenseChart, IncomeExpenseChart } from "../components/Charts"
import { toast } from "react-toastify"
import { Calendar, TrendingUp, TrendingDown, Wallet } from "lucide-react"

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    fetchAnalytics()
  }, [month, year])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await getAnalytics({ month, year })
      setAnalytics(response.data)
    } catch (error) {
      toast.error("Failed to load analytics")
    } finally {
      setLoading(false)
    }
  }

  const categoryData = analytics?.categoryBreakdown
    ? Object.entries(analytics.categoryBreakdown).map(([name, value]) => ({
        name,
        value,
      }))
    : []

  return (
    <div className="min-h-screen bg-light pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-dark mb-8 animate-fade-in-up">Analytics & Reports</h1>

        {/* Date Selector */}
        <div
          className="bg-white p-6 rounded-lg shadow-md mb-8 card-hover animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-dark">Select Period</h3>
          </div>
          <div className="flex gap-4 flex-wrap">
            <select
              value={month}
              onChange={(e) => setMonth(Number.parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2024, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(Number.parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
            >
              {Array.from({ length: 5 }, (_, i) => {
                const y = new Date().getFullYear() - i
                return (
                  <option key={y} value={y}>
                    {y}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div
                className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
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
                style={{ animationDelay: "0.3s" }}
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

              <div
                className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Net Balance</p>
                    <h2
                      className={`text-3xl font-bold mt-2 ${analytics?.balance >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      ${(analytics?.balance || 0).toFixed(2)}
                    </h2>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${analytics?.balance >= 0 ? "bg-green-100" : "bg-red-100"}`}
                  >
                    <Wallet className={analytics?.balance >= 0 ? "text-green-600" : "text-red-600"} size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div
                className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                <h3 className="text-lg font-semibold text-dark mb-4">Expense Breakdown by Category</h3>
                {categoryData.length > 0 ? (
                  <ExpenseChart data={categoryData} />
                ) : (
                  <p className="text-gray-600 text-center py-8">No expense data available</p>
                )}
              </div>

              <div
                className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <h3 className="text-lg font-semibold text-dark mb-4">Income vs Expenses</h3>
                <IncomeExpenseChart
                  data={[
                    {
                      name: `${new Date(2024, month - 1).toLocaleString("default", { month: "short" })} ${year}`,
                      income: analytics?.income || 0,
                      expense: analytics?.expenses || 0,
                    },
                  ]}
                />
              </div>
            </div>

            {/* Category Details */}
            {categoryData.length > 0 && (
              <div
                className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                <h3 className="text-lg font-semibold text-dark mb-4">Expense Details by Category</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-light border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Category</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Amount</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryData.map((item) => (
                        <tr key={item.name} className="border-b hover:bg-light transition smooth-transition">
                          <td className="px-6 py-3 text-sm text-dark">{item.name}</td>
                          <td className="px-6 py-3 text-sm font-semibold text-dark">${item.value.toFixed(2)}</td>
                          <td className="px-6 py-3 text-sm text-dark">
                            {((item.value / (analytics?.expenses || 1)) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
