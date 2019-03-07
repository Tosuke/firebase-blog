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

const mockPosts: Post[] = [
  {
    id: '0',
    slug: 'test1',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'テストその1',
    description: 'テスト1の説明',
    html:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '1',
    slug: 'test2',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'テストその2',
    description: 'テスト2の説明',
    html: 'テスト2の内容',
  },
]

export async function* fetchEntries(): AsyncIterable<PostEntry> {
  for (const entry of mockPosts) {
    yield entry
  }
}

export async function fetchPost(slug: string): Promise<Post | undefined> {
  return mockPosts.find(p => p.slug === slug)
}