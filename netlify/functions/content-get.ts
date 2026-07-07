import type { Context } from '@netlify/functions'
  import { getStore } from '@netlify/blobs'

  /*
   * GET /api/content-get?key=<key>
   *
   * Returns a content override stored by the admin in Netlify Blobs.
   * Falls back with { found: false } if no override exists.
   * Key format examples:
   *   phase:phase-1        → phase overview override
   *   lesson:kitchen-reset → lesson content override
   *   day:42               → day plan override
   */

  export default async (req: Request, _context: Context) => {
    const url = new URL(req.url)
    const key = url.searchParams.get('key')

    if (!key) {
      return new Response(JSON.stringify({ error: 'key parameter required' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
    }

    try {
      const store = getStore({ name: 'program-content', consistency: 'strong' })
      const blob = await store.get(key, { type: 'json' })
      if (blob == null) {
        return new Response(JSON.stringify({ found: false }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      }
      return new Response(JSON.stringify({ found: true, data: blob }), {
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
  