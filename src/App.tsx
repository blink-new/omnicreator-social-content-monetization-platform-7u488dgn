import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Dashboard } from '@/pages/Dashboard'
import ContentCreator from '@/components/content/ContentCreator'
import PublishingCalendar from '@/components/calendar/PublishingCalendar'
import PlatformConnections from '@/components/platforms/PlatformConnections'
import AdManager from '@/components/ads/AdManager'
import Analytics from '@/components/analytics/Analytics'
import RevenueCenter from '@/components/revenue/RevenueCenter'
import Settings from '@/components/settings/Settings'
import { Toaster } from '@/components/ui/toaster'
import { blink } from '@/blink/client'
import type { User } from '@/types'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <div className="w-8 h-8 bg-white rounded-lg" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Loading OmniCreator...</h2>
            <p className="text-muted-foreground">Preparing your content empire</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="max-w-md w-full mx-auto text-center space-y-8 p-8">
            <div className="space-y-4">
              <div className="w-20 h-20 gradient-bg rounded-3xl flex items-center justify-center mx-auto">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Welcome to OmniCreator
                </h1>
                <p className="text-muted-foreground">
                  The unified platform for content creation, distribution, and monetization across all major social platforms.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border">
                  <div className="font-medium text-primary">Multi-Platform</div>
                  <div className="text-muted-foreground">Instagram, YouTube, TikTok, Facebook, WordPress</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border">
                  <div className="font-medium text-accent">AI-Powered</div>
                  <div className="text-muted-foreground">Smart content generation & optimization</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border">
                  <div className="font-medium text-green-600">Monetization</div>
                  <div className="text-muted-foreground">AdSense & Meta Ads integration</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border">
                  <div className="font-medium text-purple-600">Analytics</div>
                  <div className="text-muted-foreground">Comprehensive performance tracking</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => blink.auth.login()}
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started - Sign In
              </button>
              <p className="text-xs text-muted-foreground">
                Join thousands of creators maximizing their content revenue
              </p>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    )
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'content-creator':
        return <ContentCreator />
      case 'calendar':
        return <PublishingCalendar />
      case 'platforms':
        return <PlatformConnections />
      case 'ads':
        return <AdManager />
      case 'analytics':
        return <Analytics />
      case 'revenue':
        return <RevenueCenter />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 overflow-auto p-6">
          {renderCurrentPage()}
        </main>
      </div>
      <Toaster />
    </div>
  )
}

export default App