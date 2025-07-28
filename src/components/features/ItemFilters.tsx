'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Search, Filter, X } from 'lucide-react'

interface ItemFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  search: string
  category: string
  minPrice: string
  maxPrice: string
  sortBy: string
}

export function ItemFilters({ onFilterChange }: ItemFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest'
  })

  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Books', label: 'Books & Notes' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Bicycles', label: 'Bicycles' },
    { value: 'Hostel', label: 'Hostel Items' },
    { value: 'Other', label: 'Other' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ]

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest'
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search items..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Filter Toggle for Mobile */}
      <div className="flex justify-between items-center md:hidden">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
        {(filters.category || filters.minPrice || filters.maxPrice) && (
          <Button variant="ghost" onClick={clearFilters} size="sm">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
        <Select
          label="Category"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          options={categories}
        />
        
        <Input
          label="Min Price (₹)"
          type="number"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          placeholder="0"
        />
        
        <Input
          label="Max Price (₹)"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          placeholder="Any"
        />
        
        <Select
          label="Sort By"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          options={sortOptions}
        />
      </div>

      {/* Clear Filters - Desktop */}
      {(filters.category || filters.minPrice || filters.maxPrice) && (
        <div className="hidden md:block">
          <Button variant="ghost" onClick={clearFilters} size="sm">
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
