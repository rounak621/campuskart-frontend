'use client'

import { useState, useEffect } from 'react'
import { ItemCard } from '@/components/features/ItemCard'
import { ItemFilters, FilterState } from '@/components/features/ItemFilters'
import { LoadingSpinner } from '@/components/features/LoadingSpinner'

// Mock data - replace with actual API calls
const mockItems = [
  {
    id: '1',
    title: 'Data Structures and Algorithms Textbook',
    price: 800,
    category: 'Books',
    image: 'https://via.placeholder.com/300x200?text=Book',
    createdAt: '2025-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'MacBook Air M1 - Excellent Condition',
    price: 45000,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x200?text=MacBook',
    createdAt: '2025-01-14T15:20:00Z'
  },
  {
    id: '3',
    title: 'Mountain Bike - Trek 3500',
    price: 12000,
    category: 'Bicycles',
    image: 'https://via.placeholder.com/300x200?text=Bike',
    createdAt: '2025-01-13T09:15:00Z'
  },
  // Add more mock items...
]

export default function ListingsPage() {
  const [items, setItems] = useState(mockItems)
  const [filteredItems, setFilteredItems] = useState(mockItems)
  const [loading, setLoading] = useState(false)

  const handleFilterChange = (filters: FilterState) => {
    setLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      let filtered = [...items]

      // Search filter
      if (filters.search) {
        filtered = filtered.filter(item =>
          item.title.toLowerCase().includes(filters.search.toLowerCase())
        )
      }

      // Category filter
      if (filters.category) {
        filtered = filtered.filter(item => item.category === filters.category)
      }

      // Price filters
      if (filters.minPrice) {
        filtered = filtered.filter(item => item.price >= parseInt(filters.minPrice))
      }
      if (filters.maxPrice) {
        filtered = filtered.filter(item => item.price <= parseInt(filters.maxPrice))
      }

      // Sort
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          case 'newest':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
      })

      setFilteredItems(filtered)
      setLoading(false)
    }, 300)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Campus Marketplace
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover great deals from fellow students in your college
        </p>
      </div>

      {/* Filters */}
      <ItemFilters onFilterChange={handleFilterChange} />

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {loading ? 'Searching...' : `${filteredItems.length} items found`}
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
