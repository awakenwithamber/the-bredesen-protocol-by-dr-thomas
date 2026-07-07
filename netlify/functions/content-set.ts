import type { Context } from '@netlify/functions'
  import { getStore } from '@netlify/blobs'

  /*
   * POST /api/content-set
   * Body: { key, data, adminEmail, adminPassword }
   *
   * Saves a content override to Netlify Blobs.
   * Requires valid admin credentials in the request body.
   * Keys follow the same format as content-get.ts.
   */

  const ADMIN_CREDENTIALS: Record<string, string> = {
    'mthomas@slcsleep.com': 'DrThomas2024',
    'iesleep12@gmail.com':  'DrThomas2024',
  }

  export default async (req: Request, _context: Context) => {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    let body: { key?: string; data?: unknown; adminEmail?: string; adminPassword?: string }
    try {
      body = await req.json()
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
    }

    // Validate admin credentials
    const email = (body.adminEmail ?? '').trim().toLowerCase()
    const expectedPassword = ADMIN_CREDENTIALS[email]
    if (!expectedPassword || body.adminPassword !== expectedPassword) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      })
    }

    if (!body.key || body.data === undefined) {
      return new Response(JSON.stringify({ error: 'key and data are required' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
    }

    try {
      const store = getStore({ name: 'program-content', consistency: 'strong' })
      await store.setJSON(body.key, {
        ...body.data as object,
        _updatedAt: new Date().toISOString(),
        _updatedBy: email,
      })
      return new Response(JSON.stringify({ ok: true, key: body.key }), {
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
  