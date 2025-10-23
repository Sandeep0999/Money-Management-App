import Transaction from "../models/Transaction.js"

export const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, description, date } = req.body

    if (!type || !category || !amount) {
      return res.status(400).json({ message: "Please provide all required fields" })
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      type,
      category,
      amount,
      description,
      date: date || new Date(),
    })

    res.status(201).json({
      success: true,
      transaction,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getTransactions = async (req, res) => {
  try {
    const { startDate, endDate, category, type } = req.query
    const filter = { user: req.user.id }

    if (startDate || endDate) {
      filter.date = {}
      if (startDate) filter.date.$gte = new Date(startDate)
      if (endDate) filter.date.$lte = new Date(endDate)
    }

    if (category) filter.category = category
    if (type) filter.type = type

    const transactions = await Transaction.find(filter).sort({ date: -1 })

    res.status(200).json({
      success: true,
      transactions,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this transaction" })
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      transaction,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this transaction" })
    }

    await Transaction.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: "Transaction deleted",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
