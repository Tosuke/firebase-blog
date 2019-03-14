import firebase from '../firebase'
import { entryToJson, docToEntry } from './entryUtil'
import { Response } from '../type'

const db = firebase.firestore()

export async function renderRootEntries(): Promise<Response> {
  const entries = await db
    .collection('posts')
    .orderBy('createdAt')
    .limit(30)
    .get()

  const content = entries.docs
    .map(doc => docToEntry(doc))
    .map(entry => {
      delete (entry as any).html
      return entryToJson(entry)
    })

  return {
    status: 200,
    contentType: 'application/json',
    content: new Buffer(JSON.stringify(content)),
  }
}
