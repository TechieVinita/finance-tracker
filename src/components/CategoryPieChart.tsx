import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'

type Transaction = {
  amount: number
  category: string
}

type CategoryPieChartProps = {
  transactions: Transaction[]
}

const processCategoryData = (transactions: Transaction[]) => {
  const categoryTotals: Record<string, number> = {}

  transactions.forEach(txn => {
    if (!categoryTotals[txn.category]) {
      categoryTotals[txn.category] = 0
    }
    categoryTotals[txn.category] += txn.amount
  })

  return Object.entries(categoryTotals).map(([category, totalAmount]) => ({
    category,
    totalAmount,
  }))
}

export const CategoryPieChart = ({ transactions }: CategoryPieChartProps) => {
  const data = processCategoryData(transactions)

  const COLORS = ['#8884d8', '#82ca9d', '#ff7300', '#ff0000', '#00bfff', '#ffb6c1']

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          dataKey="totalAmount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
