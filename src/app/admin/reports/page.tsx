'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { FileText, Download, Calendar, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminReportsPage() {
  const reports = [
    {
      title: 'Sales Report',
      description: 'Detailed sales analysis and trends',
      lastGenerated: '2024-01-15',
      status: 'Ready'
    },
    {
      title: 'Inventory Report',
      description: 'Stock levels and inventory management',
      lastGenerated: '2024-01-14',
      status: 'Ready'
    },
    {
      title: 'Customer Report',
      description: 'Customer behavior and demographics',
      lastGenerated: '2024-01-13',
      status: 'Generating'
    }
  ];

  return (
    <AdminLayout 
      title="Reports" 
      description="Generate and download business reports"
    >
      <div className="space-y-6">
        {/* Report Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button className="bg-gradient-to-r from-violet-500 to-purple-500">
              <FileText className="w-4 h-4 mr-2" />
              Generate New Report
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Reports List */}
        <div className="grid gap-4">
          {reports.map((report, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    <p className="text-gray-600">{report.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        report.status === 'Ready' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" disabled={report.status !== 'Ready'}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 text-center">
          <div className="max-w-md mx-auto">
            <FileText className="w-12 h-12 text-violet-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Advanced Reporting Coming Soon
            </h3>
            <p className="text-gray-600">
              Comprehensive reporting with custom filters, automated scheduling, and advanced analytics will be available in the next update.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}