"use client"
import React from 'react'
import UserProfile from '../puzzle/UserProfile'
import Link from 'next/link'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'

type Props = {}

export default function CreatePost({}: Props) {
  const router = useRouter()
  const { setImagePrevPost } = useStore()

  return (
    <div className="w-full p-4 mb-4 bg-light dark:bg-dark rounded-lg">
      <h1 className='text-xl font-semibold'>Apa yang kamu pikirkan?</h1>
      <div className="mt-2 w-full flex gap-2 items-center">
        <Link href={'/user/erick'} className='w-12'><UserProfile image={null} /></Link>
        <button type="button" className='w-full flex input-default px-4 py-2.5 rounded-md' onFocus={() => {router.push('/post')}} >Apa yang kamu pikirkan?</button>
        <label htmlFor="image" title='upload' className='cursor-pointer'><PhotoIcon className='w-8 sm:w-10 h-8 sm:h-10 icon' /></label>
        <input type="file" name='image' id="image" accept='image/*' hidden onChange={(e: any) => {setImagePrevPost(e.target.files[0]);router.push('/post')}} />
      </div>
    </div>
  )
}
