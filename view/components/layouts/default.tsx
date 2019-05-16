// default layout
import * as React from 'react'
import Head from 'next/head'
import '../../styles/styles.scss'
import Header from '../widgets/Header'

interface LayoutProps {
  title: string
  description: string
  image: string
}

const Layout: React.FC<Partial<LayoutProps>> = ({ children, title: titleProp, description: descProp, image }) => {
  const siteTitle = process.env.title || 'Title'
  const title = titleProp ? `${titleProp} | ${siteTitle}` : siteTitle
  const siteDescription = process.env.description || 'Description'
  const description = descProp || siteDescription

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0,width=device-width" /> 
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {image ? <meta property="og:image" content={image} /> : null}
        <meta property="twitter:card" content="summary" />
      </Head>
      <Header title={siteTitle} />
      <main className="columns is-centered">
        <div className="column is-two-thirds-desktop is-full-mobile">{children}</div>
      </main>
    </div>
  )
}

export default Layout
