import { CommentType } from '@/types/comment'
import React from 'react'
import { formatDate, differenceInHours, differenceInMinutes, differenceInSeconds, differenceInDays } from 'date-fns'
import Image from 'next/image';

type Props = {
    data: CommentType
}

export default function CommentCard({data}: Props) {
  return (
    <div>
        <div className="flex gap-2 items-center">
            <h1 className='sm:text-base text-limit-1 font-semibold'>{ data?.user?.username }</h1>
            <span className="text-xs">
            {
                differenceInHours(new Date(), data.createdAt) && differenceInHours(new Date(), data.createdAt) <= 24 ? `${differenceInHours(new Date(), data.createdAt)} jam` : (
                    differenceInMinutes(new Date(), data.createdAt) && differenceInMinutes(new Date(), data.createdAt) <= 60 ? `${differenceInMinutes(new Date(), data.createdAt)} menit` : (
                        differenceInSeconds(new Date(), data.createdAt) && differenceInSeconds(new Date(), data.createdAt) <= 60 ? ` baru saja` : formatDate(data.createdAt, 'MM-dd')
                    )
                )
            }
            </span>
        </div>
        <pre className="sm:text-base font-['Poppins'] whitespace-pre-wrap">{ data.comment }</pre>
        {
            data.image && (
                <Image src={data.image} alt='Image' width={100} height={100} className='my-0.5 aspect-square object-cover object-center rounded-md' />
            )
        }
    </div>
  )
}