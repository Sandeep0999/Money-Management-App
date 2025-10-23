"use client"
import { useState } from "react"
import { deleteBudget } from "../utils/api"
import { Trash2 } from "lucide-react"
import { toast } from "react-toastify"
import DeleteModal from "./DeleteModal"

export default function BudgetCard({ budget, spent, onDelete }) {
  const [deleteModal, setDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const percentage = (spent / budget.limit) * 100
  const isExceeded = spent > budget.limit

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteBudget(budget._id)
      toast.success("Budget deleted successfully!")
      setDeleteModal(false)
      onDelete()
    } catch (error) {
      toast.error("Error deleting budget")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md card-hover">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-dark">{budget.category}</h3>
            <p className="text-sm text-gray-600">{budget.month}</p>
          </div>
          <button
            onClick={() => setDeleteModal(true)}
            className="p-2 hover:bg-red-100 rounded-lg transition text-red-600 smooth-transition"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-dark">Spent</span>
            <span className={`text-sm font-semibold ${isExceeded ? "text-red-600" : "text-green-600"}`}>
              ${spent.toFixed(2)} / ${budget.limit.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                isExceeded ? "bg-red-500" : percentage > 75 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {isExceeded && (
          <p className="text-sm text-red-600 font-medium">Exceeded by ${(spent - budget.limit).toFixed(2)}</p>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal}
        title="Delete Budget"
        message={`Are you sure you want to delete the budget for ${budget.category}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal(false)}
        isLoading={isDeleting}
      />
    </>
  )
}
