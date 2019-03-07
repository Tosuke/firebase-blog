import * as React from 'react'
import Layout from '../components/layouts/default'
import EntriesList from '../components/widgets/EntriesList'
import { withInitialProps } from '../components/pages/withInitialProps'
import { PostEntry, fetchEntries } from '../lib/post'
import { toArray } from '../lib/async'

const Index: React.FC<{ entries: PostEntry[] }> = ({ entries }) => (
  <Layout>
    <section className="section">
      <EntriesList entries={entries} />
    </section>
  </Layout>
)

export default withInitialProps(async () => {
  const entries = await toArray(fetchEntries())
  return { entries }
})(Index)
