import { PostEntry } from '../../types/post'

export function entryToJson(entry: PostEntry): any {
  return {
    ...entry,
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString(),
  }
}

export function docToEntry(doc: FirebaseFirestore.DocumentSnapshot): PostEntry {
  const data: any = doc.data()
  return {
    ...data,
    id: doc.id,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate()
  }
}
