import { CommentType } from '@/types/comment';
import React from 'react'
import UserProfile from '@/components/puzzle/UserProfile'
import CommentCard from './CommentCard';
import { Axios } from '@/lib/axios';

type Props = {
    data: CommentType,
    setReplyId: React.Dispatch<React.SetStateAction<number | null>>,
    setPlaceholder: React.Dispatch<React.SetStateAction<string>>,
    commentInput: any
}

export default function Comment({data, setReplyId, setPlaceholder, commentInput}: Props) {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [reply, setReply] = React.useState<Array<any> | null>(null)

  const showReply = async (id: number) => {
    setLoading(true)
    try {
        const response = await Axios.get('/post/comment/reply?id=' + id)
        const data = await response.data
        if ( data?.data ) {
            setReply(data?.data)
        }
    } finally {
        setLoading(false)
    }
  }

  return (
    <div>
        <div className='flex gap-2'>
            <div className="w-6 sm:w-8 h-6 sm:h-8"><UserProfile image={data?.user?.image} /></div>
            <div>
                <CommentCard data={data} />
                <div className='flex gap-2'>
                    <button type='button' className='text-xs sm:text-sm' onClick={() => {commentInput?.current?.focus();setReplyId(data?.user.id);setPlaceholder(`Balas ${data?.user.username}`)}}>Balas</button>
                    {
                        data._count.reply > 0 && (
                            <button type='button' className='text-xs sm:text-sm' onClick={() => {showReply(data.id)}}>{data._count.reply} balasan</button>
                        )
                    }
                </div>
            </div>
        </div>
        <div className='ml-8'>
            {
                loading ? (<h1 className='ml-2 text-xs'>Memuat...</h1>) : (
                    <div>
                        {
                            reply?.map((value, index: number) => (
                                <div className='mt-2 flex gap-2' key={index}>
                                    <div className="w-6 sm:w-8 h-6 sm:h-8"><UserProfile image={value?.user?.image} /></div>
                                    <div>
                                        <CommentCard data={value} />
                                        <div className='flex gap-2 items-center'>
                                            <button type='button' className='text-xs sm:text-sm' onClick={() => {commentInput?.current?.focus();setReplyId(value?.commentId);setPlaceholder(`Balas ${value?.user.username}`)}}>Balas</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    </div>
  )
}