import * as React from 'react'
import Link from 'next/link'
import { PostEntry } from '../../lib/post'
import { toISODateString } from '../../lib/date'

const Entry: React.FC<{ entry: PostEntry }> = ({ entry }) => (
  <div>
    <Link as={`/posts/${entry.slug}`} href={`/post?slug=${entry.slug}`}>
      <a>
        <h4 className="has-text-black is-size-6">{toISODateString(entry.createdAt)}</h4>
        <h1 className="has-text-weight-bold has-text-black is-size-4">{entry.title}</h1>
        <p className="has-text-grey is-size-6">{entry.description}</p>
      </a>
    </Link>
  </div>
)

export default Entry
