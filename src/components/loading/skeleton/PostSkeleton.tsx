import React from 'react'

type Props = {}

export default function PostSkeleton({}: Props) {
  return (
    <div className="w-full bg-light dark:bg-dark rounded-xl p-3 ss:p-4">
        <div className="flex-between">
            <div className="w-full flex gap-1.5 items-center">
                <div className='skeleton w-12 h-12 rounded-full'></div>
                <div>
                    <div className='skeleton w-28 h-4 rounded-sm'></div>
                    <div className='skeleton mt-1 w-32 h-4 rounded-sm'></div>
                </div>
            </div>
            <div className="skeleton w-1.5 h-8 rounded-sm"></div>
        </div>
        <div className="mt-2">
            <div className="skeleton w-full h-4 rounded-sm"></div>
            <div className="mt-1 skeleton w-full h-4 rounded-sm"></div>
        </div>
        <div className="mt-3">
            <div className='skeleton w-full aspect-square rounded-md'></div>
        </div>
        <div className="mt-1 w-full flex-between">
            <div className="mt-4 flex gap-8 items-center">
                <div>
                    <div className="skeleton w-8 h-4 rounded-sm"></div>
                    <div className="mt-1 skeleton w-16 h-4 rounded-sm"></div>
                </div>
                <div>
                    <div className="skeleton w-8 h-4 rounded-sm"></div>
                    <div className="mt-1 skeleton w-16 h-4 rounded-sm"></div>
                </div>
            </div>
            <div className='mt-1 skeleton w-10 h-10 rounded-sm'></div>
        </div>
    </div>
  )
}