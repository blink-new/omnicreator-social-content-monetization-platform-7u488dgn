import React, { useState } from 'react';
import { Link, Unlink, Settings, RefreshCw, AlertCircle, CheckCircle, Plus, Users, BarChart3 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';

interface PlatformAccount {
  id: string;
  platform: string;
  accountName: string;
  username: string;
  avatar: string;
  isConnected: boolean;
  followers: number;
  engagement: number;
  lastSync: string;
  status: 'active' | 'error' | 'limited' | 'pending';
  permissions: string[];
  autoPost: boolean;
  adIntegration: boolean;
}

const mockAccounts: PlatformAccount[] = [
  {
    id: '1',
    platform: 'Instagram',
    accountName: 'My Fashion Brand',
    username: '@myfashionbrand',
    avatar: '/api/placeholder/40/40',
    isConnected: true,
    followers: 125000,
    engagement: 4.2,
    lastSync: '2 minutes ago',
    status: 'active',
    permissions: ['publish_posts', 'read_insights', 'manage_comments'],
    autoPost: true,
    adIntegration: true
  },
  {
    id: '2',
    platform: 'Facebook',
    accountName: 'Fashion Brand Page',
    username: 'Fashion Brand',
    avatar: '/api/placeholder/40/40',
    isConnected: true,
    followers: 89000,
    engagement: 3.8,
    lastSync: '5 minutes ago',
    status: 'active',
    permissions: ['publish_posts', 'read_insights', 'manage_ads'],
    autoPost: true,
    adIntegration: true
  },
  {
    id: '3',
    platform: 'YouTube',
    accountName: 'Fashion Tutorials',
    username: 'Fashion Tutorials',
    avatar: '/api/placeholder/40/40',
    isConnected: true,
    followers: 45000,
    engagement: 6.1,
    lastSync: '1 hour ago',
    status: 'limited',
    permissions: ['upload_videos', 'read_analytics'],
    autoPost: false,
    adIntegration: true
  },
  {
    id: '4',
    platform: 'TikTok',
    accountName: 'Fashion Tips',
    username: '@fashiontips2024',
    avatar: '/api/placeholder/40/40',
    isConnected: false,
    followers: 0,
    engagement: 0,
    lastSync: 'Never',
    status: 'pending',
    permissions: [],
    autoPost: false,
    adIntegration: false
  },
  {
    id: '5',
    platform: 'WordPress',
    accountName: 'Fashion Blog',
    username: 'fashionblog.com',
    avatar: '/api/placeholder/40/40',
    isConnected: true,
    followers: 15000,
    engagement: 2.5,
    lastSync: '30 minutes ago',
    status: 'error',
    permissions: ['publish_posts', 'manage_media'],
    autoPost: true,
    adIntegration: true
  }
];

const platformColors = {
  Instagram: 'bg-pink-500',
  Facebook: 'bg-blue-600',
  YouTube: 'bg-red-600',
  TikTok: 'bg-gray-900',
  WordPress: 'bg-blue-500'
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  limited: 'bg-yellow-100 text-yellow-800',
  pending: 'bg-gray-100 text-gray-800'
};

const statusIcons = {
  active: CheckCircle,
  error: AlertCircle,
  limited: AlertCircle,
  pending: RefreshCw
};

export default function PlatformConnections() {
  const [accounts, setAccounts] = useState(mockAccounts);

  const toggleAutoPost = (accountId: string) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, autoPost: !account.autoPost }
        : account
    ));
  };

  const toggleAdIntegration = (accountId: string) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, adIntegration: !account.adIntegration }
        : account
    ));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const connectedAccounts = accounts.filter(account => account.isConnected);
  const totalFollowers = connectedAccounts.reduce((sum, account) => sum + account.followers, 0);
  const avgEngagement = connectedAccounts.length > 0 
    ? connectedAccounts.reduce((sum, account) => sum + account.engagement, 0) / connectedAccounts.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Connections</h1>
          <p className="text-gray-600 mt-1">Connect and manage your social media accounts</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Platform
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Platforms</p>
                <p className="text-2xl font-bold text-gray-900">{connectedAccounts.length}/5</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Link className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <Progress value={(connectedAccounts.length / 5) * 100} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(totalFollowers)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
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
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Accounts */}
      <div className="space-y-4">
        {accounts.map(account => {
          const StatusIcon = statusIcons[account.status];
          
          return (
            <Card key={account.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`w-12 h-12 ${platformColors[account.platform as keyof typeof platformColors]} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                        {account.platform[0]}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                        account.isConnected ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        {account.isConnected ? (
                          <CheckCircle className="w-3 h-3 text-white" />
                        ) : (
                          <Unlink className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg">{account.accountName}</h3>
                        <Badge className={statusColors[account.status]}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {account.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{account.username}</p>
                      
                      {account.isConnected && (
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {formatNumber(account.followers)} followers
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4" />
                            {account.engagement}% engagement
                          </div>
                          <div className="flex items-center gap-1">
                            <RefreshCw className="w-4 h-4" />
                            Last sync: {account.lastSync}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {account.isConnected ? (
                      <>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={account.autoPost}
                              onCheckedChange={() => toggleAutoPost(account.id)}
                            />
                            <span className="text-sm text-gray-600">Auto-post</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={account.adIntegration}
                              onCheckedChange={() => toggleAdIntegration(account.id)}
                            />
                            <span className="text-sm text-gray-600">Ad integration</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                        <Button variant="outline" size="sm">
                          <Unlink className="w-4 h-4 mr-2" />
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button className="bg-indigo-600 hover:bg-indigo-700">
                        <Link className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>

                {account.status === 'error' && (
                  <Alert className="mt-4 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      Connection error: Please reconnect your {account.platform} account to resume posting.
                    </AlertDescription>
                  </Alert>
                )}

                {account.status === 'limited' && (
                  <Alert className="mt-4 border-yellow-200 bg-yellow-50">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      Limited permissions: Some features may not work properly. Please update permissions.
                    </AlertDescription>
                  </Alert>
                )}

                {account.isConnected && account.permissions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                    <div className="flex flex-wrap gap-2">
                      {account.permissions.map(permission => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Connection Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Required Permissions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Publish posts and stories</li>
                <li>• Read analytics and insights</li>
                <li>• Manage comments and messages</li>
                <li>• Access ad management (for monetization)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Troubleshooting</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ensure you're an admin of the account</li>
                <li>• Check platform API limits</li>
                <li>• Verify business account status</li>
                <li>• Contact support if issues persist</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}