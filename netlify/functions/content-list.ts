import type { Context } from '@netlify/functions'
  import { getStore } from '@netlify/blobs'

  /*
   * GET /api/content-list
   *
   * Returns a list of all content override keys stored in Netlify Blobs.
   * Admin-only: requires ?adminEmail and ?adminPassword query params.
   */

  const ADMIN_CREDENTIALS: Record<string, string> = {
    'mthomas@slcsleep.com': 'DrThomas2024',
    'iesleep12@gmail.com':  'DrThomas2024',
  }

  export default async (req: Request, _context: Context) => {
    const url = new URL(req.url)
    const email = (url.searchParams.get('adminEmail') ?? '').toLowerCase()
    const password = url.searchParams.get('adminPassword') ?? ''
    const expected = ADMIN_CREDENTIALS[email]

    if (!expected || password !== expected) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      })
    }

    try {
      const store = getStore({ name: 'program-content', consistency: 'strong' })
      const result = await store.list()
      return new Response(JSON.stringify({ keys: result.blobs.map(b => b.key) }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err?.message ?? 'store error' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
    }
  }
  