import Bottombar from '@/components/puzzle/Bottombar'
import LinkItems from '@/components/puzzle/LinkItems'
import Navbar from '@/components/puzzle/Navbar'
import React from 'react'
import Link from 'next/link'
import { useStore } from '@/lib/store'

type Props = {
    children: React.ReactNode
}

export default function Layout({children}: Props) {
  const { bottombar } = useStore()

  return (
    <>
        <header>
          <Navbar />
        </header>
        <main className='w-full h-screen pt-16 bg-secondary dark:bg-[#1b2836] grid ss:grid-cols-[1fr__2fr] sm:grid-cols-[1fr__2fr__1.5fr]'>
          <div className='w-full h-full p-4 pr-0 hidden ss:block'>
            <div className='w-full h-full bg-light dark:bg-dark rounded-lg py-4'>
              <LinkItems />
            </div>
          </div>
          <div className='w-full h-full ss:pt-4 overflow-hidden sticky'>
            <div className='hidden-scrollbar w-full h-full overflow-y-auto'>{ children }</div>
          </div>
          <div className='w-full h-full p-4 pl-0 hidden sm:block'>
            <div className='w-full h-full bg-light dark:bg-dark rounded-lg p-4'>
              <h1 className='text-2xl font-bold mb-2'>Kategori Terpopuler 🔥</h1>
              <div className='mt-1'>
                <Link href='/' className='text-limit-1 link text-base'><span className='text-sky-500'>#</span> Spongebob Squarepants</Link>
              </div>
              <div className='mt-1'>
                <Link href='/' className='text-limit-1 link text-base'><span className='text-sky-500'>#</span> Spongebob Squarepants</Link>
              </div>
            </div>
          </div>
        </main>
        <footer>
          {
            bottombar && (<Bottombar />)
          }
        </footer>
    </>
  )
}