"use client"
import { useState } from "react"
import { deleteTransaction } from "../utils/api"
import { Trash2, Edit2 } from "lucide-react"
import { toast } from "react-toastify"
import DeleteModal from "./DeleteModal"

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null })
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id })
  }

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteTransaction(deleteModal.id)
      toast.success("Transaction deleted successfully!")
      setDeleteModal({ isOpen: false, id: null })
      onDelete()
    } catch (error) {
      toast.error("Error deleting transaction")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-light border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b hover:bg-light transition">
                  <td className="px-6 py-3 text-sm text-dark">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-sm text-dark">{transaction.category}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm font-semibold text-dark">
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{transaction.description || "-"}</td>
                  <td className="px-6 py-3 text-sm flex gap-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600 smooth-transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(transaction._id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition text-red-600 smooth-transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null })}
        isLoading={isDeleting}
      />
    </>
  )
}
