import { Response } from '../type'
import firebase from '../firebase'

const posts = firebase.firestore().collection('posts')

export async function renderPost(slug: string): Promise<Response> {
  const post$ = await posts.where('slug', '==', slug).limit(1).get()
  if (post$.empty) return {
    status: 404,
    contentType: 'application/json',
    content: new Buffer('{}')
  }

  const postDoc = post$.docs[0]
  const data = postDoc.data()
  const postJson = {
    ...data,
    id: postDoc.id,
    createdAt: data.createdAt.toDate().toISOString(),
    updatedAt: data.updatedAt.toDate().toISOString(),
  }
  return {
    status: 200,
    contentType: 'application/json',
    content: new Buffer(JSON.stringify(postJson))
  }
}