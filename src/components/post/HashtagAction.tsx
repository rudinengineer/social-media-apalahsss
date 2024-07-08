import { HashtagIcon } from '@heroicons/react/24/solid'
import React from 'react'

type Props = {}

export default function HashtagAction({}: Props) {
  return (
    <div>
        <button title='hashtag'><HashtagIcon className='size-6 icon' /></button>
    </div>
  )
}