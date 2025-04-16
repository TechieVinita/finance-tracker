import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type Transaction = {
  amount: number
  date: string
  description: string
}

type ChartProps = {
  transactions: Transaction[]
}

const processData = (transactions: Transaction[]) => {
  const monthlyExpenses: Record<string, number> = {}

  transactions.forEach(txn => {
    const month = new Date(txn.date).toLocaleString('default', { month: 'short' })
    if (!monthlyExpenses[month]) {
      monthlyExpenses[month] = 0
    }
    monthlyExpenses[month] += txn.amount
  })

  return Object.entries(monthlyExpenses).map(([month, totalAmount]) => ({
    month,
    totalAmount,
  }))
}

export const Chart = ({ transactions }: ChartProps) => {
  const data = processData(transactions)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalAmount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
