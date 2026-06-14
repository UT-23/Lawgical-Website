import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Sora } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/global/navbar'
import { Footer } from '@/components/global/footer'
import { CursorProvider } from '@/components/global/cursor'
import { VideoModalProvider } from '@/components/video/video-modal'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const sora = Sora({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Lawgical Group | Legal Solutions, Reimagined',
  description:
    'Lawgical Group is a Dubai-based law firm specializing in corporate law, arbitration, litigation, and debt collection — delivering tailored legal solutions with integrity.',
  generator: 'v0.app',
  keywords: [
    'Dubai law firm',
    'corporate law',
    'arbitration',
    'litigation',
    'debt collection',
    'legal consulting',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <CursorProvider>
          <VideoModalProvider>
            <Navbar />
            {children}
            <Footer />
          </VideoModalProvider>
        </CursorProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
