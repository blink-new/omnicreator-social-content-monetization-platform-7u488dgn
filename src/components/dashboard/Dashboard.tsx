import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
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
  Eye,
  Heart,
  MessageCircle,
  Share,
  Plus,
  ArrowUpRight
} from 'lucide-react'

const revenueData = [
  { platform: 'YouTube', amount: '$1,234', change: '+12%', color: 'bg-red-500' },
  { platform: 'Instagram', amount: '$856', change: '+8%', color: 'bg-pink-500' },
  { platform: 'Facebook', amount: '$642', change: '+15%', color: 'bg-blue-500' },
  { platform: 'WordPress', amount: '$423', change: '+5%', color: 'bg-gray-600' },
]

const recentPosts = [
  {
    id: 1,
    title: 'AI-Generated Marketing Tips',
    platforms: ['Instagram', 'Facebook', 'Twitter'],
    status: 'Published',
    engagement: { views: 12500, likes: 856, comments: 42, shares: 23 },
    revenue: '$45.20'
  },
  {
    id: 2,
    title: 'Content Creation Workflow',
    platforms: ['YouTube', 'WordPress'],
    status: 'Scheduled',
    engagement: { views: 0, likes: 0, comments: 0, shares: 0 },
    revenue: '$0.00'
  },
  {
    id: 3,
    title: 'Social Media Trends 2025',
    platforms: ['Instagram', 'TikTok', 'Facebook'],
    status: 'Draft',
    engagement: { views: 0, likes: 0, comments: 0, shares: 0 },
    revenue: '$0.00'
  },
]

const platformIcons: Record<string, any> = {
  Instagram: Instagram,
  Facebook: Facebook,
  YouTube: Youtube,
  Twitter: Twitter,
  WordPress: Globe,
  TikTok: Twitter, // Using Twitter as placeholder for TikTok
}

export function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,155</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Published</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue by Platform */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Revenue by Platform</CardTitle>
            <CardDescription>Monthly earnings breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenueData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium">{item.platform}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{item.amount}</div>
                  <div className="text-xs text-green-600">{item.change}</div>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              View Detailed Report
            </Button>
          </CardContent>
        </Card>

        {/* Recent Content Performance */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Content Performance</CardTitle>
              <CardDescription>Your latest posts across all platforms</CardDescription>
            </div>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{post.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        {post.platforms.map((platform) => {
                          const Icon = platformIcons[platform]
                          return (
                            <div key={platform} className="flex items-center space-x-1">
                              <Icon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{platform}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={post.status === 'Published' ? 'default' : post.status === 'Scheduled' ? 'secondary' : 'outline'}>
                        {post.status}
                      </Badge>
                      <span className="text-sm font-medium text-green-600">{post.revenue}</span>
                    </div>
                  </div>
                  
                  {post.status === 'Published' && (
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span>{post.engagement.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-muted-foreground" />
                        <span>{post.engagement.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4 text-muted-foreground" />
                        <span>{post.engagement.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share className="w-4 h-4 text-muted-foreground" />
                        <span>{post.engagement.shares}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with your content creation workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Plus className="w-6 h-6" />
              <span>Create New Post</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Calendar className="w-6 h-6" />
              <span>Schedule Content</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <ArrowUpRight className="w-6 h-6" />
              <span>Connect Platform</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}