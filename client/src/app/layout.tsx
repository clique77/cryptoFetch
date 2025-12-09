import '@/app/globals.scss'
import type { Metadata } from 'next'
import { Providers } from '@/provider/Providers'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { AuthInitializer } from '@/components/auth/AuthInitializer'

export const metadata: Metadata = {
  title: 'CryptoFetch',
  description: 'CryptoFetch - Your crypto portfolio tracker',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthInitializer />
          <ThemeToggle />
          {children}
        </Providers>
      </body>
    </html>
  )
}