'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { BarChart3, TrendingUp, DollarSign, Users, ShoppingBag, Calendar } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout 
      title="Analytics" 
      description="Sales performance and business insights"
    >
      <div className="space-y-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Revenue Growth',
              value: '+24.5%',
              subtitle: 'vs last month',
              icon: TrendingUp,
              color: 'green'
            },
            {
              title: 'Total Sales',
              value: '$12,345',
              subtitle: 'this month',
              icon: DollarSign,
              color: 'blue'
            },
            {
              title: 'New Customers',
              value: '127',
              subtitle: 'this week',
              icon: Users,
              color: 'purple'
            },
            {
              title: 'Conversion Rate',
              value: '3.2%',
              subtitle: 'vs 2.8% last week',
              icon: ShoppingBag,
              color: 'orange'
            }
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${card.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
                <p className="text-gray-600 text-sm">{card.title}</p>
                <p className="text-gray-500 text-xs mt-1">{card.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Sales Overview</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-violet-300 mx-auto mb-4" />
              <p className="text-gray-600">Analytics charts coming soon</p>
              <p className="text-sm text-gray-500 mt-2">
                Advanced analytics with charts and insights will be available in the next update
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}