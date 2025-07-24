import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Wallet, Download, Calendar, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';

interface RevenueStream {
  id: string;
  source: string;
  platform: string;
  type: 'ad_revenue' | 'sponsorship' | 'affiliate' | 'subscription' | 'direct_sales';
  amount: number;
  growth: number;
  lastPayout: string;
  status: 'active' | 'pending' | 'paused';
}

const mockRevenueStreams: RevenueStream[] = [
  {
    id: '1',
    source: 'Google AdSense',
    platform: 'WordPress',
    type: 'ad_revenue',
    amount: 1250.50,
    growth: 15.2,
    lastPayout: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    source: 'Meta Ads',
    platform: 'Instagram',
    type: 'ad_revenue',
    amount: 890.20,
    growth: 8.7,
    lastPayout: '2024-01-20',
    status: 'active'
  },
  {
    id: '3',
    source: 'YouTube Partner Program',
    platform: 'YouTube',
    type: 'ad_revenue',
    amount: 2100.80,
    growth: 22.1,
    lastPayout: '2024-01-18',
    status: 'active'
  },
  {
    id: '4',
    source: 'Brand Sponsorship',
    platform: 'TikTok',
    type: 'sponsorship',
    amount: 1500.00,
    growth: -5.3,
    lastPayout: '2024-01-10',
    status: 'pending'
  },
  {
    id: '5',
    source: 'Affiliate Marketing',
    platform: 'All Platforms',
    type: 'affiliate',
    amount: 650.30,
    growth: 12.8,
    lastPayout: '2024-01-22',
    status: 'active'
  }
];

interface Transaction {
  id: string;
  date: string;
  description: string;
  platform: string;
  amount: number;
  type: 'payout' | 'earning' | 'fee';
  status: 'completed' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-22',
    description: 'YouTube Ad Revenue',
    platform: 'YouTube',
    amount: 450.20,
    type: 'earning',
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-01-20',
    description: 'Meta Ads Payout',
    platform: 'Instagram',
    amount: 890.20,
    type: 'payout',
    status: 'completed'
  },
  {
    id: '3',
    date: '2024-01-18',
    description: 'Platform Fee',
    platform: 'All',
    amount: -25.00,
    type: 'fee',
    status: 'completed'
  },
  {
    id: '4',
    date: '2024-01-15',
    description: 'Google AdSense',
    platform: 'WordPress',
    amount: 1250.50,
    type: 'payout',
    status: 'pending'
  }
];

const revenueTypeColors = {
  ad_revenue: 'bg-blue-100 text-blue-800',
  sponsorship: 'bg-purple-100 text-purple-800',
  affiliate: 'bg-green-100 text-green-800',
  subscription: 'bg-orange-100 text-orange-800',
  direct_sales: 'bg-pink-100 text-pink-800'
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  paused: 'bg-gray-100 text-gray-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800'
};

const platformColors = {
  WordPress: 'bg-blue-100 text-blue-800',
  Instagram: 'bg-pink-100 text-pink-800',
  YouTube: 'bg-red-100 text-red-800',
  TikTok: 'bg-gray-100 text-gray-800',
  Facebook: 'bg-blue-100 text-blue-800',
  'All Platforms': 'bg-indigo-100 text-indigo-800',
  All: 'bg-gray-100 text-gray-800'
};

export default function RevenueCenter() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const totalRevenue = mockRevenueStreams.reduce((sum, stream) => sum + stream.amount, 0);
  const totalGrowth = mockRevenueStreams.reduce((sum, stream) => sum + stream.growth, 0) / mockRevenueStreams.length;
  const activeStreams = mockRevenueStreams.filter(stream => stream.status === 'active').length;
  const pendingPayouts = mockTransactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getRevenueByType = () => {
    const revenueByType = mockRevenueStreams.reduce((acc, stream) => {
      acc[stream.type] = (acc[stream.type] || 0) + stream.amount;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(revenueByType).map(([type, amount]) => ({
      type,
      amount,
      percentage: (amount / totalRevenue) * 100
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Revenue Center</h1>
          <p className="text-gray-600 mt-1">Track earnings and manage payouts across all platforms</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                <div className="flex items-center mt-1">
                  {totalGrowth > 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                  <p className={`text-xs ml-1 ${totalGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalGrowth > 0 ? '+' : ''}{totalGrowth.toFixed(1)}% from last month
                  </p>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Streams</p>
                <p className="text-2xl font-bold text-gray-900">{activeStreams}</p>
                <p className="text-xs text-blue-600 mt-1">Revenue sources</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(pendingPayouts)}</p>
                <p className="text-xs text-yellow-600 mt-1">Processing</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue * 0.8)}</p>
                <p className="text-xs text-green-600 mt-1">+15.2% vs last month</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="streams" className="space-y-6">
        <TabsList>
          <TabsTrigger value="streams">Revenue Streams</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="payouts">Payout Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="streams" className="space-y-4">
          {mockRevenueStreams.map(stream => (
            <Card key={stream.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{stream.source}</h3>
                      <Badge className={platformColors[stream.platform as keyof typeof platformColors]}>
                        {stream.platform}
                      </Badge>
                      <Badge className={revenueTypeColors[stream.type]}>
                        {stream.type.replace('_', ' ')}
                      </Badge>
                      <Badge className={statusColors[stream.status]}>
                        {stream.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="font-semibold text-green-600 text-lg">{formatCurrency(stream.amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Growth</p>
                        <div className="flex items-center">
                          {stream.growth > 0 ? (
                            <ArrowUpRight className="w-4 h-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-600" />
                          )}
                          <p className={`font-semibold ml-1 ${stream.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stream.growth > 0 ? '+' : ''}{stream.growth}%
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Payout</p>
                        <p className="font-semibold">{stream.lastPayout}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Request Payout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="payout">Payouts</SelectItem>
                  <SelectItem value="earning">Earnings</SelectItem>
                  <SelectItem value="fee">Fees</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {mockTransactions.map(transaction => (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction.type === 'earning' ? 'bg-green-100' :
                          transaction.type === 'payout' ? 'bg-blue-100' :
                          'bg-red-100'
                        }`}>
                          {transaction.type === 'earning' ? (
                            <ArrowUpRight className={`w-5 h-5 ${
                              transaction.type === 'earning' ? 'text-green-600' :
                              transaction.type === 'payout' ? 'text-blue-600' :
                              'text-red-600'
                            }`} />
                          ) : transaction.type === 'payout' ? (
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{transaction.description}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={platformColors[transaction.platform as keyof typeof platformColors]}>
                              {transaction.platform}
                            </Badge>
                            <span className="text-sm text-gray-600">{transaction.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-semibold text-lg ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                        </p>
                        <Badge className={statusColors[transaction.status]}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getRevenueByType().map(({ type, amount, percentage }) => (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium capitalize">{type.replace('_', ' ')}</span>
                      <span className="font-semibold">{formatCurrency(amount)}</span>
                    </div>
                    <Progress value={percentage} />
                    <p className="text-sm text-gray-600">{percentage.toFixed(1)}% of total revenue</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Revenue trend chart</p>
                    <p className="text-sm text-gray-400">Monthly revenue progression</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Best Performing</h4>
                  <p className="text-sm text-gray-600">YouTube Partner Program</p>
                  <p className="font-semibold text-green-600">{formatCurrency(2100.80)}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Average per Stream</h4>
                  <p className="text-sm text-gray-600">Monthly revenue</p>
                  <p className="font-semibold text-blue-600">{formatCurrency(totalRevenue / mockRevenueStreams.length)}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Wallet className="w-8 h-8 text-amber-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Next Payout</h4>
                  <p className="text-sm text-gray-600">Estimated date</p>
                  <p className="font-semibold text-amber-600">Jan 30, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Payment Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Bank Account</p>
                        <p className="text-sm text-gray-600">****1234</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Primary</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Payout Schedule</h4>
                <Select defaultValue="monthly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Minimum Payout Threshold</h4>
                <Select defaultValue="100">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">$50</SelectItem>
                    <SelectItem value="100">$100</SelectItem>
                    <SelectItem value="250">$250</SelectItem>
                    <SelectItem value="500">$500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}