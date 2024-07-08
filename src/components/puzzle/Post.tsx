"use client"
import Link from 'next/link'
import React from 'react'
import UserProfile from './UserProfile'
import Image from 'next/image'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { PostType } from '@/types/post'
import { formatDate, differenceInHours, differenceInMinutes, differenceInSeconds, differenceInDays } from 'date-fns'
import ReactAction from '../post/ReactAction'
import { Axios } from '@/lib/axios'
import { useStore } from '@/lib/store'
import OptionPopup from '@/components/post/OptionPopup'

type Props = {
    data: PostType,
    setShowComment: React.Dispatch<React.SetStateAction<number | null>>
}

export default function Post({data, setShowComment}: Props) {
  const { setBottombar } = useStore()
  const date = formatDate(data.createdAt, 'MM dd yyyy')
  const day = differenceInDays(new Date(), data.createdAt)
  const hour = differenceInHours(new Date(), data.createdAt)
  const minutes = differenceInMinutes(new Date(), data.createdAt)
  const seconds = differenceInSeconds(new Date(), data.createdAt)
  const [isReact, setReact] = React.useState<string|null>(data.react)
  const [reactsCount, setReactsCount] = React.useState<number>(data.likes.length)
  const [commentsCount] = React.useState<number>(data._count.comments)

  const handleReact = async (postId: number, react: string) => {
    if ( !isReact ) {
        setReactsCount(state => state + 1)
    }
    if ( isReact === react ) {
        setReact(null)
        setReactsCount(state => state - 1)
    } else {
        setReact(react)
    }
    try {
        await Axios.post('/post/react', {
            id: postId,
            type: react
        })
    } catch(e: any) {
        setReact(null)
        if ( isReact !== react ) {
            setReactsCount(state => state - 1)
        }
    }
  }

  return (
    <div className="w-full bg-light dark:bg-dark rounded-xl p-3 ss:p-4">
        <div className='flex-between-center'>
            <div className="w-full flex gap-1.5 items-center">
                <Link href={`/user/${data.author?.username}`} className='w-10 sm:w-12 h-10 sm:h-12'><UserProfile image={data.author?.image} /></Link>
                <div>
                    <Link href={`/user/${data.author?.username}`} className='sm:text-base text-limit-1 font-semibold'>{ data.author?.username }</Link>
                    <h1 className='text-xs'>
                        {
                            day && day <= 7 ? `${day} hari yang lalu` : (
                                hour && hour <= 24 ? `${hour} jam yang lalu` : (
                                    minutes && minutes <= 60 ? `${minutes} menit yang lalu` : (
                                        seconds && seconds <= 60 ? `${seconds} detik yang lalu` : date
                                    )
                                )
                            )
                        }
                    </h1>
                </div>
            </div>
            <OptionPopup post={data} />
        </div>
        <div className="mt-2">
            <p className='text-limit-3 sm:text-base'>{ data.caption }</p>
        </div>
        <div className="mt-3">
            <Image src={data.image} alt={`Postingan ${data.author?.username}`} width={100} height={100} className='w-full aspect-square object-cover object-center rounded-md' />
        </div>
        <div className="mt-1 px-2 w-full flex-between-center">
            <div className="flex justify-between sm:justify-start sm:gap-8 items-center">
                <ReactAction likes={reactsCount} postId={data.id} handleReact={handleReact} isReact={isReact} />
                <div>
                    <h1 className='text-xs sm:text-sm'>{ commentsCount } komentar</h1>
                    <button className='icon mt-1 flex gap-1 items-center' onClick={() => {setBottombar(false);setShowComment(data.id)}}>
                        <ChatBubbleOvalLeftEllipsisIcon title='komentar' className='icon-size' />
                        <h1 className='sm:text-base'>komentari</h1>
                    </button>
                </div>
                <div>
                    <h1 className='text-xs sm:text-sm'>0 dibagikan</h1>
                    <button className="icon mt-1 flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon-size">
                            <title>bagikan</title>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7z" />
                        </svg>
                        <h1 className="sm:text-base">bagikan</h1>
                    </button>
                </div>
            </div>
            {/* <button className='hidden sm:flex'>
                <BookmarkIcon className='icon-size icon' title='simpan' />
            </button> */}
        </div>
    </div>
  )
}