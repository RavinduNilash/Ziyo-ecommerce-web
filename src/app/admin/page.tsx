'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  ShoppingBagIcon, 
  UsersIcon, 
  DollarSignIcon, 
  TruckIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrendingUp,
  Activity,
  Sparkles,
  ArrowRight,
  Package,
  TagIcon
} from 'lucide-react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { isAdmin } from '@/lib/admin';

interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // For demo purposes, we'll use localStorage data and some mock data
        const demoOrders = JSON.parse(localStorage.getItem('demo-orders') || '[]');
        
        // Calculate stats
        const totalOrders = demoOrders.length;
        const totalRevenue = demoOrders.reduce((sum: number, order: Order) => sum + order.total, 0);
        const pendingOrders = demoOrders.filter((order: Order) => order.status === 'pending').length;
        
        setStats({
          totalOrders,
          totalUsers: 125, // Mock data
          totalRevenue,
          pendingOrders
        });

        // Get recent orders (last 5)
        const recent = demoOrders
          .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        
        setRecentOrders(recent);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="h-10 bg-gradient-to-r from-violet-200 to-fuchsia-200 rounded-lg w-64 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-96"></div>
            </div>
            
            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-10"></div>
                  <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-xl mr-4"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quick Actions Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-10"></div>
                  <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-10 bg-gray-200 rounded-lg"></div>
                      <div className="h-10 bg-gray-200 rounded-lg"></div>
                    </div>
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
      {/* Admin Navigation */}
      <AdminNavbar />
      
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-fuchsia-900/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-fuchsia-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-fuchsia-300" />
              <span className="text-white/90 text-sm font-medium">Admin Dashboard</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-100 to-fuchsia-100 bg-clip-text text-transparent">
                Welcome Back, Admin
              </span>
            </h1>
            
            <p className="text-xl text-purple-100 mb-8">
              {user?.displayName || user?.email} • Manage your e-commerce platform with ease
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Activity className="w-5 h-5 mr-2" />
                View Analytics
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Package className="w-5 h-5 mr-2" />
                Quick Add Product
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: ShoppingBagIcon,
              label: 'Total Orders',
              value: stats.totalOrders,
              gradient: 'from-blue-500 to-cyan-500',
              bgGradient: 'from-blue-50 to-cyan-50'
            },
            {
              icon: UsersIcon,
              label: 'Total Users',
              value: stats.totalUsers,
              gradient: 'from-emerald-500 to-teal-500',
              bgGradient: 'from-emerald-50 to-teal-50'
            },
            {
              icon: DollarSignIcon,
              label: 'Total Revenue',
              value: `$${stats.totalRevenue.toFixed(2)}`,
              gradient: 'from-violet-500 to-fuchsia-500',
              bgGradient: 'from-violet-50 to-fuchsia-50'
            },
            {
              icon: TruckIcon,
              label: 'Pending Orders',
              value: stats.pendingOrders,
              gradient: 'from-orange-500 to-red-500',
              bgGradient: 'from-orange-50 to-red-50'
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
                  <div className={`relative bg-gradient-to-br ${stat.bgGradient} border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-violet-200`}>
                    <div className="flex items-center">
                      <div className={`w-14 h-14 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                      <span>+12% from last month</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
          {[
            {
              title: 'Product Management',
              description: 'Add, edit, and manage your product catalog with advanced tools',
              icon: Package,
              gradient: 'from-violet-500 to-purple-500',
              actions: [
                { label: 'View Products', href: '/admin/products', icon: EyeIcon, variant: 'outline' as const },
                { label: 'Add Product', href: '/admin/products/new', icon: PlusIcon, variant: 'primary' as const }
              ]
            },
            {
              title: 'Category Management',
              description: 'Organize products with hierarchical categories',
              icon: TagIcon,
              gradient: 'from-blue-500 to-cyan-500',
              actions: [
                { label: 'Manage Categories', href: '/admin/categories', icon: TagIcon, variant: 'outline' as const },
                { label: 'Add Category', href: '/admin/categories', icon: PlusIcon, variant: 'primary' as const }
              ]
            },
            {
              title: 'Data Management',
              description: 'Import, export and migrate your store data',
              icon: Activity,
              gradient: 'from-orange-500 to-red-500',
              actions: [
                { label: 'Data Migration', href: '/admin/data', icon: Activity, variant: 'outline' as const },
                { label: 'Import Data', href: '/admin/data', icon: PlusIcon, variant: 'primary' as const }
              ]
            },
            {
              title: 'Order Management',
              description: 'Process and track customer orders efficiently',
              icon: ShoppingBagIcon,
              gradient: 'from-fuchsia-500 to-pink-500',
              actions: [
                { label: 'View Orders', href: '/admin/orders', icon: EyeIcon, variant: 'outline' as const },
                { label: 'Manage Shipping', href: '#', icon: TruckIcon, variant: 'primary' as const, disabled: true }
              ]
            },
            {
              title: 'User Management',
              description: 'Manage customer accounts and user permissions',
              icon: UsersIcon,
              gradient: 'from-emerald-500 to-teal-500',
              actions: [
                { label: 'View Users', href: '/admin/users', icon: UsersIcon, variant: 'outline' as const },
                { label: 'Edit Permissions', href: '#', icon: PencilIcon, variant: 'primary' as const, disabled: true }
              ]
            }
          ].map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className={`group transition-all duration-700 delay-${(index + 4) * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="relative h-full">
                  <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-violet-200 h-full">
                    <div className={`w-12 h-12 bg-gradient-to-r ${section.gradient} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{section.description}</p>
                    <div className="space-y-3 mt-auto">
                      {section.actions.map((action) => {
                        const ActionIcon = action.icon;
                        const isDisabled = 'disabled' in action && action.disabled;
                        return action.href === '#' && isDisabled ? (
                          <Button
                            key={action.label}
                            variant={action.variant}
                            className="w-full opacity-50 cursor-not-allowed"
                            disabled
                          >
                            <ActionIcon className="w-4 h-4 mr-2" />
                            {action.label}
                          </Button>
                        ) : (
                          <Link key={action.label} href={action.href}>
                            <Button
                              variant={action.variant}
                              className={`w-full ${
                                action.variant === 'primary' 
                                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white border-0' 
                                  : 'border-violet-200 text-violet-600 hover:bg-violet-50'
                              }`}
                            >
                              <ActionIcon className="w-4 h-4 mr-2" />
                              {action.label}
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link href="/admin/orders">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          
          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
