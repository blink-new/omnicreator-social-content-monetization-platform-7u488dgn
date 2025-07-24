import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard,
  PenTool,
  Image,
  Calendar,
  Link,
  Target,
  BarChart3,
  DollarSign,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    current: true
  },
  {
    name: 'Content Creator',
    href: '/create',
    icon: PenTool,
    current: false,
    badge: 'AI'
  },
  {
    name: 'Media Library',
    href: '/media',
    icon: Image,
    current: false
  },
  {
    name: 'Publishing Calendar',
    href: '/calendar',
    icon: Calendar,
    current: false
  },
  {
    name: 'Platform Connections',
    href: '/platforms',
    icon: Link,
    current: false,
    badge: '5'
  },
  {
    name: 'Ad Manager',
    href: '/ads',
    icon: Target,
    current: false
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    current: false
  },
  {
    name: 'Revenue Center',
    href: '/revenue',
    icon: DollarSign,
    current: false,
    badge: '$2.4k'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    current: false
  }
]

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn(
      "flex flex-col bg-white border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Collapse Toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <h2 className="text-sm font-semibold text-muted-foreground">
            WORKSPACE
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Quick Create Button */}
      <div className="p-4">
        <Button className="w-full gradient-bg hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4 mr-2" />
          {!collapsed && "Create Content"}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.name}
              variant={item.current ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-10",
                item.current && "bg-primary/10 text-primary hover:bg-primary/15",
                collapsed && "px-2"
              )}
            >
              <Icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge 
                      variant={item.badge === 'AI' ? 'default' : 'secondary'}
                      className={cn(
                        "ml-auto text-xs",
                        item.badge === 'AI' && "bg-accent text-accent-foreground",
                        item.badge === '$2.4k' && "bg-green-100 text-green-700"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Upgrade Banner */}
      {!collapsed && (
        <div className="p-4 border-t">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center">
                <DollarSign className="w-3 h-3 text-white" />
              </div>
              <span className="font-medium text-sm">Boost Revenue</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Upgrade to unlock advanced ad optimization and higher revenue sharing.
            </p>
            <Button size="sm" className="w-full">
              Upgrade Plan
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}