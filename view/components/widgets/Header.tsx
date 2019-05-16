import * as React from 'react'
import Link from 'next/link'

const Header: React.FC<{ title: string }> = ({ title }) => (
  <header>
    <section className="hero is-primary is-small is-bold">
      <div className="hero-body container has-text-centered">
        <Link href="/">
          <a>
            <h1 className="is-size-3 has-text-weight-bold">{title}</h1>
          </a>
        </Link>
      </div>
    </section>
  </header>
)

export default Header
