export interface PostEntry {
  id: string
  slug: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  html?: string
}

export interface Post extends PostEntry {
  html: string
}