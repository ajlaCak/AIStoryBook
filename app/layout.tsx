import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import {Mulish} from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";

const myAppFont=Mulish({subsets:['latin']});

export const metadata: Metadata = {
  title: "StoryBook AI",
  description: "Create, Imagine, Inspire – AI-Powered Storybooks!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={myAppFont.className}>
        <Provider>{children}</Provider>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
