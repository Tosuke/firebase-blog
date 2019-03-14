import * as functions from 'firebase-functions'
import firebase from 'firebase-admin'
firebase.initializeApp()

const storage = firebase.storage()

export const test = functions.https.onRequest((req, res) => {
  const random = Math.random()
  res.set({
    'Cache-Control': 'max-age=300, s-maxage=3536000',
    'Content-Type': 'text/plain; charset=utf-8',
  })
  res.write(`Num:${random}`)
  res.end()
})

const removeHTMLExtRegexp = /^(.*)\.html?$/

function removeHTMLExt(path: string): string {
  const matched = removeHTMLExtRegexp.exec(path)
  if (matched) {
    const [, removed] = matched
    return removed
  } else {
    return path
  }
}

function fixIndex(path: string): string {
  return path === '/' ? '/index' : path
}

const getExtRegexp = /\.(\w+)$/

function getExp(path: string): string {
  const matched = getExtRegexp.exec(path)
  if (matched) {
    const [, exp] = matched
    return exp
  } else {
    return ''
  }
}

const contentTypeMap = new Map([
  ['png', 'image/png'],
  ['jpg', 'image/jpeg'],
  ['webp', 'image/webp'],
  ['json', 'application/json'],
  ['', 'text/html; charset=utf-8'],
])

function getContentType(path: string): string {
  const exp = getExp(path)
  return contentTypeMap.get(exp) || 'application/octet-stream'
}

export const serve = functions.https.onRequest(async (req, res) => {
  const path = fixIndex(removeHTMLExt(req.path))
  const contentType = getContentType(path)
  try {
    const file = storage.bucket().file(path)
    const checkExistsTask = file.exists().then(result => {
      const exists = result[0]
      if (!exists) {
        res
          .status(404)
          .set({
            'Content-Type': contentType,
            'Cache-Control': 'max-age=300, s-maxage=3600',
          })
        if (contentType.startsWith('text/html')) {
          const rs = storage.bucket().file('404.html').createReadStream()
          rs.pipe(res)
          rs.on('end', () => res.end())
        } else {
          res.end()
        }
      }
    })
    const rs = file.createReadStream()
    res.set({
      'Content-Type': contentType,
      'Cache-Control': 'max-age=300, s-maxage=3536000',
    })
    rs.pipe(res)
    rs.on('end', () => {
      res.end()
    })
    rs.on('error', err => {
      console.error(err)
      res.end()
    })
    await checkExistsTask
  } catch (e) {
    res.status(500)
    res.end()
  }
})
