"use client"
import React from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { PostType } from '@/types/post'
import DownloadPost from '@/components/post/option/DownloadPost'
import SavePost from '@/components/post/option/SavePost'
import ReportPost from '@/components/post/option/ReportPost'

type Props = {
    post: PostType
}

export default function OptionPopup({post}: Props) {
  const ref: any = React.useRef(null)
  const [show, setShow] = React.useState<boolean>(false)

  React.useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!ref.current?.contains(event.target)) {
        setShow(false)
      }
    }

    window.addEventListener("mousedown", handleOutSideClick)

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick)
    }
  }, [ref])

  return (
    <div className='sticky' ref={ref}>
        <button onClick={() => {setShow(state => !state)}}><EllipsisVerticalIcon className='icon-size text-dark dark:text-light' /></button>
        {
            show && (
                <div className="absolute right-0 bg-light dark:bg-dark p-4 rounded-lg border-[1px] border-slate-300 break-keep">
                    <DownloadPost post={post} />
                    <SavePost id={post.id} />
                    <ReportPost id={post.id} />
                </div>
            )
        }
    </div>
  )
}