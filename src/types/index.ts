export interface User {
  id: string
  email: string
  displayName?: string
  avatar?: string
  createdAt: string
}

export interface Platform {
  id: string
  name: string
  icon: string
  connected: boolean
  accountName?: string
  followers?: number
}

export interface Content {
  id: string
  title: string
  type: 'post' | 'story' | 'reel' | 'video' | 'blog'
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  platforms: string[]
  scheduledAt?: string
  publishedAt?: string
  content: string
  media?: string[]
  adPlacement?: 'auto' | 'manual' | 'none'
  adSpots?: AdSpot[]
  userId: string
  createdAt: string
  updatedAt: string
}

export interface AdSpot {
  id: string
  position: number
  type: 'adsense' | 'meta'
  revenue?: number
}

export interface Revenue {
  id: string
  contentId: string
  platform: string
  adNetwork: 'adsense' | 'meta' | 'youtube' | 'facebook' | 'instagram' | 'tiktok'
  amount: number
  currency: string
  date: string
  userId: string
}

export interface MediaAsset {
  id: string
  name: string
  type: 'image' | 'video' | 'audio'
  url: string
  thumbnail?: string
  size: number
  dimensions?: {
    width: number
    height: number
  }
  tags: string[]
  userId: string
  createdAt: string
}