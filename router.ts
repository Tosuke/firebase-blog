import UniversalRouter, { Route, ResolveContext } from 'universal-router/sync'

type Query = {
  [key: string]: string
}

type PathAndQuery = [string, Query]

const routes: Route<ResolveContext, PathAndQuery>[] = [
  {
    path: '/posts/:slug',
    action: (_, { slug }) => ['/post', { slug }],
  },
  {
    path: '(.*)',
    action: ({ path }) => [path, {}],
  },
]

const router = new UniversalRouter(routes)

export default router