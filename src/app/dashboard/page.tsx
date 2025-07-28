'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ItemCard } from '@/components/features/ItemCard'
import { 
  User, 
  Settings, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  TrendingUp,
  Package,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@college.edu',
  college: 'ABC Institute of Technology',
  year: '3rd Year',
  branch: 'Computer Science',
  avatar: 'https://via.placeholder.com/80x80?text=JD',
  memberSince: '2024-09-15'
}

// Mock user listings
const mockUserItems = [
  {
    id: '1',
    title: 'Data Structures Textbook',
    price: 800,
    category: 'Books',
    image: 'https://via.placeholder.com/300x200?text=Book',
    createdAt: '2025-01-15T10:30:00Z',
    views: 45,
    messages: 8
  },
  {
    id: '2',
    title: 'Scientific Calculator',
    price: 1200,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x200?text=Calculator',
    createdAt: '2025-01-10T14:20:00Z',
    views: 32,
    messages: 5
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('listings')
  const [user] = useState(mockUser)
  const [userItems] = useState(mockUserItems)

  const stats = {
    totalItems: userItems.length,
    totalViews: userItems.reduce((sum, item) => sum + item.views, 0),
    totalMessages: userItems.reduce((sum, item) => sum + item.messages, 0),
    totalValue: userItems.reduce((sum, item) => sum + item.price, 0)
  }

  const sidebarItems = [
    { id: 'listings', label: 'My Listings', icon: Package },
    { id: 'profile', label: 'Edit Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 space-y-6">
              {/* User Info */}
              <div className="text-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-100"
                />
                <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.year}</p>
                <p className="text-sm text-gray-600">{user.branch}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Member since {new Date(user.memberSince).getFullYear()}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="border-t pt-4 space-y-2">
                <Link href="/post-item">
                  <Button size="sm" className="w-full flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Post New Item</span>
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'listings' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 text-center">
                    <Package className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stats.totalItems}</div>
                    <div className="text-sm text-gray-600">Items</div>
                  </Card>
                  
                  <Card className="p-4 text-center">
                    <Eye className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stats.totalViews}</div>
                    <div className="text-sm text-gray-600">Views</div>
                  </Card>
                  
                  <Card className="p-4 text-center">
                    <MessageCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stats.totalMessages}</div>
                    <div className="text-sm text-gray-600">Messages</div>
                  </Card>
                  
                  <Card className="p-4 text-center">
                    <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">₹{stats.totalValue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Value</div>
                  </Card>
                </div>

                {/* My Listings */}
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">My Listings</h3>
                    <Link href="/post-item">
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New
                      </Button>
                    </Link>
                  </div>

                  {userItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        No items yet
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Start by posting your first item
                      </p>
                      <Link href="/post-item">
                        <Button>Post Your First Item</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-600">₹{item.price.toLocaleString()}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                <span className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" />
                                  {item.views} views
                                </span>
                                <span className="flex items-center">
                                  <MessageCircle className="h-3 w-3 mr-1" />
                                  {item.messages} messages
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Link href={`/listings/${item.id}`}>
                              <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button size="sm" variant="ghost">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {activeTab === 'profile' && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Edit Profile</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                    <input
                      type="text"
                      defaultValue={user.college}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option selected>3rd Year</option>
                        <option>4th Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                      <input
                        type="text"
                        defaultValue={user.branch}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </div>
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive email notifications for messages</p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium text-gray-900">Show Contact Info</h4>
                      <p className="text-sm text-gray-600">Allow verified students to see your contact details</p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>

                  <div className="pt-6">
                    <Button variant="danger">Delete Account</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
