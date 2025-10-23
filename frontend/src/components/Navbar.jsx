"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LogOut, Settings, User, Menu, X, Target } from "lucide-react"
import { toast } from "react-toastify"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully!")
    navigate("/")
  }

  const handleLogoClick = (e) => {
    if (user) {
      e.preventDefault()
      navigate("/dashboard")
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl text-dark hidden sm:inline">MoneyMate</span>
          </Link>

          {/* Desktop Menu */}
          {user && (
            <div className="hidden md:flex gap-8">
              <Link to="/dashboard" className="text-dark hover:text-primary transition smooth-transition">
                Dashboard
              </Link>
              <Link to="/transactions" className="text-dark hover:text-primary transition smooth-transition">
                Transactions
              </Link>
              <Link to="/analytics" className="text-dark hover:text-primary transition smooth-transition">
                Analytics
              </Link>
              <Link to="/budgets" className="text-dark hover:text-primary transition smooth-transition">
                Budgets
              </Link>
              <Link
                to="/savings-goals"
                className="text-dark hover:text-primary transition smooth-transition flex items-center gap-1"
              >
                <Target size={18} />
                Goals
              </Link>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:bg-light p-2 rounded-lg transition smooth-transition"
                >
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="hidden sm:inline text-sm font-medium text-dark">{user.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 animate-fade-in-up">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-light transition smooth-transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={18} />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-light transition smooth-transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings size={18} />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-light transition text-red-600 smooth-transition"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary hover:bg-light rounded-lg transition smooth-transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition smooth-transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t animate-fade-in-up">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-dark hover:bg-light smooth-transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/transactions"
                  className="block px-4 py-2 text-dark hover:bg-light smooth-transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Transactions
                </Link>
                <Link
                  to="/analytics"
                  className="block px-4 py-2 text-dark hover:bg-light smooth-transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Analytics
                </Link>
                <Link
                  to="/budgets"
                  className="block px-4 py-2 text-dark hover:bg-light smooth-transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Budgets
                </Link>
                <Link
                  to="/savings-goals"
                  className="block px-4 py-2 text-dark hover:bg-light smooth-transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Savings Goals
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-dark hover:bg-light smooth-transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-dark hover:bg-light smooth-transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
