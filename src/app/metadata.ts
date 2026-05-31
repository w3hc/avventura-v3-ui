import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://w3pk.w3hc.org'),

  title: 'Avventura',
  description: 'The one and only Web3 text-based RPG!',

  keywords: ['Avventura', 'w3pk', 'WebAuthn', 'Next.js', 'Web3', 'Ethereum'],
  authors: [{ name: 'W3HC', url: 'https://github.com/w3hc' }],

  openGraph: {
    title: 'Avventura',
    description: 'The one and only Web3 text-based RPG!',
    siteName: 'Avventura',
    images: [
      {
        url: '/huangshan.png',
        width: 1200,
        height: 630,
        alt: 'The one and only Web3 text-based RPG!',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Avventura',
    description: 'Next.js Web3 starter with passkey auth',
    images: ['/huangshan.png'],
    creator: '@julienbrg',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'your-google-site-verification',
  },
}
