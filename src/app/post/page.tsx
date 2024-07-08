"use client"
import UserProfile from '@/components/puzzle/UserProfile'
import Layout from '@/layouts/Layout'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import HashtagAction from '@/components/post/HashtagAction'
import MentionAction from '@/components/post/MentionAction'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Toast, ToastErr } from '@/lib/alert'
import { useStore } from '@/lib/store'
import Spinner from '@/components/loading/Spinner'
import { axiosData } from '@/lib/axios'

type Props = {}

export default function Page({}: Props) {
  const router = useRouter()
  const { data: session } = useSession()
  const { imagePrevPost, setImagePrevPost } = useStore()
  const [imgPrev, setImgPrev] = React.useState<any>(imagePrevPost)
  const [loading, setLoading] = React.useState<boolean>()

  const handleImage = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgPrev(e.target.files[0]);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.target)

    form.set('image', imgPrev)

    try {
      const response = await axiosData.post('/post', form)

      if ( response.status === 200 ) {
        setImagePrevPost(null)
        Toast('Postingan telah diterbitkan')
        router.push('/')
      } else {
        ToastErr('Gagal menerbitkan postingan')
      }
    } catch(e: any) {
      ToastErr('Gagal menerbitkan postingan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className='px-2'>
        <div className='px-1 ss:px-2 pt-0'>
          <div className="w-full p-6 bg-light dark:bg-dark rounded-lg">
            <div className="flex gap-3 items-center">
              <Link href={'/'}><ArrowLeftIcon className='icon-size icon' /></Link>
              <h1 className='text-xl font-semibold text-defaultText'>Buat Postingan</h1>
            </div>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex gap-2 items-center">
                <div className="w-12 h-12">
                  <UserProfile image={session?.user?.image} />
                </div>
                <div>
                  <h1 className='text-base font-semibold'>Eick Setyawan</h1>
                   <select className='input-default px-2 py-1.5 rounded-md' defaultValue='public'>
                      <option value='public'>Publik</option>
                      <option value='private'>Privat</option>
                   </select>
                </div>
              </div>
              <div className="mt-4 sticky">
                <textarea placeholder='Apa yang kamu pikirkan?' name='caption' rows={8} className='input w-full resize-none p-3 rounded-md'></textarea>
                <div className="absolute right-3 bottom-3 flex gap-2 items-center">
                    <label htmlFor="image" title='upload' className='cursor-pointer'><PhotoIcon className='size-6 icon' /></label>
                    <input type="file" id="image" accept='image/*' hidden onChange={handleImage} />
                    <HashtagAction />
                    <MentionAction />
                </div>
              </div>
              {
                imgPrev && (
                  <div className="mt-2 w-20 h-20 sticky">
                    <button type='button' className='absolute -top-2 -right-2' onClick={() => {setImgPrev(null);setImagePrevPost(null)}}><XMarkIcon className='bg-primary bg-opacity-80 p-1 rounded-full text-light size-6' /></button>
                    <Image src={URL.createObjectURL(imgPrev)} alt='Preview' width={100} height={100} className='w-full h-full aspect-square object-cover object-center rounded-md' />
                  </div>
                )
              }
              <div className="mt-4">
                <button type='submit' className='button w-full flex-center py-3 rounded-md' disabled={loading}>{ loading ? (<Spinner />) : (<span>Posting</span>) }</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
