import dotenv from 'dotenv-safe'
dotenv.config()

import fs from 'fs'
import * as firebase from 'firebase-admin'
import fetch from 'isomorphic-unfetch'
import next from 'next'
import { createRouter } from '../server/router'

if(Symbol.asyncIterator == null) (Symbol as any).asyncIterator = Symbol('Symbol.asyncIterator')

const storage = firebase.storage()
const bucket = storage.bucket()

const origin = process.env.origin

main().catch(err => console.error(err)).then(() => process.exit())

async function main() {
  const app = next({ dev: false })
  await app.prepare()
  const router = createRouter(app)
  const tasks: Promise<void>[] = []

  async function renderPath(path: string): Promise<void> {
    const res = await router.resolve({ pathname: path })
    if (res.status !== 200) return
    
    const file = bucket.file(path === '/' ? '/index' : path)
    await file.save(res.content, { contentType: res.contentType })

    await purgeOld(path)
    console.log(path)
  }

  async function render404(): Promise<void> {
    const res = await router.resolve({ pathname: '/hogehogepiyopiyomogemoge' })
    const file = bucket.file('404.html')
    await file.save(res.content, { contentType: res.contentType })
    fs.writeFileSync('public/404.html', res.content)
    console.log('404 Page')
  }

  for await(const path of paths()) {
    tasks.push(renderPath(path))
  }
  tasks.push(render404())

  await Promise.all(tasks)
}

async function* paths(): AsyncIterable<string> {
  yield '/'
  yield '/posts.json'
  const postPaths = ['test1', 'test2'].map(slug => `/posts/${slug}`)
  yield* postPaths
  yield* postPaths.map(path => `${path}.json`)
}

async function purgeOld(path: string): Promise<unknown> {
  const p = path === '/' ? '' : path
  return fetch(`${origin}${p}`, { method: 'PURGE' }).then(r => r.json())
}
