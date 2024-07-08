import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React from 'react'

type Props = {}

export default function NavbarCenter({}: Props) {
  return (
    <form className='w-[50%] hidden ss:flex'>
      <div className='w-full sticky flex items-center'>
        <label htmlFor="search" className='absolute left-4'>
          <MagnifyingGlassIcon className='size-5 text-slate-400' />
        </label>
        <input type="text" name="keyword" id="search" placeholder='Search' autoComplete='off' className='w-full input px-4 py-2.5 pl-11 rounded-full' />
      </div>
    </form>
  )
}