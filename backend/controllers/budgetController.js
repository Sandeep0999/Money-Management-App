import Budget from "../models/Budget.js"

export const setBudget = async (req, res) => {
  try {
    const { category, limit, month } = req.body

    if (!category || !limit || !month) {
      return res.status(400).json({ message: "Please provide all required fields" })
    }

    let budget = await Budget.findOne({
      user: req.user.id,
      category,
      month,
    })

    if (budget) {
      budget = await Budget.findByIdAndUpdate(budget._id, { limit }, { new: true })
    } else {
      budget = await Budget.create({
        user: req.user.id,
        category,
        limit,
        month,
      })
    }

    res.status(201).json({
      success: true,
      budget,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getBudgets = async (req, res) => {
  try {
    const { month } = req.query
    const filter = { user: req.user.id }

    if (month) filter.month = month

    const budgets = await Budget.find(filter)

    res.status(200).json({
      success: true,
      budgets,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id)

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" })
    }

    if (budget.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this budget" })
    }

    await Budget.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: "Budget deleted",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
