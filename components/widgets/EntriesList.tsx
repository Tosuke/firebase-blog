import * as React from 'react'
import Entry from './Entry'
import { PostEntry } from '../../lib/post'

const EntriesList: React.FC<{ entries: PostEntry[] }> = ({ entries }) => (
  <>
    {entries.map(entry => (
      <div key={entry.slug} className="border">
        <Entry entry={entry} />
      </div>
    ))}
    <style jsx>{`
      .border {
        border-bottom: solid 0.1rem grey;
      }
    `}</style>
  </>
)

export default EntriesList