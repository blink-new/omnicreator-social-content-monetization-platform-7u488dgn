import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Eye, Heart, MessageCircle, Share, Download, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';

interface AnalyticsData {
  platform: string;
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
  clicks: number;
  shares: number;
  comments: number;
  likes: number;
  revenue: number;
  growth: number;
}

const mockAnalytics: AnalyticsData[] = [
  {
    platform: 'Instagram',
    followers: 125000,
    engagement: 4.2,
    reach: 89000,
    impressions: 156000,
    clicks: 3200,
    shares: 890,
    comments: 1200,
    likes: 8900,
    revenue: 1250.50,
    growth: 12.5
  },
  {
    platform: 'Facebook',
    followers: 89000,
    engagement: 3.8,
    reach: 67000,
    impressions: 134000,
    clicks: 2800,
    shares: 650,
    comments: 890,
    likes: 6700,
    revenue: 980.20,
    growth: 8.3
  },
  {
    platform: 'YouTube',
    followers: 45000,
    engagement: 6.1,
    reach: 78000,
    impressions: 234000,
    clicks: 4500,
    shares: 1200,
    comments: 2100,
    likes: 12000,
    revenue: 2100.80,
    growth: 15.2
  },
  {
    platform: 'TikTok',
    followers: 67000,
    engagement: 7.8,
    reach: 123000,
    impressions: 345000,
    clicks: 6700,
    shares: 2300,
    comments: 3400,
    likes: 18900,
    revenue: 890.30,
    growth: 22.1
  },
  {
    platform: 'WordPress',
    followers: 15000,
    engagement: 2.5,
    reach: 12000,
    impressions: 45000,
    clicks: 1200,
    shares: 180,
    comments: 340,
    likes: 890,
    revenue: 450.60,
    growth: 5.8
  }
];

interface ContentPerformance {
  id: string;
  title: string;
  platform: string;
  type: string;
  publishDate: string;
  views: number;
  engagement: number;
  revenue: number;
  ctr: number;
}

const mockContentPerformance: ContentPerformance[] = [
  {
    id: '1',
    title: 'Summer Fashion Trends 2024',
    platform: 'Instagram',
    type: 'Post',
    publishDate: '2024-01-20',
    views: 45000,
    engagement: 5.2,
    revenue: 180.50,
    ctr: 3.2
  },
  {
    id: '2',
    title: 'Tech Review: Latest Smartphone',
    platform: 'YouTube',
    type: 'Video',
    publishDate: '2024-01-18',
    views: 89000,
    engagement: 7.8,
    revenue: 450.20,
    ctr: 4.1
  },
  {
    id: '3',
    title: 'Quick Cooking Tips',
    platform: 'TikTok',
    type: 'Video',
    publishDate: '2024-01-22',
    views: 123000,
    engagement: 9.1,
    revenue: 320.80,
    ctr: 5.6
  }
];

const platformColors = {
  Instagram: 'bg-pink-100 text-pink-800',
  Facebook: 'bg-blue-100 text-blue-800',
  YouTube: 'bg-red-100 text-red-800',
  TikTok: 'bg-gray-100 text-gray-800',
  WordPress: 'bg-blue-100 text-blue-800'
};

export default function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const filteredAnalytics = selectedPlatform === 'all' 
    ? mockAnalytics 
    : mockAnalytics.filter(item => item.platform === selectedPlatform);

  const totalFollowers = mockAnalytics.reduce((sum, item) => sum + item.followers, 0);
  const totalRevenue = mockAnalytics.reduce((sum, item) => sum + item.revenue, 0);
  const totalImpressions = mockAnalytics.reduce((sum, item) => sum + item.impressions, 0);
  const avgEngagement = mockAnalytics.reduce((sum, item) => sum + item.engagement, 0) / mockAnalytics.length;
  const avgGrowth = mockAnalytics.reduce((sum, item) => sum + item.growth, 0) / mockAnalytics.length;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your content performance across all platforms</p>
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
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="YouTube">YouTube</SelectItem>
              <SelectItem value="TikTok">TikTok</SelectItem>
              <SelectItem value="WordPress">WordPress</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(totalFollowers)}</p>
                <p className="text-xs text-green-600 mt-1">+{avgGrowth.toFixed(1)}% growth</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+18.2% from last month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Impressions</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(totalImpressions)}</p>
                <p className="text-xs text-blue-600 mt-1">+12.5% from last month</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
                <p className="text-2xl font-bold text-gray-900">{avgEngagement.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">+2.1% from last month</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900">{avgGrowth.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">Above industry avg</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platform Breakdown</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive chart would be displayed here</p>
                  <p className="text-sm text-gray-400">Showing engagement, reach, and revenue trends</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockContentPerformance.slice(0, 3).map(content => (
                  <div key={content.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{content.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={platformColors[content.platform as keyof typeof platformColors]}>
                          {content.platform}
                        </Badge>
                        <span className="text-sm text-gray-600">{formatNumber(content.views)} views</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${content.revenue}</p>
                      <p className="text-sm text-gray-600">{content.engagement}% eng.</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Platform</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAnalytics.sort((a, b) => b.revenue - a.revenue).map(platform => (
                  <div key={platform.platform} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{platform.platform}</span>
                      <span className="font-semibold text-green-600">${platform.revenue.toFixed(2)}</span>
                    </div>
                    <Progress value={(platform.revenue / totalRevenue) * 100} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          {filteredAnalytics.map(platform => (
            <Card key={platform.platform} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
                      platform.platform === 'Instagram' ? 'bg-pink-500' :
                      platform.platform === 'Facebook' ? 'bg-blue-600' :
                      platform.platform === 'YouTube' ? 'bg-red-600' :
                      platform.platform === 'TikTok' ? 'bg-gray-900' :
                      'bg-blue-500'
                    }`}>
                      {platform.platform[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{platform.platform}</h3>
                      <p className="text-gray-600">{formatNumber(platform.followers)} followers</p>
                    </div>
                  </div>
                  <Badge className={`${platform.growth > 10 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    +{platform.growth}% growth
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Engagement</p>
                    <p className="font-semibold">{platform.engagement}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reach</p>
                    <p className="font-semibold">{formatNumber(platform.reach)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Impressions</p>
                    <p className="font-semibold">{formatNumber(platform.impressions)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Clicks</p>
                    <p className="font-semibold">{formatNumber(platform.clicks)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="font-semibold text-green-600">${platform.revenue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Likes</p>
                    <p className="font-semibold">{formatNumber(platform.likes)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Content Performance</h3>
            <Select defaultValue="revenue">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Sort by Revenue</SelectItem>
                <SelectItem value="views">Sort by Views</SelectItem>
                <SelectItem value="engagement">Sort by Engagement</SelectItem>
                <SelectItem value="date">Sort by Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {mockContentPerformance.map(content => (
            <Card key={content.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{content.title}</h4>
                      <Badge className={platformColors[content.platform as keyof typeof platformColors]}>
                        {content.platform}
                      </Badge>
                      <Badge variant="outline">{content.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {content.publishDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {formatNumber(content.views)} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {content.engagement}% engagement
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {content.ctr}% CTR
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600 text-lg">${content.revenue}</p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>18-24 years</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>25-34 years</span>
                      <span>42%</span>
                    </div>
                    <Progress value={42} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>35-44 years</span>
                      <span>18%</span>
                    </div>
                    <Progress value={18} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>45+ years</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>United States</span>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>United Kingdom</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Canada</span>
                    <span className="font-semibold">12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Australia</span>
                    <span className="font-semibold">8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Germany</span>
                    <span className="font-semibold">7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}