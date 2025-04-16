import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface BudgetVsActualChartProps {
  transactions: { amount: number; category: string }[]
  categoryBudgets: Record<string, number>
}

export const BudgetVsActualChart: React.FC<BudgetVsActualChartProps> = ({
  transactions,
  categoryBudgets,
}) => {
  // Calculate the total spent for each category
  const categoryTotals: Record<string, number> = {}

  transactions.forEach((txn) => {
    if (!categoryTotals[txn.category]) {
      categoryTotals[txn.category] = 0
    }
    categoryTotals[txn.category] += txn.amount
  })

  // Prepare data for the chart
  const chartData = Object.keys(categoryBudgets).map((category) => ({
    category,
    budget: categoryBudgets[category],
    actual: categoryTotals[category] || 0,
  }))

  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold mb-2">Budget vs Actual</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" />
          <Bar dataKey="actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
