"use client"
import { BellIcon, MagnifyingGlassIcon, UserCircleIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import NavbarRightSkeleton from '@/components/loading/skeleton/NavbarRightSkeleton'

type Props = {}

export default function NavbarRight({}: Props) {
  const { data: session, status } = useSession()

  return (
    <div className='ss:w-[30%] flex gap-8 justify-end items-center'>
      {
        status === 'loading' ? (<NavbarRightSkeleton />) : (
          <div>
            {
              status === 'authenticated' && session?.user ? (
                <div className="flex gap-8 justify-end items-center">
                  <Link href={'/post'} className='button px-4 py-2.5 rounded-md hidden md:flex gap-1.5 items-center'>
                    <PlusIcon className='size-6' />
                    <span>Buat Postingan</span>
                  </Link>
                  <button className='hidden ss:flex'>
                    <BellIcon className='icon icon-size' />
                  </button>
                  <button className='hidden ss:flex'>
                    <UserCircleIcon className='icon icon-size' />
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 items-center">
                  <Link href={'/signin'} className='hidden sm:flex'>
                    <button className='px-6 py-2.5 rounded-md border-[1px] border-slate-300 dark:border-light font-bold'>Masuk</button>
                  </Link>
                  <Link href={'/signup'} className='hidden ss:flex'>
                    <button className='button px-6 py-2.5 border-[1px] border-primary rounded-md'>Daftar</button>
                  </Link>
                </div>
              )
            }
          </div>
        )
      }
      <Link href={'/search'} className='ss:hidden'>
          <MagnifyingGlassIcon className='icon icon-size' />
      </Link>
    </div>
  )
}