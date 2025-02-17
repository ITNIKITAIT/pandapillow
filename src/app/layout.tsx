import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/components/Providers';
import { constructMetadata } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased relative`}>
                <Providers>
                    <Navbar />
                    <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
                        <div className="flex flex-1 flex-col h-full">
                            {children}
                        </div>

                        <Footer />
                    </main>

                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
