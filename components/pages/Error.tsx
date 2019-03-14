import * as React from 'react'
import { useCallback } from 'react'
import Router from 'next/router'
import Layout from '../layouts/default'

const ErrorMessage: React.FC<{ statusCode?: number }> = ({ statusCode }) => {
  switch (statusCode) {
    case 404: {
      return <h1 className="title">404: Not Found</h1>
    }
    case 500: {
      return <h1 className="title">500: Internal Error</h1>
    }
    default: {
      if (statusCode) {
        return <h1 className="title">Something Happened(status: {statusCode})</h1>
      } else {
        return <h1 className="title">Client Error</h1>
      }
    }
  }
}

const ErrorPage: React.FC<{ statusCode?: number }> = ({ statusCode }) => {
  const goBack = useCallback(() => Router.back(), [])
  return (
    <Layout>
      <section className="section">
        <ErrorMessage statusCode={statusCode} />
        <button className="button is-info" onClick={goBack}>
          Back
        </button>
      </section>
    </Layout>
  )
}

export default ErrorPage
