'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { LoadingSpinner } from '@/components/features/LoadingSpinner'

export default function PostItemPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'Books', label: 'Books & Notes' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Bicycles', label: 'Bicycles' },
    { value: 'Hostel', label: 'Hostel Items' },
    { value: 'Other', label: 'Other' }
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - images.length)
      setImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.price.trim()) newErrors.price = 'Price is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (images.length === 0) newErrors.images = 'At least one image is required'

    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) return

    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would:
      // 1. Upload images to Firebase Storage
      // 2. Create item document in Firestore
      // 3. Redirect to item detail page
      
      router.push('/listings')
    } catch (error) {
      console.error('Failed to post item:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Post New Item
        </h1>
        <p className="text-lg text-gray-600">
          Share your item with fellow students
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Input
            label="Item Title *"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Data Structures Textbook"
            error={errors.title}
          />

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your item's condition, features, etc."
              rows={4}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                errors.description ? 'border-red-300' : ''
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Price (₹) *"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="0"
              error={errors.price}
            />
            
            <Select
              label="Category *"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              options={categories}
              error={errors.category}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Images * (Max 5)
            </label>
            
            {images.length < 5 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    Click to upload images or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </label>
              </div>
            )}

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {errors.images && (
              <p className="text-sm text-red-600">{errors.images}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2"
              size="lg"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  <span>Posting Item...</span>
                </>
              ) : (
                <span>Post Item</span>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
