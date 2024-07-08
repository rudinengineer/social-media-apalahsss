import React from 'react'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Axios, axiosData } from '@/lib/axios'
import { useStore } from '@/lib/store'
import Image from 'next/image'
import Spinner from '../loading/Spinner'
import { ToastErr } from '@/lib/alert'
import { CommentType } from '@/types/comment'
import Comment from './comment/Comment'

type Props = {
    postId: number | null,
    setShowComment: React.Dispatch<React.SetStateAction<number | null>>
}

export default function CommentsPopup({postId, setShowComment}: Props) {
  const ref: any = React.useRef()
  const commentInput: any = React.useRef()
  const { setBottombar } = useStore()
  const [comments, setComments] = React.useState<Array<CommentType>>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [loadingBtn, setLoadingBtn] = React.useState<boolean>(false)
  const [imgPrev, setImgPrev] = React.useState<Blob|null>(null)
  const [placeholder, setPlaceholder] = React.useState<string>('Tulis komentar')
  const [replyId, setReplyId] = React.useState<number|null>(null)

  React.useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!ref.current?.contains(event.target)) {
        setShowComment(null)
    setReplyId(null)
    setPlaceholder('Tulis komentar')
      }
    }

    window.addEventListener("mousedown", handleOutSideClick)

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick)
    }
  }, [ref])

  React.useEffect(() => {
    async function fetch() {
        try {
            const response = await Axios.get('/post/comment?id=' + postId)
            const data = await response.data
            if ( data?.data ) {
                setComments(data?.data)
            }
        } finally {
            setLoading(false)
        }
    }
    fetch()
    setReplyId(null)
  }, [postId])

  const handleImageComment = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgPrev(e.target.files[0]);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoadingBtn(true)

    const formData = new FormData(e.target)
    formData.set('postId', String(postId))

    if ( replyId ) {
        formData.set('replyId', String(replyId))
    }
    
    try {
        const response = await axiosData.post('/post/comment', formData)
        const data = await response.data
        if ( data?.success ) {
            setComments(state => [data?.data, ...state])
        } else {
            ToastErr('Gagal mengirim komentar')
        }
    } catch {
        ToastErr('Gagal mengirim komentar')
    } finally {
        setLoadingBtn(false)
    }
  }

  return (
    <div className="w-full h-full sm:p-4 sm:pb-0 absolute top-0 left-0 z-[45] overflow-hidden">
        <div className="w-full h-full sticky">
            <div className="w-full h-[90%] border-t-[1px] border-slate-300 absolute bottom-0 left-0 rounded-tl-2xl rounded-tr-2xl bg-light dark:bg-dark" ref={ref}>
                <div className="w-full h-full sm:h-[87%] sticky p-4">
                    <div className="w-full mb-4 flex-center">
                        <h1 className='font-semibold sm:text-base'>{loading ? 0 : comments?.length} Komentar</h1>
                    </div>
                    {
                        loading ? (
                            <div className="flex-center">
                                <h1>Memuat komentar...</h1>
                            </div>
                        ) : (
                            <div className='hidden-scrollbar w-full h-full pb-8 overflow-y-auto'>
                                {
                                    comments?.length ? (
                                        <div className="w-full">
                                            {
                                                comments?.map((value, index: number) => (
                                                    <div className="mb-4" key={index}>
                                                        <Comment data={value} setReplyId={setReplyId} setPlaceholder={setPlaceholder} commentInput={commentInput} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <div className='flex-center'>
                                            <h1>Belum ada yang berkomentar</h1>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <button className='absolute right-3 top-3' onClick={() => {setBottombar(true);setShowComment(null)}}><XMarkIcon className='icon-size icon' /></button>
                </div>
                <form onSubmit={handleSubmit} className="w-full bg-light dark:bg-dark sm:h-[13%] fixed ss:relative bottom-0 left-0 z-[46] border-t-[1px] border-slate-300">
                    <div className='w-full h-full flex-between-center gap-1 p-2 sticky'>
                        {
                            imgPrev && (
                                <div className="absolute -top-[165%] bg-light dark:bg-dark border-[1px] border-slate-300 p-1 rounded-md">
                                    <div className="w-full h-full sticky">
                                        <button type='button' className='absolute -top-3 -right-3' onClick={() => {setImgPrev(null)}}><XMarkIcon className='bg-primary bg-opacity-80 p-1 rounded-full text-light size-6' title='hapus' /></button>
                                        <Image src={URL.createObjectURL(imgPrev)} alt='Preview' width={100} height={100} className='w-20 h-20 aspect-square' />
                                    </div>
                                </div>
                            )
                        }
                        <div className='w-full sticky flex items-center'>
                            <textarea ref={commentInput} name='comment' className='hidden-scrollbar input-default resize-none w-full px-2 py-2.5 rounded-md' rows={1} placeholder={placeholder} autoFocus={replyId !== null}></textarea>
                            <div className='absolute right-2 z-[20]'>
                                <label htmlFor='imagePreviewComment'><PhotoIcon className='icon-size icon cursor-pointer' /></label>
                                <input type='file' name='image' accept='image/*' hidden id='imagePreviewComment' onChange={handleImageComment} />
                            </div>
                        </div>
                        <button type='submit' className='flex-center px-4 py-2.5 button border-[1px] border-primary rounded-md'>{ loadingBtn ? (<Spinner />) : 'Kirim' }</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}