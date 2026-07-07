import type { Context } from '@netlify/functions'
import { getStore } from '@netlify/blobs'

/*
 * GET /api/drive-resources
 *   Returns admin-approved Drive-synced resources.
 *
 * GET /api/drive-resources?admin=1
 *   Returns every synced resource (approved or not). Intended for the
 *   admin console's approval UI.
 *
 * POST /api/drive-resources
 *   Body: { id, approved?, title?, category?, weeks?, phases?, tags?,
 *           whyItMatters?, summary?, featured? }
 *   Updates a single resource record in the canonical index. Used by the
 *   admin UI's "approve", "tag", and "feature" buttons.
 */

type Resource = Record<string, any>

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url)
  const store = getStore('resources')

  if (req.method === 'GET') {
    const all =
      ((await store.get('index.json', { type: 'json' })) as Resource[] | null) ??
      []
    const showAll = url.searchParams.get('admin') === '1'
    const filtered = showAll ? all : all.filter((r) => r.approved)
    return new Response(JSON.stringify({ resources: filtered }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }

  if (req.method === 'POST') {
    let body: any
    try {
      body = await req.json()
    } catch {
      return new Response('Invalid JSON', { status: 400 })
    }
    if (!body?.id || typeof body.id !== 'string') {
      return new Response('Missing id', { status: 400 })
    }
    const all =
      ((await store.get('index.json', { type: 'json' })) as Resource[] | null) ??
      []
    const idx = all.findIndex((r) => r.id === body.id)
    if (idx === -1) {
      return new Response('Not found', { status: 404 })
    }
    // Only update admin-editable fields.
    const editable = [
      'approved',
      'title',
      'category',
      'weeks',
      'phases',
      'tags',
      'whyItMatters',
      'summary',
      'featured',
      'estMinutes',
      'beginnerFriendly',
      'caregiverFriendly',
      'printable',
    ]
    for (const k of editable) {
      if (k in body) all[idx][k] = body[k]
    }
    await store.setJSON('index.json', all)
    return new Response(JSON.stringify({ ok: true, resource: all[idx] }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config = {
  path: '/api/drive-resources',
}
