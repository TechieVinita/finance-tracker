/* eslint-disable prefer-const */

'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { BudgetVsActualChart } from '@/components/BudgetVsActualChart'

// Predefined categories
const categories = ['Food', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Others']

type Transaction = {
  amount: number
  date: string
  description: string
  category: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [categoryBudgets, setCategoryBudgets] = useState<Record<string, number>>({
    Food: 0,
    Transport: 0,
    Entertainment: 0,
    Health: 0,
    Shopping: 0,
    Others: 0,
  })

  // Handle the form submission (Add/Edit transaction)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !date || !description || !category) {
      alert('Please fill in all fields')
      return
    }

    const newTransaction: Transaction = {
      amount: parseFloat(amount),
      date,
      description,
      category,
    }

    if (editingIndex !== null) {
      const updatedTransactions = [...transactions]
      updatedTransactions[editingIndex] = newTransaction
      setTransactions(updatedTransactions)
      setEditingIndex(null)
    } else {
      setTransactions([...transactions, newTransaction])
    }

    // Reset form after submission
    setAmount('')
    setDate('')
    setDescription('')
    setCategory('')
  }

  // Handle Edit functionality
  const handleEdit = (index: number) => {
    const txn = transactions[index]
    setAmount(txn.amount.toString())
    setDate(txn.date)
    setDescription(txn.description)
    setCategory(txn.category)
    setEditingIndex(index)
  }

  // Handle Delete functionality
  const handleDelete = (index: number) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index)
    setTransactions(updatedTransactions)
  }

  // Handle Budget Form submission
  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedBudgets = { ...categoryBudgets }
    for (const category of Object.keys(categoryBudgets)) {
      const input = document.getElementById(`budget-${category}`) as HTMLInputElement
      updatedBudgets[category] = parseFloat(input.value)
    }
    setCategoryBudgets(updatedBudgets)
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Set Category Budgets Form */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Set Category Budgets</h2>
      <form onSubmit={handleBudgetSubmit} className="space-y-4">
        {Object.keys(categoryBudgets).map((category) => (
          <div key={category}>
            <Label>{category} Budget</Label>
            <Input
              id={`budget-${category}`}
              type="number"
              defaultValue={categoryBudgets[category]}
              placeholder={`Enter budget for ${category}`}
            />
          </div>
        ))}
        <Button type="submit">Set Budgets</Button>
      </form>

      {/* Budget vs Actual Chart */}
      <BudgetVsActualChart transactions={transactions} categoryBudgets={categoryBudgets} />

      {/* Transaction Form */}
      <h1 className="text-2xl font-bold mb-4">{editingIndex === null ? 'Add Transaction' : 'Edit Transaction'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <Label>Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was this for?"
          />
        </div>
        <div>
          <Label>Category</Label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">{editingIndex === null ? 'Add Transaction' : 'Save Changes'}</Button>
      </form>

      {/* Transaction List */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Transaction List</h2>
      {transactions.map((txn, index) => (
        <Card key={index} className="mb-2 p-2 flex justify-between items-center">
          <div>
            <p><strong>₹{txn.amount}</strong> - {txn.description}</p>
            <p className="text-sm text-gray-500">{txn.date}</p>
            <p className="text-sm text-gray-500">Category: {txn.category}</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleEdit(index)} variant="outline" size="sm">Edit</Button>
            <Button onClick={() => handleDelete(index)} variant="destructive" size="sm">Delete</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
