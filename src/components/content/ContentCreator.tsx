import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Wand2, 
  Image, 
  Video, 
  Calendar, 
  Eye, 
  Settings,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Globe,
  Sparkles,
  Upload,
  Zap,
  Target
} from 'lucide-react'

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-red-600' },
  { id: 'tiktok', name: 'TikTok', icon: Twitter, color: 'bg-black' },
  { id: 'wordpress', name: 'WordPress', icon: Globe, color: 'bg-blue-800' }
]

const contentTypes = [
  { id: 'post', name: 'Social Post', description: 'Text, image, or video post' },
  { id: 'story', name: 'Story', description: 'Vertical format for stories' },
  { id: 'reel', name: 'Reel/Short', description: 'Short-form video content' },
  { id: 'blog', name: 'Blog Article', description: 'Long-form written content' },
  { id: 'carousel', name: 'Carousel', description: 'Multiple images/slides' }
]

export default function ContentCreator() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'facebook'])
  const [contentType, setContentType] = useState('post')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [aiAssistEnabled, setAiAssistEnabled] = useState(true)
  const [autoAdPlacement, setAutoAdPlacement] = useState(false)
  const [scheduledDate, setScheduledDate] = useState('')

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const generateAIContent = async () => {
    // Placeholder for AI content generation
    setContent("🚀 Exciting news! Just launched our new feature that helps creators maximize their reach across all social platforms. \n\nWhat's your favorite way to engage with your audience? Let me know in the comments! 👇\n\n#ContentCreator #SocialMedia #Innovation")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Creator</h1>
          <p className="text-gray-600 mt-1">Create and schedule content across all your platforms</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule
          </Button>
          <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Zap className="w-4 h-4" />
            Publish Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Content Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      contentType === type.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm">{type.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Editor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  Content Editor
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Switch
                    id="ai-assist"
                    checked={aiAssistEnabled}
                    onCheckedChange={setAiAssistEnabled}
                  />
                  <Label htmlFor="ai-assist" className="text-sm">AI Assist</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentType === 'blog' && (
                <Input
                  placeholder="Article title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-medium"
                />
              )}
              
              <div className="relative">
                <Textarea
                  placeholder={`Write your ${contentType === 'blog' ? 'article' : 'post'} content here...`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                {aiAssistEnabled && (
                  <Button
                    onClick={generateAIContent}
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Generate
                  </Button>
                )}
              </div>

              {/* Media Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Drop media files here or <span className="text-indigo-600 font-medium">browse</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports images, videos, and GIFs up to 100MB
                </p>
              </div>

              {/* AI Content Suggestions */}
              {aiAssistEnabled && content && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    AI Suggestions
                  </h4>
                  <div className="space-y-2">
                    <button className="text-xs bg-white rounded-full px-3 py-1 hover:bg-gray-50 transition-colors">
                      Add trending hashtags
                    </button>
                    <button className="text-xs bg-white rounded-full px-3 py-1 hover:bg-gray-50 transition-colors">
                      Optimize for engagement
                    </button>
                    <button className="text-xs bg-white rounded-full px-3 py-1 hover:bg-gray-50 transition-colors">
                      Generate call-to-action
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ad Placement Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Ad Monetization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-ads" className="font-medium">Automatic Ad Placement</Label>
                  <p className="text-sm text-gray-500">Let AI optimize ad placement for maximum revenue</p>
                </div>
                <Switch
                  id="auto-ads"
                  checked={autoAdPlacement}
                  onCheckedChange={setAutoAdPlacement}
                />
              </div>

              {!autoAdPlacement && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Manual Ad Placement</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="justify-start">
                      <div className="w-3 h-3 bg-amber-400 rounded mr-2"></div>
                      Before content
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <div className="w-3 h-3 bg-amber-400 rounded mr-2"></div>
                      After content
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <div className="w-3 h-3 bg-amber-400 rounded mr-2"></div>
                      In-content
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <div className="w-3 h-3 bg-amber-400 rounded mr-2"></div>
                      Sidebar
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  <strong>Estimated Revenue:</strong> $2.40 - $8.50 per 1K views
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Target Platforms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {platforms.map((platform) => {
                const Icon = platform.icon
                const isSelected = selectedPlatforms.includes(platform.id)
                
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${platform.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{platform.name}</div>
                      <div className="text-xs text-gray-500">
                        {isSelected ? 'Selected' : 'Click to select'}
                      </div>
                    </div>
                    {isSelected && (
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                        ✓
                      </Badge>
                    )}
                  </button>
                )
              })}
            </CardContent>
          </Card>

          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Publishing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="schedule-date" className="text-sm font-medium">Schedule Date</Label>
                <Input
                  id="schedule-date"
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Posting Frequency</Label>
                <Select defaultValue="once">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Post once</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="instagram" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="instagram" className="text-xs">IG</TabsTrigger>
                  <TabsTrigger value="facebook" className="text-xs">FB</TabsTrigger>
                  <TabsTrigger value="youtube" className="text-xs">YT</TabsTrigger>
                </TabsList>
                <TabsContent value="instagram" className="mt-4">
                  <div className="bg-white border rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <span className="text-xs font-medium">your_account</span>
                    </div>
                    <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-3">
                      {content || "Your content will appear here..."}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="facebook" className="mt-4">
                  <div className="bg-white border rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                      <span className="text-xs font-medium">Your Page</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      {content || "Your content will appear here..."}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="youtube" className="mt-4">
                  <div className="bg-white border rounded-lg p-3 space-y-2">
                    <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
                      <Video className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-xs font-medium">{title || "Video Title"}</p>
                    <p className="text-xs text-gray-500">
                      {content || "Video description..."}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}