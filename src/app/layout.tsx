import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { SpotlightCursor } from '@/components/shared/SpotlightCursor';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { ChatWidget } from '@/components/shared/ChatWidget';
import { RecruiterMode } from '@/components/shared/RecruiterMode';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { KonamiCode } from '@/components/easter-eggs/KonamiCode';
import { TerminalMode } from '@/components/easter-eggs/TerminalMode';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GlobalParallaxBackground } from '@/components/layout/GlobalParallaxBackground';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://anand.dev'),
  title: {
    default: 'Anand Anathur Elangovan — AI Engineer & System Architect',
    template: '%s | Anand Anathur Elangovan',
  },
  description:
    'System Architect Engineer and AI Engineer building enterprise AI, agentic systems, and cloud applications. Led 9+ AI products at Verizon. Available for roles in Australia.',
  keywords: [
    'AI Engineer', 'System Architect', 'Full Stack Developer',
    'Google Gemini', 'Vertex AI', 'LangChain', 'RAG',
    'Agentic AI', 'Enterprise AI', 'Cloud Run', 'BigQuery',
    'Next.js', 'React', 'Python', 'Sydney Australia', 'Melbourne',
    'Verizon', 'VZGPT', 'Machine Learning', 'AI Architect',
  ],
  authors: [{ name: 'Anand Anathur Elangovan', url: 'https://anand.dev' }],
  creator: 'Anand Anathur Elangovan',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://anand.dev',
    title: 'Anand Anathur Elangovan — AI Engineer & System Architect',
    description:
      'Building enterprise AI, agentic systems, and cloud applications. Led 9+ AI products at Verizon serving 5,000+ daily users.',
    siteName: 'Anand Anathur Elangovan',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Anand Anathur Elangovan — AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anand Anathur Elangovan — AI Engineer & System Architect',
    description: 'Building enterprise AI, agentic systems, and cloud applications.',
    images: ['/og-image.png'],
    creator: '@anand_anathur',
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
  alternates: {
    canonical: 'https://anand.dev',
  },
};

export const viewport: Viewport = {
  themeColor: '#08080E',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-foreground`}
        style={{ background: 'transparent' }}
      >
        {/* Global fixed parallax background — sits behind entire app */}
        <GlobalParallaxBackground />

        <TooltipProvider>
          <SmoothScrollProvider>
            {/* Global overlays */}
            <LoadingScreen />
            <SpotlightCursor />
            <ScrollProgress />
            <RecruiterMode />
            <ChatWidget />
            <KonamiCode />
            <TerminalMode />

            {/* App shell */}
            <Navbar />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </TooltipProvider>

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Anand Anathur Elangovan',
              jobTitle: 'System Architect Engineer / AI Engineer',
              url: 'https://anand.dev',
              sameAs: [
                'https://linkedin.com/in/anand-anathur',
                'https://github.com/anand-anathur',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Verizon',
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'AU',
                addressRegion: 'NSW',
                addressLocality: 'Sydney',
              },
              knowsAbout: [
                'Artificial Intelligence', 'Machine Learning', 'Google Gemini',
                'Vertex AI', 'RAG', 'Agentic AI', 'Cloud Architecture',
                'Next.js', 'React', 'Python', 'Enterprise Software',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
