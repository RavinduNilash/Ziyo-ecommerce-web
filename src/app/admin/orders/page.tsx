'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { Button } from '@/components/ui/Button';
import {
  SearchIcon,
  PackageIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  FilterIcon,
  Sparkles,
  ShoppingBag,
  DollarSign,
  Users,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { isAdmin } from '@/lib/admin';

const statusIcons = {
  pending: ClockIcon,
  processing: PackageIcon,
  shipped: TruckIcon,
  delivered: CheckCircleIcon,
  cancelled: XCircleIcon,
};

const statusColors = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const statusGradients = {
  pending: 'from-amber-500 to-orange-500',
  processing: 'from-blue-500 to-cyan-500',
  shipped: 'from-purple-500 to-violet-500',
  delivered: 'from-green-500 to-emerald-500',
  cancelled: 'from-red-500 to-pink-500',
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function AdminOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // For demo purposes, get orders from localStorage
        const demoOrders = JSON.parse(localStorage.getItem('demo-orders') || '[]');
        setOrders(demoOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as Order['status'], updatedAt: new Date() }
        : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('demo-orders', JSON.stringify(updatedOrders));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-lg text-gray-600 mb-8">You need to be logged in to access the admin panel.</p>
            <Link href="/login">
              <Button size="lg">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin(user)) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Access Required</h1>
            <p className="text-lg text-gray-600 mb-8">You don&apos;t have permission to access the admin panel.</p>
            <Link href="/">
              <Button size="lg">Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const orderStats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter(order => order.status === 'pending').length,
    deliveredOrders: orders.filter(order => order.status === 'delivered').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 rounded-3xl mb-12">
              <div className="p-16">
                <div className="h-8 bg-white/20 rounded-2xl w-48 mb-4"></div>
                <div className="h-12 bg-white/20 rounded-2xl w-96 mb-6"></div>
                <div className="h-14 bg-white/20 rounded-2xl w-40"></div>
              </div>
            </div>
            
            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Orders List Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <AdminNavbar />
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-fuchsia-900/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-fuchsia-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                  <ShoppingBag className="w-4 h-4 text-fuchsia-300" />
                  <span className="text-white/90 text-sm font-medium">Order Management</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white via-purple-100 to-fuchsia-100 bg-clip-text text-transparent">
                    Order Dashboard
                  </span>
                </h1>
                
                <p className="text-xl text-purple-100 mb-8 max-w-2xl">
                  Track, manage, and process customer orders with advanced tools and insights
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export Orders
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: ShoppingBag,
              label: 'Total Orders',
              value: orderStats.totalOrders,
              gradient: 'from-blue-500 to-cyan-500',
              bgGradient: 'from-blue-50 to-cyan-50'
            },
            {
              icon: DollarSign,
              label: 'Total Revenue',
              value: `$${orderStats.totalRevenue.toFixed(2)}`,
              gradient: 'from-emerald-500 to-teal-500',
              bgGradient: 'from-emerald-50 to-teal-50'
            },
            {
              icon: ClockIcon,
              label: 'Pending Orders',
              value: orderStats.pendingOrders,
              gradient: 'from-amber-500 to-orange-500',
              bgGradient: 'from-amber-50 to-orange-50'
            },
            {
              icon: CheckCircleIcon,
              label: 'Delivered Orders',
              value: orderStats.deliveredOrders,
              gradient: 'from-green-500 to-emerald-500',
              bgGradient: 'from-green-50 to-emerald-50'
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`group transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  <div className={`relative bg-gradient-to-br ${stat.bgGradient} border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                      <span>+8% from last month</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Filters Section */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl blur opacity-5"></div>
          <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Enhanced Search */}
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search orders or customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/70 backdrop-blur-sm transition-all duration-300"
                />
              </div>

              {/* Enhanced Status Filter */}
              <div className="relative">
                <FilterIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/70 backdrop-blur-sm appearance-none"
                >
                  <option value="all">All Statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Enhanced Quick Actions */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-violet-200 text-violet-600 hover:bg-violet-50 rounded-2xl flex-1"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
                <Button
                  variant="outline"
                  className="border-violet-200 text-violet-600 hover:bg-violet-50 rounded-2xl"
                >
                  <FilterIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Showing {filteredOrders.length} of {orders.length} orders
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900">
                Total Revenue: ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-fuchsia-400/10 rounded-3xl blur-3xl animate-pulse"></div>
              
              <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-12 shadow-2xl">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-violet-600" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-violet-500" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                      No orders found
                    </h3>
                    <Sparkles className="w-5 h-5 text-fuchsia-500" />
                  </div>
                  
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Try adjusting your search or filter criteria'
                      : 'No orders have been placed yet'}
                  </p>
                  
                  {(searchTerm || statusFilter !== 'all') && (
                    <div className="mt-8">
                      <Button
                        variant="outline"
                        className="border-violet-200 text-violet-600 rounded-2xl font-semibold hover:border-violet-300 hover:bg-violet-50 transition-all duration-300"
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('all');
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => {
              const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
              const statusGradient = statusGradients[order.status as keyof typeof statusGradients];
              return (
                <div
                  key={order.id}
                  className={`transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative bg-white rounded-3xl shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 border border-slate-100/50 overflow-hidden group">
                    {/* Order Header */}
                    <div className="p-8 pb-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <h3 className="text-xl font-bold text-gray-900">
                              Order #{order.id.slice(-8).toUpperCase()}
                            </h3>
                            <span className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold border ${statusColors[order.status as keyof typeof statusColors]}`}>
                              <StatusIcon className="w-4 h-4 mr-2" />
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2" />
                              <span className="font-medium">
                                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>
                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2" />
                              <span>{order.shippingAddress.email}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 lg:mt-0 flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Order Total</p>
                            <p className="text-3xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Order Items Summary */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                          <PackageIcon className="w-4 h-4 mr-2" />
                          Items ({order.items.length})
                        </h4>
                        <div className="grid gap-3">
                          {order.items.slice(0, 3).map((item: Order['items'][0], itemIndex: number) => (
                            <div key={itemIndex} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                              <div className="flex items-center space-x-4">
                                <Image
                                  src={item.productImage || '/placeholder-product.jpg'}
                                  alt={item.productName}
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 object-cover rounded-xl border-2 border-white shadow-sm"
                                />
                                <div>
                                  <p className="font-semibold text-gray-900 text-sm">{item.productName}</p>
                                  <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-gray-900">${(item.quantity * item.price).toFixed(2)}</p>
                                <p className="text-xs text-gray-600">${item.price.toFixed(2)} each</p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="text-center py-2">
                              <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                                +{order.items.length - 3} more items
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          Shipping Address
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-900">
                              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                            </p>
                            <p className="text-gray-600">{order.shippingAddress.address}</p>
                            <p className="text-gray-600">
                              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center text-gray-600 mb-1">
                              <Phone className="w-4 h-4 mr-2" />
                              <span>{order.shippingAddress.phone}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Mail className="w-4 h-4 mr-2" />
                              <span>{order.shippingAddress.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="border-t border-gray-200 pt-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                          <div className="flex items-center space-x-4">
                            <label className="text-sm font-semibold text-gray-700">Update Status:</label>
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white"
                            >
                              {statusOptions.map((status) => (
                                <option key={status.value} value={status.value}>
                                  {status.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-violet-200 text-violet-600 hover:bg-violet-50 rounded-xl"
                            >
                              <EyeIcon className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Invoice
                            </Button>
                            <Button
                              size="sm"
                              className={`bg-gradient-to-r ${statusGradient} text-white rounded-xl hover:shadow-lg transition-all duration-300`}
                            >
                              <TruckIcon className="w-4 h-4 mr-2" />
                              Track Order
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
