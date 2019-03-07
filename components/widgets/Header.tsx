import * as React from 'react'
import Link from 'next/link'

const Header: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <header>
    <section className="hero is-primary is-small is-bold">
      <div className="hero-body container has-text-centered">
        <Link href="/">
          <a>
            <h1 className="title">{title}</h1>
          </a>
        </Link>
        <h2 className="subtitle">{description}</h2>
      </div>
    </section>
  </header>
)

export default Header
