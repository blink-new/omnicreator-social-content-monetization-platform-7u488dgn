import React, { useState } from 'react';
import { DollarSign, Target, BarChart3, Settings, Play, Pause, Edit, Trash2, Plus, TrendingUp, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AdCampaign {
  id: string;
  name: string;
  platform: string;
  type: 'google_adsense' | 'meta_ads' | 'youtube_ads' | 'native';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  revenue: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpm: number;
  startDate: string;
  endDate: string;
  placement: 'automatic' | 'manual';
  adSpots: string[];
}

const mockCampaigns: AdCampaign[] = [
  {
    id: '1',
    name: 'Fashion Content Monetization',
    platform: 'Google AdSense',
    type: 'google_adsense',
    status: 'active',
    budget: 1000,
    spent: 650,
    revenue: 1250,
    impressions: 125000,
    clicks: 2500,
    ctr: 2.0,
    cpm: 5.20,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    placement: 'automatic',
    adSpots: ['header', 'sidebar', 'in-content']
  },
  {
    id: '2',
    name: 'Instagram Story Ads',
    platform: 'Meta Ads',
    type: 'meta_ads',
    status: 'active',
    budget: 800,
    spent: 420,
    revenue: 890,
    impressions: 89000,
    clicks: 1780,
    ctr: 2.0,
    cpm: 4.70,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    placement: 'manual',
    adSpots: ['story-break', 'post-end']
  },
  {
    id: '3',
    name: 'YouTube Pre-roll Campaign',
    platform: 'YouTube',
    type: 'youtube_ads',
    status: 'paused',
    budget: 1200,
    spent: 800,
    revenue: 1600,
    impressions: 200000,
    clicks: 4000,
    ctr: 2.0,
    cpm: 4.00,
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    placement: 'automatic',
    adSpots: ['pre-roll', 'mid-roll']
  }
];

interface AdPlacement {
  id: string;
  name: string;
  type: 'banner' | 'video' | 'native' | 'interstitial';
  position: string;
  platform: string;
  revenue: number;
  impressions: number;
  ctr: number;
  isActive: boolean;
}

const mockPlacements: AdPlacement[] = [
  {
    id: '1',
    name: 'Header Banner',
    type: 'banner',
    position: 'Top of page',
    platform: 'WordPress',
    revenue: 450.20,
    impressions: 45000,
    ctr: 1.8,
    isActive: true
  },
  {
    id: '2',
    name: 'Story Ad Break',
    type: 'video',
    position: 'Between stories',
    platform: 'Instagram',
    revenue: 320.50,
    impressions: 32000,
    ctr: 2.2,
    isActive: true
  },
  {
    id: '3',
    name: 'In-Feed Native',
    type: 'native',
    position: 'Feed integration',
    platform: 'Facebook',
    revenue: 280.80,
    impressions: 28000,
    ctr: 1.9,
    isActive: false
  }
];

const platformColors = {
  'Google AdSense': 'bg-blue-100 text-blue-800',
  'Meta Ads': 'bg-blue-100 text-blue-800',
  'YouTube': 'bg-red-100 text-red-800',
  'WordPress': 'bg-blue-100 text-blue-800',
  'Instagram': 'bg-pink-100 text-pink-800',
  'Facebook': 'bg-blue-100 text-blue-800'
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-gray-100 text-gray-800',
  draft: 'bg-gray-100 text-gray-800'
};

export default function AdManager() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [placements, setPlacements] = useState(mockPlacements);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const toggleCampaignStatus = (campaignId: string) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: campaign.status === 'active' ? 'paused' : 'active' }
        : campaign
    ));
  };

  const togglePlacementStatus = (placementId: string) => {
    setPlacements(placements.map(placement => 
      placement.id === placementId 
        ? { ...placement, isActive: !placement.isActive }
        : placement
    ));
  };

  const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0);
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const roi = totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ad Manager</h1>
          <p className="text-gray-600 mt-1">Manage your ad campaigns and monetization</p>
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
            </SelectContent>
          </Select>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
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
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
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
                <p className="text-sm font-medium text-gray-600">ROI</p>
                <p className="text-2xl font-bold text-gray-900">{roi.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">+5.2% from last month</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Impressions</p>
                <p className="text-2xl font-bold text-gray-900">{(totalImpressions / 1000).toFixed(0)}K</p>
                <p className="text-xs text-blue-600 mt-1">+8.3% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg CTR</p>
                <p className="text-2xl font-bold text-gray-900">{avgCTR.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">+0.3% from last month</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="placements">Ad Placements</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {campaigns.map(campaign => (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{campaign.name}</h3>
                      <Badge className={platformColors[campaign.platform as keyof typeof platformColors]}>
                        {campaign.platform}
                      </Badge>
                      <Badge className={statusColors[campaign.status]}>
                        {campaign.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="font-semibold text-green-600">${campaign.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Spent</p>
                        <p className="font-semibold">${campaign.spent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Impressions</p>
                        <p className="font-semibold">{(campaign.impressions / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">CTR</p>
                        <p className="font-semibold">{campaign.ctr}%</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Budget Progress</span>
                        <span>${campaign.spent} / ${campaign.budget}</span>
                      </div>
                      <Progress value={(campaign.spent / campaign.budget) * 100} />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline">
                        {campaign.placement} placement
                      </Badge>
                      {campaign.adSpots.map(spot => (
                        <Badge key={spot} variant="outline" className="text-xs">
                          {spot}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCampaignStatus(campaign.id)}
                    >
                      {campaign.status === 'active' ? (
                        <Pause className="w-4 h-4 mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {campaign.status === 'active' ? 'Pause' : 'Resume'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="placements" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Ad Placements</h3>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Placement
            </Button>
          </div>

          {placements.map(placement => (
            <Card key={placement.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{placement.name}</h4>
                      <p className="text-sm text-gray-600">{placement.position}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <Badge className={platformColors[placement.platform as keyof typeof platformColors]}>
                          {placement.platform}
                        </Badge>
                        <Badge variant="outline">{placement.type}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="font-semibold text-green-600">${placement.revenue}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">CTR</p>
                      <p className="font-semibold">{placement.ctr}%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={placement.isActive}
                        onCheckedChange={() => togglePlacementStatus(placement.id)}
                      />
                      <span className="text-sm text-gray-600">Active</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800">Increase Instagram Story Ad Frequency</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your Instagram story ads have a 2.2% CTR, which is 15% above average. 
                      Consider increasing the frequency to maximize revenue.
                    </p>
                    <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                      Apply Recommendation
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Optimize Ad Placement Timing</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your audience is most active between 2-4 PM. Scheduling more ads during 
                      this time could increase engagement by 20%.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Budget Reallocation Opportunity</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Your YouTube campaign has the highest ROI (180%). Consider moving 
                      budget from lower-performing campaigns.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Reallocate Budget
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}