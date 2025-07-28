import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Eye } from 'lucide-react'

interface ItemCardProps {
  id: string
  title: string
  price: number
  category: string
  image: string
  createdAt: string
}

export function ItemCard({ id, title, price, category, image, createdAt }: ItemCardProps) {
  const formatPrice = (price: number) => `₹${price.toLocaleString()}`
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Books': 'bg-green-100 text-green-800',
      'Electronics': 'bg-blue-100 text-blue-800',
      'Bicycles': 'bg-yellow-100 text-yellow-800',
      'Hostel': 'bg-purple-100 text-purple-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card className="overflow-hidden hover-scale">
      <div className="aspect-w-16 aspect-h-12 mb-4">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
            {title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)} ml-2`}>
            {category}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(price)}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <Link href={`/listings/${id}`}>
          <Button className="w-full flex items-center justify-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </Button>
        </Link>
      </div>
    </Card>
  )
}
