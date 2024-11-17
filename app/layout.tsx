import "./globals.css";
import { Merriweather, Open_Sans } from 'next/font/google';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Toaster } from 'react-hot-toast';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
});

export const metadata = {
  title: "Forever Living - Preserve Your Precious Memories",
  description: "A digital space for preserving memories and celebrating lives that inspire us forever.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${openSans.variable} font-sans`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
