export interface PostEntry {
  id: string
  slug: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
}

export interface Post extends PostEntry {
  html: string
}