"use client"
import React from 'react'
//import { Poppins } from "next/font/google";
import { useStore } from '@/lib/store';

type Props = {
    children: React.ReactNode
}

//const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ["latin"] });

export default function Html({children}: Props) {
  const { theme } = useStore()

  return (
    <html lang="en" className={theme}>
      <body>{children}</body>
    </html>
  )
}
