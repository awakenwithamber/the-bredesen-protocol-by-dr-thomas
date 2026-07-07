/*
 * Minimal Google API client — no SDK dependency.
 * ----------------------------------------------
 * Uses a Google service account credential (JSON key) to obtain an OAuth
 * access token via the JWT Bearer grant, then calls Drive and Sheets REST
 * APIs directly with fetch.
 *
 * Environment variables consumed:
 *   GOOGLE_SERVICE_ACCOUNT_JSON  — full JSON key as a string
 *   GOOGLE_DRIVE_FOLDER_ID       — target Drive folder (shared with the
 *                                   service account email)
 *
 * Because a personal @gmail.com account (iesleep12@gmail.com) cannot grant
 * domain-wide delegation, the flow is:
 *   1. In the Google Cloud console create a project + enable Drive API and
 *      Sheets API.
 *   2. Create a service account; download its JSON key.
 *   3. In Drive (while signed in as iesleep12@gmail.com) create a folder
 *      "Bredesen Protocol — Weekly Reports" and share it with the service
 *      account's email (…@…iam.gserviceaccount.com) as Editor.
 *   4. Paste the JSON key into Netlify site env as GOOGLE_SERVICE_ACCOUNT_JSON
 *      and the folder id as GOOGLE_DRIVE_FOLDER_ID.
 *
 * With that, files the service account creates live inside the clinic's
 * Drive folder and are visible when iesleep12@gmail.com opens Drive.
 */

import { createSign } from 'node:crypto'

type ServiceAccountKey = {
  client_email: string
  private_key: string
  token_uri?: string
}

function base64UrlEncode(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input) : input
  return buf
    .toString('base64')
    .replace(/=+$/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export function loadServiceAccount(): ServiceAccountKey | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as ServiceAccountKey
    if (!parsed.client_email || !parsed.private_key) return null
    return parsed
  } catch {
    return null
  }
}

export async function getAccessToken(
  key: ServiceAccountKey,
  scopes: string[],
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const claim = {
    iss: key.client_email,
    scope: scopes.join(' '),
    aud: key.token_uri ?? 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }

  const toSign = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(
    JSON.stringify(claim),
  )}`

  const signer = createSign('RSA-SHA256')
  signer.update(toSign)
  signer.end()
  const signature = base64UrlEncode(signer.sign(key.private_key))

  const assertion = `${toSign}.${signature}`

  const tokenRes = await fetch(
    key.token_uri ?? 'https://oauth2.googleapis.com/token',
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      }).toString(),
    },
  )
  if (!tokenRes.ok) {
    const detail = await tokenRes.text()
    throw new Error(`Google token exchange failed: ${tokenRes.status} ${detail}`)
  }
  const tokenJson = (await tokenRes.json()) as { access_token?: string }
  if (!tokenJson.access_token) throw new Error('No access_token in response')
  return tokenJson.access_token
}

export async function uploadToDrive(opts: {
  accessToken: string
  folderId: string
  name: string
  mimeType: string
  body: string | Buffer
}): Promise<{ id: string; webViewLink?: string }> {
  const metadata = {
    name: opts.name,
    parents: [opts.folderId],
    mimeType: opts.mimeType,
  }

  const boundary = '-------bredesen-protocol-' + Math.random().toString(36).slice(2)
  const delimiter = `--${boundary}\r\n`
  const closeDelim = `--${boundary}--`

  const bodyBuf = Buffer.isBuffer(opts.body)
    ? opts.body
    : Buffer.from(opts.body, 'utf8')

  const multipartBody = Buffer.concat([
    Buffer.from(
      `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(
        metadata,
      )}\r\n${delimiter}Content-Type: ${opts.mimeType}\r\n\r\n`,
      'utf8',
    ),
    bodyBuf,
    Buffer.from(`\r\n${closeDelim}`, 'utf8'),
  ])

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink,parents',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${opts.accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
        'Content-Length': String(multipartBody.length),
      },
      body: multipartBody,
    },
  )
  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Drive upload failed: ${res.status} ${detail}`)
  }
  return (await res.json()) as { id: string; webViewLink?: string }
}

export type DriveFile = {
  id: string
  name: string
  mimeType: string
  webViewLink?: string
  modifiedTime?: string
  size?: string
  parents?: string[]
}

/**
 * List files inside a Drive folder (non-recursive by default). Paginates
 * through Drive's `files.list` until exhausted. Returns only files the
 * service account can see — which is limited to the shared folder.
 */
export async function listDriveFolder(opts: {
  accessToken: string
  folderId: string
  pageSize?: number
  recursive?: boolean
}): Promise<DriveFile[]> {
  const results: DriveFile[] = []
  const queue: string[] = [opts.folderId]
  const visited = new Set<string>()

  while (queue.length > 0) {
    const folderId = queue.shift() as string
    if (visited.has(folderId)) continue
    visited.add(folderId)

    let pageToken: string | undefined
    do {
      const url = new URL('https://www.googleapis.com/drive/v3/files')
      url.searchParams.set(
        'q',
        `'${folderId}' in parents and trashed = false`,
      )
      url.searchParams.set(
        'fields',
        'nextPageToken, files(id,name,mimeType,webViewLink,modifiedTime,size,parents)',
      )
      url.searchParams.set('pageSize', String(opts.pageSize ?? 200))
      if (pageToken) url.searchParams.set('pageToken', pageToken)

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${opts.accessToken}` },
      })
      if (!res.ok) {
        const detail = await res.text()
        throw new Error(`Drive list failed: ${res.status} ${detail}`)
      }
      const json = (await res.json()) as {
        files?: DriveFile[]
        nextPageToken?: string
      }
      for (const f of json.files ?? []) {
        if (f.mimeType === 'application/vnd.google-apps.folder') {
          if (opts.recursive) queue.push(f.id)
          continue
        }
        results.push(f)
      }
      pageToken = json.nextPageToken
    } while (pageToken)
  }

  return results
}


/** Create a Google Sheet pre-filled with rows. Returns spreadsheetId + URL. */
export async function createSheetFromRows(opts: {
  accessToken: string
  folderId: string
  title: string
  rows: (string | number)[][]
}): Promise<{ spreadsheetId: string; url: string }> {
  // Step 1 — create a sheet by uploading a blank sheet to the target folder.
  // Drive's multipart upload lets us set mimeType to google.apps.spreadsheet
  // which Drive transparently converts into a real Sheet.
  const meta = {
    name: opts.title,
    parents: [opts.folderId],
    mimeType: 'application/vnd.google-apps.spreadsheet',
  }
  const create = await fetch(
    'https://www.googleapis.com/drive/v3/files?fields=id',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${opts.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meta),
    },
  )
  if (!create.ok) {
    const detail = await create.text()
    throw new Error(`Sheet create failed: ${create.status} ${detail}`)
  }
  const { id } = (await create.json()) as { id: string }

  // Step 2 — write rows starting at A1 via values.update.
  const range = 'Sheet1!A1'
  const update = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${encodeURIComponent(
      range,
    )}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${opts.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: opts.rows }),
    },
  )
  if (!update.ok) {
    const detail = await update.text()
    throw new Error(`Sheet write failed: ${update.status} ${detail}`)
  }

  return {
    spreadsheetId: id,
    url: `https://docs.google.com/spreadsheets/d/${id}/edit`,
  }
}
