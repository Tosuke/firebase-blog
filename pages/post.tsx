import * as React from 'react'
import Layout from '../components/layouts/default'
import ErrorPage from '../components/pages/Error'
import { withInitialProps } from '../components/pages/withInitialProps'
import { Either, right, left, mapEither } from '../lib/either'
import { Post, fetchPost } from '../lib/post'
import { toISODateString } from '../lib/date'

const PostContent: React.FC<{ post: Post }> = ({ post }) => (
  <Layout>
    <section className="section">
      <header className="post-header">
        <h4 className="has-text-weight-light has-text-black">{toISODateString(post.createdAt)}</h4>
        <h1 className="has-text-weight-bold has-text-black has-text-centered is-size-4">{post.title}</h1>
      </header>
      <article>
        <p className="content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <style jsx>{`
        .post-header {
          margin-bottom: 1rem;
        }
      `}</style>
    </section>
  </Layout>
)

type EitherPost = Either<Post, { statusCode: number }>

const PostPage: React.FC<{ post: EitherPost }> = ({ post }) =>
  mapEither(post, post => <PostContent post={post} />, ({ statusCode }) => <ErrorPage statusCode={statusCode} />).value

export default withInitialProps(
  async ({ query }) => {
    const slug = query.slug as string
    const post = await fetchPost(slug)
    return {
      post: post ? right(post) : left({ statusCode: 404 }),
    }
  },
)(PostPage)
