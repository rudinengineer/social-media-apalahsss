import React from 'react'

type Props = {}

export default function CreatePostSkeleton({}: Props) {
  return (
    <div className="w-full p-4 mb-4 bg-light dark:bg-dark rounded-lg">
      <div className='skeleton w-44 h-6 rounded-sm'></div>
      <div className="mt-1.5 w-full flex gap-2 items-center">
        <div className='skeleton w-10 h-10 rounded-full'></div>
        <div className="skeleton w-full h-8 rounded-sm"></div>
        <div className="skeleton w-10 h-10 rounded-lg"></div>
      </div>
    </div>
  )
}