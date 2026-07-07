import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'The Bredesen Protocol — A Gentle Guided Brain Health Journey' },
      {
        name: 'description',
        content:
          'A calm, warm companion for your Bredesen-style brain health journey. Designed for older adults, caregivers, and families — one gentle step at a time.',
      },
      { name: 'theme-color', content: '#8daa91' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Atkinson+Hyperlegible:wght@400;700&family=Nunito+Sans:wght@400;600;700&display=swap',
      },
    ],
  }),
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
