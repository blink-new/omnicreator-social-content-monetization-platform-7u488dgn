import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, Copy, MoreHorizontal, Filter, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  platforms: string[];
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'published' | 'failed' | 'draft';
  contentType: string;
  estimatedRevenue: number;
  adPlacement: string;
}

const mockScheduledPosts: ScheduledPost[] = [
  {
    id: '1',
    title: 'Summer Fashion Trends 2024',
    content: 'Discover the hottest fashion trends this summer...',
    platforms: ['Instagram', 'Facebook', 'TikTok'],
    scheduledDate: '2024-01-25',
    scheduledTime: '14:00',
    status: 'scheduled',
    contentType: 'Post',
    estimatedRevenue: 45.20,
    adPlacement: 'Automatic'
  },
  {
    id: '2',
    title: 'Tech Review: Latest Smartphone',
    content: 'In-depth review of the newest smartphone features...',
    platforms: ['YouTube', 'WordPress'],
    scheduledDate: '2024-01-26',
    scheduledTime: '10:30',
    status: 'scheduled',
    contentType: 'Blog Article',
    estimatedRevenue: 120.50,
    adPlacement: 'Manual'
  },
  {
    id: '3',
    title: 'Quick Cooking Tips',
    content: 'Learn these amazing cooking hacks...',
    platforms: ['Instagram', 'TikTok'],
    scheduledDate: '2024-01-24',
    scheduledTime: '18:00',
    status: 'published',
    contentType: 'Reel',
    estimatedRevenue: 32.80,
    adPlacement: 'Automatic'
  }
];

const platformColors = {
  Instagram: 'bg-pink-100 text-pink-800',
  Facebook: 'bg-blue-100 text-blue-800',
  YouTube: 'bg-red-100 text-red-800',
  TikTok: 'bg-gray-100 text-gray-800',
  WordPress: 'bg-blue-100 text-blue-800'
};

const statusColors = {
  scheduled: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  draft: 'bg-gray-100 text-gray-800'
};

export default function PublishingCalendar() {
  const [selectedView, setSelectedView] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPosts = mockScheduledPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || post.platforms.includes(filterPlatform);
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const getPostsForDate = (date: string) => {
    return filteredPosts.filter(post => post.scheduledDate === date);
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Publishing Calendar</h1>
          <p className="text-gray-600 mt-1">Schedule and manage your content across all platforms</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSelectedView(selectedView === 'calendar' ? 'list' : 'calendar')}>
            {selectedView === 'calendar' ? 'List View' : 'Calendar View'}
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Post
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by platform" />
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
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedView === 'calendar' ? (
        /* Calendar View */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              January 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => {
                const dateStr = date.toISOString().split('T')[0];
                const postsForDate = getPostsForDate(dateStr);
                const isToday = dateStr === new Date().toISOString().split('T')[0];
                const isCurrentMonth = date.getMonth() === new Date().getMonth();
                
                return (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      isToday ? 'bg-indigo-50 border-indigo-200' : 'border-gray-200'
                    } ${!isCurrentMonth ? 'opacity-50' : ''}`}
                    onClick={() => setSelectedDate(dateStr)}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isToday ? 'text-indigo-600' : 'text-gray-900'
                    }`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {postsForDate.slice(0, 2).map(post => (
                        <div
                          key={post.id}
                          className="text-xs p-1 rounded bg-indigo-100 text-indigo-800 truncate"
                        >
                          {post.title}
                        </div>
                      ))}
                      {postsForDate.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{postsForDate.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <Badge className={statusColors[post.status]}>
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.scheduledDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.scheduledTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Revenue: ${post.estimatedRevenue}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Ad: {post.adPlacement}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.platforms.map(platform => (
                        <Badge key={platform} className={platformColors[platform as keyof typeof platformColors]}>
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Duplicate Selected
            </Button>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Bulk Edit
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Reschedule
            </Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}