import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  Search, 
  Shield, 
  Users, 
  Zap, 
  BookOpen, 
  Laptop, 
  Bike,
  ArrowRight
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "Verified Students Only",
      description: "Safe transactions within your college community"
    },
    {
      icon: Zap,
      title: "No Commission",
      description: "Keep 100% of your earnings with zero platform fees"
    },
    {
      icon: Users,
      title: "Campus Community",
      description: "Connect with fellow students in your area"
    }
  ]

  const categories = [
    { icon: BookOpen, name: "Books & Notes", count: "150+" },
    { icon: Laptop, name: "Electronics", count: "80+" },
    { icon: Bike, name: "Bicycles", count: "45+" },
    { icon: Search, name: "Hostel Items", count: "120+" }
  ]

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Campus
              <span className="text-blue-600"> Marketplace</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Buy and sell books, electronics, and more with fellow students. 
              Safe, simple, and commission-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/listings">
                <Button size="lg" className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Explore Items</span>
                </Button>
              </Link>
              <Link href="/post-item">
                <Button variant="outline" size="lg" className="flex items-center space-x-2">
                  <span>Post Your Item</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose CampusKart?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built specifically for college students, by college students
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-scale">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-gray-600">
              Find what you need in these trending categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href="/listings">
                <Card className="text-center hover-scale cursor-pointer">
                  <category.icon className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count} items</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students already using CampusKart
          </p>
          <Link href="/auth">
            <Button size="lg" className="flex items-center space-x-2 mx-auto">
              <span>Get Started Today</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
