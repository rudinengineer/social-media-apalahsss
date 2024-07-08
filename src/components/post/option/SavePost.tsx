import { BookmarkIcon } from '@heroicons/react/24/solid'
import React from 'react'

type Props = {
    id: number
}

export default function SavePost({}: Props) {
  const handleButton = () => {}

  return (
    <button className="mb-3 flex gap-4 items-center icon" onClick={handleButton}>
        <BookmarkIcon className='icon-size' />
        <h1 className='sm:text-base font-medium'>Simpan</h1>
    </button>
  )
}