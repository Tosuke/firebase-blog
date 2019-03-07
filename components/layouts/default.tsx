// default layout
import * as React from 'react'
import '../../styles/styles.scss'
import Header from '../widgets/Header'

const Layout: React.FC = ({ children }) => {
  const title = process.env.title || 'Title'
  const description = process.env.description || 'Description'
  return (
    <div>
      <Header title={title} description={description} />
      <main className="columns is-centered">
        <div className="column is-two-thirds">{children}</div>
      </main>
    </div>
  )
}

export default Layout
