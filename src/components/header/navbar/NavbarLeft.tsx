import { app_name } from '@/constants/config'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function NavbarLeft({}: Props) {
  return (
    <div className="ss:w-[20%]">
      <Link href={'/'} className='text-2xl font-bold text-primary dark:text-light'>{ app_name }</Link>
    </div>
  )
}