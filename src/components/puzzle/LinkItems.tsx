import React from 'react'
import { HomeIcon, UserIcon, PlusIcon, MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

type Props = {}

const items = [
    {
        name: 'Beranda',
        url: '/',
        icon: <HomeIcon className='icon-size' />,
        primary: false
    },
    {
        name: 'Search',
        url: '/search',
        icon: <MagnifyingGlassIcon className='icon-size' />,
        primary: false
    },
    {
        name: 'Buat Postingan',
        url: '/post',
        icon: <PlusIcon className='icon-size' />,
        primary: true
    },
    {
        name: 'Notifikasi',
        url: '/notification',
        icon: <BellIcon className='icon-size' />,
        primary: false
    },
    {
        name: 'Akun',
        url: '/account',
        icon: <UserIcon className='icon-size' />,
        primary: false
    }
]

export default function LinkItems({}: Props) {
  return (
    <div>
        {
            items.map((value, index: number) => (
                <Link href={value.url} className={`${index === 0 ? 'text-primary border-primary' : 'icon border-transparent'} flex gap-3 items-center text-base border-l-2 px-4 py-1 mb-6`} key={index}>
                    { value.icon }
                    <h1>{ value.name }</h1>
                </Link>
            ))
        }
    </div>
  )
}