"use client"

import React, { createContext, useState, useEffect } from "react"
import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`)
      setUser(response.data.user)
    } catch (error) {
      console.error("Failed to fetch user:", error)
      localStorage.removeItem("token")
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password })
    const { token, user } = response.data
    localStorage.setItem("token", token)
    setToken(token)
    setUser(user)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return response.data
  }

  const signup = async (name, email, password, confirmPassword) => {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      name,
      email,
      password,
      confirmPassword,
    })
    const { token, user } = response.data
    localStorage.setItem("token", token)
    setToken(token)
    setUser(user)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return response.data
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common["Authorization"]
  }

  return <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
