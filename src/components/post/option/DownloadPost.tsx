import { PostType } from '@/types/post'
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import React from 'react'

type Props = {
    post: PostType
}

export default function DownloadPost({}: Props) {
  const handleButton = () => {}

  return (
    <button className="mb-3 flex gap-4 items-center icon" onClick={handleButton}>
        <ArrowDownTrayIcon className='icon-size' />
        <h1 className='sm:text-base font-medium'>Download</h1>
    </button>
  )
}