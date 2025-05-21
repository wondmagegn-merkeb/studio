
import type { Metadata } from 'next';
import { greatVibes, inter } from '@/lib/fonts';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/contexts/theme-provider';

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${greatVibes.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          defaultTheme="light"
          storageKey="eternal-devotion-theme"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
