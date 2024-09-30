import type { Metadata } from "next";
import "./globals.css";
import styles from './layout.module.css';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scheduling App",
  description: "Scheduling App project for a challenge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.app}>
          {children}
        </div>
      </body>
    </html>
  );
}
