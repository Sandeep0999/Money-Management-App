export const exportToCSV = (transactions, filename = "transactions.csv") => {
  const headers = ["Date", "Type", "Category", "Amount", "Description"]
  const rows = transactions.map((t) => [
    new Date(t.date).toLocaleDateString(),
    t.type,
    t.category,
    t.amount,
    t.description || "",
  ])

  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

  const blob = new Blob([csvContent], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

export const exportToExcel = (transactions, filename = "transactions.xlsx") => {
  
  const headers = ["Date", "Type", "Category", "Amount", "Description"]
  const rows = transactions.map((t) => [
    new Date(t.date).toLocaleDateString(),
    t.type,
    t.category,
    t.amount,
    t.description || "",
  ])

 
  let html = '<table border="1"><tr>'
  headers.forEach((h) => {
    html += `<th>${h}</th>`
  })
  html += "</tr>"

  rows.forEach((row) => {
    html += "<tr>"
    row.forEach((cell) => {
      html += `<td>${cell}</td>`
    })
    html += "</tr>"
  })
  html += "</table>"

  const blob = new Blob([html], { type: "application/vnd.ms-excel" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

export const exportSummaryReport = (transactions, stats, filename = "transaction-summary.csv") => {
  const income = stats.income || 0
  const expense = stats.expense || 0
  const balance = income - expense

  const summaryContent = `TRANSACTION SUMMARY REPORT
Generated: ${new Date().toLocaleString()}

SUMMARY STATISTICS
Total Income,${income}
Total Expenses,${expense}
Net Balance,${balance}

TRANSACTION DETAILS
Date,Type,Category,Amount,Description
${transactions
  .map((t) => `${new Date(t.date).toLocaleDateString()},${t.type},${t.category},${t.amount},${t.description || ""}`)
  .join("\n")}`

  const blob = new Blob([summaryContent], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

export const exportToJSON = (transactions, filename = "transactions.json") => {
  const jsonContent = JSON.stringify(transactions, null, 2)
  const blob = new Blob([jsonContent], { type: "application/json" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}
