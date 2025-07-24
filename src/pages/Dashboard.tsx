import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { blink } from '@/blink/client'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Globe,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  Heart,
  Share2,
  MessageCircle
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const revenueData = [
  { name: 'Jan', revenue: 1200, posts: 45 },
  { name: 'Feb', revenue: 1800, posts: 52 },
  { name: 'Mar', revenue: 2400, posts: 61 },
  { name: 'Apr', revenue: 2100, posts: 58 },
  { name: 'May', revenue: 2800, posts: 67 },
  { name: 'Jun', revenue: 3200, posts: 73 }
]

const platformData = [
  { name: 'Instagram', value: 35, color: '#E4405F' },
  { name: 'YouTube', value: 28, color: '#FF0000' },
  { name: 'Facebook', value: 20, color: '#1877F2' },
  { name: 'TikTok', value: 12, color: '#000000' },
  { name: 'WordPress', value: 5, color: '#21759B' }
]

const recentContent = [
  {
    id: '1',
    title: 'Summer Fashion Trends 2024',
    type: 'post',
    platforms: ['instagram', 'facebook'],
    status: 'published',
    views: 12500,
    engagement: 8.4,
    revenue: 45.20
  },
  {
    id: '2',
    title: 'Tech Review: Latest Smartphone',
    type: 'video',
    platforms: ['youtube', 'tiktok'],
    status: 'scheduled',
    views: 0,
    engagement: 0,
    revenue: 0
  },
  {
    id: '3',
    title: 'Productivity Tips for Creators',
    type: 'blog',
    platforms: ['wordpress'],
    status: 'published',
    views: 3200,
    engagement: 12.1,
    revenue: 28.50
  }
]

export function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    totalReach: 0,
    contentCount: 0,
    adRevenue: 0,
    recentContent: [],
    platformConnections: []
  })

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const user = await blink.auth.me()
        setUser(user)

        // Load revenue data
        const revenueData = await blink.db.revenue_transactions.list({
          where: { user_id: user.id },
          orderBy: { created_at: 'desc' }
        })

        // Load content data
        const contentData = await blink.db.content.list({
          where: { user_id: user.id },
          orderBy: { created_at: 'desc' },
          limit: 5
        })

        // Load platform connections
        const platformData = await blink.db.platform_connections.list({
          where: { user_id: user.id, is_active: "1" }
        })

        // Calculate totals
        const totalRevenue = revenueData.reduce((sum, transaction) => sum + transaction.amount, 0)
        const adRevenue = revenueData
          .filter(t => t.transaction_type === 'ad_revenue')
          .reduce((sum, transaction) => sum + transaction.amount, 0)
        
        const totalReach = contentData.reduce((sum, content) => {
          const metrics = content.engagement_metrics ? JSON.parse(content.engagement_metrics) : {}
          return sum + (metrics.impressions || metrics.views || 0)
        }, 0)

        setDashboardData({
          totalRevenue,
          totalReach,
          contentCount: contentData.length,
          adRevenue,
          recentContent: contentData,
          platformConnections: platformData
        })
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-8 bg-gray-200 rounded w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Creator! 👋</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your content empire today.
          </p>
        </div>
        <Button className="gradient-bg hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${dashboardData.totalRevenue.toFixed(2)}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{(dashboardData.totalReach / 1000).toFixed(0)}K</div>
            <div className="flex items-center text-xs text-blue-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Published</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{dashboardData.contentCount}</div>
            <div className="flex items-center text-xs text-purple-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +15.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ad Revenue</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${dashboardData.adRevenue.toFixed(2)}</div>
            <div className="flex items-center text-xs text-orange-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +22.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Revenue & Content Trend
            </CardTitle>
            <CardDescription>
              Monthly revenue and content publication over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="posts" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--accent))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Platform Distribution
            </CardTitle>
            <CardDescription>
              Revenue distribution across platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {platformData.map((platform) => (
                <div key={platform.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: platform.color }}
                  />
                  <span className="text-sm">{platform.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {platform.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Content & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Content</CardTitle>
            <CardDescription>
              Your latest published and scheduled content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentContent.map((content) => (
                <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                      {content.content_type === 'reel' && <Youtube className="w-6 h-6 text-red-600" />}
                      {content.content_type === 'post' && <Instagram className="w-6 h-6 text-pink-600" />}
                      {content.content_type === 'blog' && <Globe className="w-6 h-6 text-blue-600" />}
                      {content.content_type === 'story' && <Instagram className="w-6 h-6 text-purple-600" />}
                      {content.content_type === 'carousel' && <Instagram className="w-6 h-6 text-orange-600" />}
                    </div>
                    <div>
                      <h4 className="font-medium">{content.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant={content.status === 'published' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {content.status}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {JSON.parse(content.platforms || '[]').map((platform) => (
                            <div key={platform} className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                              {platform === 'instagram' && <Instagram className="w-2 h-2" />}
                              {platform === 'facebook' && <Facebook className="w-2 h-2" />}
                              {platform === 'youtube' && <Youtube className="w-2 h-2" />}
                              {platform === 'tiktok' && <div className="w-2 h-2 bg-black rounded-full" />}
                              {platform === 'wordpress' && <Globe className="w-2 h-2" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {(() => {
                          const metrics = content.engagement_metrics ? JSON.parse(content.engagement_metrics) : {}
                          return (metrics.impressions || metrics.views || 0).toLocaleString()
                        })()}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-3 h-3 mr-1" />
                        ${(content.actual_revenue || 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Create New Post
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Content
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Optimize Ads
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Zap className="w-4 h-4 mr-2" />
              AI Generate Content
            </Button>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Platform Status</h4>
              <div className="space-y-2">
                {dashboardData.platformConnections.map((connection) => (
                  <div key={connection.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {connection.platform === 'instagram' && <Instagram className="w-4 h-4 text-pink-600" />}
                      {connection.platform === 'youtube' && <Youtube className="w-4 h-4 text-red-600" />}
                      {connection.platform === 'facebook' && <Facebook className="w-4 h-4 text-blue-600" />}
                      {connection.platform === 'tiktok' && <div className="w-4 h-4 bg-black rounded-full" />}
                      {connection.platform === 'wordpress' && <Globe className="w-4 h-4 text-blue-600" />}
                      <span className="text-sm capitalize">{connection.platform}</span>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      Connected
                    </Badge>
                  </div>
                ))}
                {dashboardData.platformConnections.length === 0 && (
                  <p className="text-sm text-muted-foreground">No platforms connected yet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}