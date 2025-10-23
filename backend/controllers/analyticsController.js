import Transaction from "../models/Transaction.js"

export const getAnalytics = async (req, res) => {
  try {
    const { month, year } = req.query

    const filter = { user: req.user.id }

    if (month && year) {
      const startDate = new Date(year, month - 1, 1)
      const endDate = new Date(year, month, 0)
      filter.date = { $gte: startDate, $lte: endDate }
    }

    const transactions = await Transaction.find(filter)

    const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    const categoryBreakdown = {}
    transactions.forEach((t) => {
      if (t.type === "expense") {
        categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + t.amount
      }
    })

    res.status(200).json({
      success: true,
      income,
      expenses,
      balance: income - expenses,
      categoryBreakdown,
      transactions,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
