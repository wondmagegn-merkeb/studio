
import type { Metadata } from 'next';
// Removed: import { Geist_Sans } from 'next/font/google';
import { greatVibes, inter } from '@/lib/fonts';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
// Removed: import { GenkitProvider } from '@genkit-ai/next/client';


// Removed: const geistSans = Geist_Sans({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Eternal Devotion',
  description: 'A special place for my love 💖',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${greatVibes.variable} ${inter.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
