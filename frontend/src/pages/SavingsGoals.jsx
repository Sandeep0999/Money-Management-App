"use client"

import { useEffect, useState } from "react"
import { Plus, Target, TrendingUp } from "lucide-react"
import { toast } from "react-toastify"
import DeleteModal from "../components/DeleteModal"

export default function SavingsGoals() {
  const [goals, setGoals] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null })
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
    category: "Travel",
  })

  const categories = ["Travel", "Education", "Home", "Car", "Emergency Fund", "Vacation", "Other"]

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = () => {
    const savedGoals = localStorage.getItem("savingsGoals")
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.targetAmount || !formData.deadline) {
      toast.error("Please fill all required fields")
      return
    }

    const newGoal = {
      id: Date.now(),
      ...formData,
      targetAmount: Number.parseFloat(formData.targetAmount),
      currentAmount: Number.parseFloat(formData.currentAmount) || 0,
      createdAt: new Date().toISOString(),
    }

    const updatedGoals = [...goals, newGoal]
    setGoals(updatedGoals)
    localStorage.setItem("savingsGoals", JSON.stringify(updatedGoals))
    toast.success("Savings goal created successfully!")
    setFormData({ name: "", targetAmount: "", currentAmount: "", deadline: "", category: "Travel" })
    setShowForm(false)
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const updatedGoals = goals.filter((g) => g.id !== deleteModal.id)
      setGoals(updatedGoals)
      localStorage.setItem("savingsGoals", JSON.stringify(updatedGoals))
      toast.success("Goal deleted successfully!")
      setDeleteModal({ isOpen: false, id: null })
    } catch (error) {
      toast.error("Error deleting goal")
    } finally {
      setIsDeleting(false)
    }
  }

  const getProgressPercentage = (goal) => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
  }

  const getDaysRemaining = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diff = deadlineDate - today
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="min-h-screen bg-light pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-dark">Savings Goals</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition card-hover"
          >
            <Plus size={20} />
            New Goal
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4 text-dark">Create Savings Goal</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Goal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Summer Vacation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                />
              </div>

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
                <label className="block text-sm font-medium text-dark mb-2">Target Amount</label>
                <input
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Current Amount</label>
                <input
                  type="number"
                  value={formData.currentAmount}
                  onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark mb-2">Target Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition font-medium card-hover"
            >
              Create Goal
            </button>
          </form>
        )}

        {goals.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal, index) => {
              const progress = getProgressPercentage(goal)
              const daysLeft = getDaysRemaining(goal.deadline)

              return (
                <div
                  key={goal.id}
                  className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="text-primary" size={20} />
                        <h3 className="text-lg font-semibold text-dark">{goal.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{goal.category}</p>
                    </div>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, id: goal.id })}
                      className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition smooth-transition"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-dark">Progress</span>
                      <span className="text-sm font-semibold text-primary">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600">Saved</p>
                      <p className="font-semibold text-dark">${goal.currentAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Target</p>
                      <p className="font-semibold text-dark">${goal.targetAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp size={16} className={daysLeft > 0 ? "text-green-600" : "text-red-600"} />
                    <span className={daysLeft > 0 ? "text-green-600" : "text-red-600"}>
                      {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg shadow-md text-center animate-fade-in-up">
            <Target size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No savings goals yet. Create one to start saving!</p>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        title="Delete Goal"
        message="Are you sure you want to delete this savings goal? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null })}
        isLoading={isDeleting}
      />
    </div>
  )
}
