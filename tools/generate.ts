import * as firebase from 'firebase-admin'
import fetch from 'isomorphic-unfetch'
import dotenv from 'dotenv-safe'
import { renderToString } from './render'

dotenv.config()

const serviceAccount = require('../.firebase/service-account.json')
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  storageBucket: process.env.firebaseStorageBucket
})

const storage = firebase.storage()
const bucket = storage.bucket()

const paths = ['/', '/posts/test1', '/posts/test2']

const origin = process.env.origin

async function purgeOld(path: string): Promise<unknown> {
  const p = path === '/' ? '' : path
  return fetch(`${origin}${p}`, { method: 'PURGE' }).then(r => r.json())
}

async function updatePage(path: string): Promise<void> {
  const html = await renderToString(path)
  const file = bucket.file(path === '/' ? '/index' : path)
  await file.save(html, { metadata: { contentType: 'text/html; charset=utf-8'}})
  await purgeOld(path)
}

const task = Promise.all(paths.map(path => updatePage(path).then(() => console.log(path))))

task.catch(e => console.error(e))
