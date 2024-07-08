import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
    likes: number,
    postId: number,
    handleReact: (postId: number, react: string) => void
    isReact: string | null,
}

const items = [
    {
        name: 'like',
        icon: '👍'
    },
    {
        name: 'love',
        icon: '❤️'
    },
    {
        name: 'haha',
        icon: '😆'
    },
    {
        name: 'wow',
        icon: '😮'
    },
    {
        name: 'sad',
        icon: '😢'
    },
    {
        name: 'angry',
        icon: '😠'
    }
]

export default function ReactAction({likes, postId, handleReact, isReact}: Props) {
  const [reactShow, setReactShow] = React.useState<boolean>(false)

  const getReact = (key: any) => {
    const result: any = items.filter(item=>item.name === key)
    return result[0]
  }

  return (
    <div>
        <h1 className='text-xs sm:text-sm'>{ likes } reaksi</h1>
        <div className="mt-1 sticky" onMouseOver={() => {setReactShow(true)}} onMouseOut={() => {setReactShow(false)}}>
            <div>
                {
                    isReact && isReact !== 'like' ? (
                        <button className='icon text-base flex gap-1 items-center' onClick={() => {handleReact(postId, getReact(isReact).name)}}>
                            <span className='text-xl'>{ getReact(isReact).icon }</span>
                            <h1>{ getReact(isReact).name }</h1>
                        </button>) : (
                        <button className='icon flex gap-1 items-center' onClick={() => {handleReact(postId, 'like')}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${isReact && isReact === 'like' ? 'text-primary' : 'icon'} icon-size`}>
                                <title>suka</title>
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                            </svg>
                            <h1 className='sm:text-base'>sukai</h1>
                        </button>
                    )
                }
            </div>
            {
                reactShow && (
                    <div className={`flex absolute left-0 bg-light dark:bg-dark rounded-xl p-1.5 border-[1px] border-slate-300 gap-4 items-center`}>
                        {
                            items.map((value, index: number) => (
                                <button key={index} title={value.name} onClick={() => {setReactShow(false);handleReact(postId, value.name)}} className='text-2xl'>{ value.icon }</button>
                            ))
                        }
                    </div>
                )
            }
        </div>
    </div>
  )
}