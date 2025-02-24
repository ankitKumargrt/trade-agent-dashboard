import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Header } from "../components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Conversation Dashboard",
  description: "Manage and play your conversations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}



import './globals.css'