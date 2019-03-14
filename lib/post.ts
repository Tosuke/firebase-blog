import { DocumentSnapshot } from '@firebase/firestore-types'
import fetch from 'isomorphic-unfetch'
import { willBeFirestore } from './firebase'
import { Post, PostEntry } from '../types/post'
export { Post, PostEntry} from '../types/post'

const willBePostsCollection = willBeFirestore.then(db => db.collection('posts'))

function getPostEntryFromDocument(doc: DocumentSnapshot): PostEntry {
  const data = doc.data()!
  return {
    id: doc.id,
    slug: data.slug,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    title: data.title,
    description: data.description,
  }
}

function getPostFromDocument(doc: DocumentSnapshot): Post {
  return {
    ...getPostEntryFromDocument(doc),
    html: doc.data()!.html,
  }
}

export async function fetchEntries(): Promise<PostEntry[]> {
  const posts$ = await willBePostsCollection
  const entries: PostEntry[] = await posts$
    .orderBy('createdAt')
    .get()
    .then(qs => qs.docs.map(getPostEntryFromDocument))
  return entries
}

export async function fetchPostBySlug(slug: string): Promise<Post | undefined> {
  const postJson = await fetch(`${process.env.origin}/posts/${slug}.json`).then(res => {
    if (res.status === 200) return res.json()
    return undefined
  })
  if (postJson == null) return undefined

  return {
    ...postJson,
    createdAt: new Date(postJson.createdAt),
    updatedAt: new Date(postJson.updatedAt)
  }
}
