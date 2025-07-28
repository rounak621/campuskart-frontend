'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { LoadingSpinner } from '@/components/features/LoadingSpinner'
import { 
  MessageCircle, 
  Calendar, 
  Tag, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Mail
} from 'lucide-react'
import Link from 'next/link'

// Mock item data - replace with actual API call
const mockItem = {
  id: '1',
  title: 'Data Structures and Algorithms Textbook',
  description: 'Comprehensive textbook in excellent condition. Includes all chapters with minimal highlighting. Perfect for CSE students. Used for only one semester.',
  price: 800,
  category: 'Books',
  images: [
    'https://via.placeholder.com/600x400?text=Book+Front',
    'https://via.placeholder.com/600x400?text=Book+Back',
    'https://via.placeholder.com/600x400?text=Book+Inside'
  ],
  seller: {
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/40x40?text=JD',
    year: '3rd Year',
    branch: 'Computer Science'
  },
  createdAt: '2025-01-15T10:30:00Z',
  views: 45
}

export default function ItemDetailPage() {
  const params = useParams()
  const [item, setItem] = useState(mockItem)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    // Simulate API call
    const fetchItem = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLoading(false)
    }
    fetchItem()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={item.images[currentImageIndex]}
              alt={item.title}
              fill
              className="object-cover"
            />
            
            {item.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {item.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          {item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${item.title} ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.category === 'Books' ? 'bg-green-100 text-green-800' :
                item.category === 'Electronics' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {item.category}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {item.title}
            </h1>
            
            <div className="text-4xl font-bold text-blue-600 mb-6">
              ₹{item.price.toLocaleString()}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Seller Info */}
          <Card>
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={item.seller.avatar}
                alt={item.seller.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {item.seller.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.seller.year} • {item.seller.branch}
                </p>
              </div>
            </div>
            
            {!showContact ? (
              <Button 
                onClick={() => setShowContact(true)}
                className="w-full flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contact Seller</span>
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-900">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-900">john.doe@college.edu</span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Contact information is only visible to logged-in students
                </p>
              </div>
            )}
          </Card>

          {/* Additional Info */}
          <div className="border-t pt-6">
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <span className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                ID: #{item.id}
              </span>
              <span>{item.views} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Listings */}
      <div className="mt-8 pt-8 border-t">
        <Link href="/listings">
          <Button variant="outline" className="flex items-center space-x-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Listings</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

