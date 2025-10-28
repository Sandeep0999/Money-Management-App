import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL
// console.log("API Base URL:", import.meta.env.VITE_API_URL);
const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Transactions
export const addTransaction = (data) => api.post("/transactions", data)
export const getTransactions = (params) => api.get("/transactions", { params })
export const updateTransaction = (id, data) => api.put(`/transactions/${id}`, data)
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`)

// Budgets
export const setBudget = (data) => api.post("/budgets", data)
export const getBudgets = (params) => api.get("/budgets", { params })
export const deleteBudget = (id) => api.delete(`/budgets/${id}`)


export const getAnalytics = (params) => api.get("/analytics", { params })

export default api
