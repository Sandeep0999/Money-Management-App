"use client"

import { AlertTriangle, X } from "lucide-react"

export default function DeleteModal({ isOpen, title, message, onConfirm, onCancel, isLoading }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full animate-fade-in-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} className="text-white" />
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <button onClick={onCancel} className="text-white hover:bg-red-700 p-1 rounded transition">
            <X size={20} />
          </button>
        </div>

 
        <div className="px-6 py-4">
          <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
        </div>

      
        <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end rounded-b-lg border-t">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
