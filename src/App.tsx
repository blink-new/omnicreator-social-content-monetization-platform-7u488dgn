import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { Dashboard } from './components/dashboard/Dashboard'
import { Toaster } from './components/ui/toaster'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

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
          <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto animate-pulse">
            <div className="w-6 h-6 bg-white rounded" />
          </div>
          <div className="text-lg font-medium">Loading OmniCreator...</div>
          <div className="text-sm text-muted-foreground">Preparing your content creation workspace</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mx-auto">
            <div className="w-8 h-8 bg-white rounded-lg" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome to OmniCreator</h1>
            <p className="text-muted-foreground">
              The unified platform for social content creation, distribution, and monetization
            </p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => blink.auth.login()}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In to Get Started
            </button>
            <p className="text-xs text-muted-foreground">
              Create content for Instagram, Facebook, YouTube, TikTok, and WordPress with integrated ad monetization
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'creator':
        return (
          <div className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Content Creator</h2>
              <p className="text-muted-foreground">Multi-format editor with AI assistance coming soon...</p>
            </div>
          </div>
        )
      case 'media':
        return (
          <div className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Media Library</h2>
              <p className="text-muted-foreground">Freepik-style asset management coming soon...</p>
            </div>
          </div>
        )
      case 'calendar':
        return (
          <div className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Publishing Calendar</h2>
              <p className="text-muted-foreground">Bulk scheduling with multi-account support coming soon...</p>
            </div>
          </div>
        )
      case 'platforms':
        return (
          <div className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Platform Connections</h2>
              <p className="text-muted-foreground">Connect Instagram, Facebook, YouTube, TikTok, and WordPress coming soon...</p>
            </div>
          </div>
        )
      case 'ads':
        return (
          <div className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Ad Manager</h2>
              <p className="text-muted-foreground">Automatic and manual ad placement with Google AdSense and Meta Ads coming soon...</p>
            </div>
          </div>
        )
      case 'analytics':
        return (
          <div className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Analytics</h2>
              <p className="text-muted-foreground">Cross-platform performance insights coming soon...</p>
            </div>
          </div>
        )
      case 'revenue':
        return (
          <div className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Revenue Center</h2>
              <p className="text-muted-foreground">Direct monetization tracking and payout management coming soon...</p>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-muted-foreground">Account and platform settings coming soon...</p>
            </div>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header activeTab={activeTab} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
      <Toaster />
    </div>
  )
}

export default App