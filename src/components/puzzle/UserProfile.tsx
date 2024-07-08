import { UserCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'

type Props = {
    image: string | null | undefined
}

export default function UserProfile({image}: Props) {
  return (
    <div className="w-full h-full">
        {
            image ? (
                <Image src={image} alt='' width={100} height={100} className='rounded-full' />
            ) : (
                <UserCircleIcon />
            )
        }
    </div>
  )
}