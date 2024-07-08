import React from 'react'

type Props = {}

export default function NavbarRightSkeleton({}: Props) {
  return (
    <div className="flex gap-4 items-center">
        <div className='skeleton hidden sm:flex w-32 h-10 rounded-md'></div>
        <div className='skeleton hidden sm:flex w-32 h-10 rounded-md'></div>
    </div>
  )
}