'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { Settings, Store, Users, Bell, Shield, Palette, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminSettingsPage() {
  const settingsCategories = [
    {
      title: 'Store Settings',
      description: 'Configure your store details and preferences',
      icon: Store,
      color: 'blue'
    },
    {
      title: 'User Management',
      description: 'Manage user roles and permissions',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Notifications',
      description: 'Email and push notification settings',
      icon: Bell,
      color: 'yellow'
    },
    {
      title: 'Security',
      description: 'Security and authentication settings',
      icon: Shield,
      color: 'red'
    },
    {
      title: 'Appearance',
      description: 'Theme and layout customization',
      icon: Palette,
      color: 'purple'
    },
    {
      title: 'Localization',
      description: 'Language and region settings',
      icon: Globe,
      color: 'indigo'
    }
  ];

  return (
    <AdminLayout 
      title="Settings" 
      description="Configure your store and admin preferences"
    >
      <div className="space-y-8">
        {/* Quick Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name
              </label>
              <Input 
                type="text" 
                defaultValue="Ziyo E-commerce"
                placeholder="Enter store name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Email
              </label>
              <Input 
                type="email" 
                defaultValue="admin@ziyo.com"
                placeholder="Enter store email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Phone
              </label>
              <Input 
                type="tel" 
                defaultValue="+1 (555) 123-4567"
                placeholder="Enter store phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <Button className="bg-gradient-to-r from-violet-500 to-purple-500">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Categories */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settingsCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className={`w-12 h-12 bg-${category.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${category.color}-600`} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Configure
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Information */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-600">Version</p>
              <p className="font-semibold text-gray-900">v1.0.0</p>
            </div>
            <div>
              <p className="text-gray-600">Environment</p>
              <p className="font-semibold text-gray-900">Development</p>
            </div>
            <div>
              <p className="text-gray-600">Last Updated</p>
              <p className="font-semibold text-gray-900">Jan 15, 2024</p>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 text-center">
          <div className="max-w-md mx-auto">
            <Settings className="w-12 h-12 text-violet-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Advanced Settings Coming Soon
            </h3>
            <p className="text-gray-600">
              More configuration options including payment gateways, shipping settings, tax configuration, and advanced customization will be available in future updates.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}