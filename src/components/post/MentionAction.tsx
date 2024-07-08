import { AtSymbolIcon } from '@heroicons/react/24/solid'
import React from 'react'

type Props = {}

export default function MentionAction({}: Props) {
  return (
    <div>
        <button title='mention'><AtSymbolIcon className='size-6 icon' /></button>
    </div>
  )
}