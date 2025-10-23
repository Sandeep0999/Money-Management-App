"use client"

import { useAuth } from "../context/AuthContext"
import { User, Mail, Calendar } from "lucide-react"

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-light pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-dark mb-8">Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-6 mb-8">
            <img src={user?.avatar || "/placeholder.svg"} alt={user?.name} className="w-24 h-24 rounded-full" />
            <div>
              <h2 className="text-3xl font-bold text-dark">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-light rounded-lg">
              <User className="text-primary" size={24} />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-lg font-semibold text-dark">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-light rounded-lg">
              <Mail className="text-primary" size={24} />
              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="text-lg font-semibold text-dark">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-light rounded-lg">
              <Calendar className="text-primary" size={24} />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-lg font-semibold text-dark">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
