import UniversalRouter, { Route, ResolveContext } from 'universal-router'
import { Server } from 'next'
import { Response } from './type'
import { renderNext } from './renderers/renderNext'
import { renderRootEntries } from './renderers/renderRootEntries'
import { renderPost } from './renderers/renderPost'


function res(input: { status?: number, contentType: string, content: Buffer }): Response {
  return {
    status: 200,
    ...input
  }
}

process.env.server = 'true'

export function createRouter(nextServer: Server): UniversalRouter<ResolveContext, Response> {
  const routes: Route<ResolveContext, Response>[] = [
    {
      path: '/posts/:slug.json',
      action: (_, { slug }) => renderPost(slug)
    },
    {
      path: '/posts/:slug',
      action: (_, { slug }) => renderNext(nextServer, '/post', { slug })
    },
    {
      path: '/posts.json',
      action: () => renderRootEntries()
    },
    {
      path: '(.*)',
      action: ({ path }) => renderNext(nextServer, path, {})
    }
  ]

  return new UniversalRouter(routes)
}

