import React from 'react'
import Link from 'next/link'
import { HomeIcon, UserIcon, PlusIcon, MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/solid'

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

export default function Bottombar({}: Props) {
  return (
    <div className='w-full bg-light dark:bg-dark fixed bottom-0 left-0 flex-between-center z-[50] ss:hidden'>
        {
            items.map((value, index: number) => (
                <Link href={value.url} key={index} className={`${index === 0 ? 'border-primary text-primary' : 'border-transparent icon'} p-2 border-b-2`} title={value.name}>
                    <div className={`${value.primary && 'bg-primary text-light rounded-full'} p-2`}>{ value.icon }</div>
                </Link>
            ))
        }
    </div>
  )
}