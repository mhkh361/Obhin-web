import type { Metadata } from 'next';
import './globals.css';
import { SideToggleRail } from '@/components/layout/SideToggleRail';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'OBHIN (অভিন) — The Power of a New Era',
  description:
    '100% Independent, Free & Open-Source AI Productivity System and Autonomous Execution Engine. Multi-Provider BYOK Matrix, Real-Time Self-Correction Skills, and Prismatic Glass Aesthetics.',
  keywords: [
    'OBHIN',
    'অভিন',
    'The Power of a New Era',
    'Open Source AI',
    'BYOK',
    'NVIDIA NIM',
    'Google Gemini',
    'Groq',
    'Ollama',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-black text-white min-h-screen flex flex-col antialiased selection:bg-white/20 selection:text-white">
        {/* Left Side-Toggle Dock / Navigation Rail */}
        <SideToggleRail />

        {/* Main Content Area with left offset for desktop navigation dock */}
        <div className="flex-1 flex flex-col md:pl-16 transition-all duration-300">
          <main className="flex-1 pt-14 md:pt-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
