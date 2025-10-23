"use client"

import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, TrendingUp, PieChart, Target, Download, Zap, Shield, Users } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"

export default function LandingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard")
    } else {
      navigate("/signup")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-light to-secondary">
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl font-bold text-dark mb-6">
            Take Control of Your <span className="text-primary">Finances</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            MoneyMate helps you track expenses, manage budgets, and achieve your financial goals with beautiful
            analytics and insights.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition font-semibold flex items-center gap-2 card-hover"
            >
              {user ? "Go to Dashboard" : "Get Started"} <ArrowRight size={20} />
            </button>
            {!user && (
              <Link
                to="/login"
                className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-light transition font-semibold border-2 border-primary card-hover"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <div className="bg-white p-6 rounded-lg shadow-lg card-hover animate-fade-in-up">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-dark mb-2">Track Expenses</h3>
            <p className="text-gray-600 text-sm">
              Easily log and categorize all your income and expenses in one place.
            </p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg card-hover animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <PieChart className="text-secondary" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-dark mb-2">Visual Analytics</h3>
            <p className="text-gray-600 text-sm">Beautiful charts and graphs to understand your spending patterns.</p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg card-hover animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-dark mb-2">Budget Goals</h3>
            <p className="text-gray-600 text-sm">Set monthly budgets for each category and stay on track.</p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg card-hover animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <Download className="text-green-500" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-dark mb-2">Export Data</h3>
            <p className="text-gray-600 text-sm">Download your transactions as CSV for further analysis.</p>
          </div>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your money effectively
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-fade-in-up">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Real-time updates and instant calculations for all your transactions.</p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-secondary" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">Secure & Private</h3>
              <p className="text-gray-600">Bank-level encryption to keep your financial data safe and secure.</p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-accent" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">Multi-User Support</h3>
              <p className="text-gray-600">Share budgets and track expenses with family members or team.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-dark text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-2">10K+</h2>
            <p className="text-gray-300">Active Users</p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-4xl font-bold mb-2">$500M+</h2>
            <p className="text-gray-300">Tracked Transactions</p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-4xl font-bold mb-2">99.9%</h2>
            <p className="text-gray-300">Uptime</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-4xl font-bold text-dark mb-6">Ready to manage your money better?</h2>
        <button
          onClick={handleGetStarted}
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition font-semibold card-hover"
        >
          {user ? "Go to Dashboard" : "Start Free Today"}
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
