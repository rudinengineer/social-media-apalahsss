"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function ReactQueryProvider({children}: Props) {
  const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
  )
}