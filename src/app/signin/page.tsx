"use client"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Spinner from '@/components/loading/Spinner'
import { useRouter } from 'next/navigation'
import { ToastErr } from '@/lib/alert'

type Props = {}

export default function Page({}: Props) {
  const router = useRouter()
  const [isVisible, setVisible] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [username, setUsername] = React.useState<string>()
  const [password, setPassword] = React.useState<string>()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if ( username && password ) {
        setLoading(true)
        try {
            const response = await signIn("credentials", {
                username: username,
                password: password,
                redirect: false
            })
            if ( response?.ok ) {
                router.push('/')
            } else {
                ToastErr('Username atau password salah')
            }
        } catch(e: any) {
            ToastErr('Username atau password salah')
        } finally {
            setLoading(false)
        }
    }
  }

  return (
    <div className="w-full h-screen grid sm:grid-cols-2">
        <div className="w-full hidden sm:flex"></div>
        <div className="w-full h-full flex-center p-4">
            <div className='w-full sm:w-[70%]'>
                <h1 className='text-3xl font-bold'>Welcome Back</h1>
                <p>Masukkan credential login</p>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div>
                        <label htmlFor="username">Username atau Email Address</label>
                        <input type="text" id="username" autoComplete='off' placeholder='Username' className='w-full mt-0.5 input px-4 py-3 rounded-md' onChange={(e) => {setUsername(e.target.value)}} />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="password">Password</label>
                        <div className="w-full sticky flex items-center">
                            <input type={isVisible ? 'text': 'password'} id="password" autoComplete='off' placeholder='Password' className='w-full input mt-0.5 px-4 py-3 rounded-md' onChange={(e) => {setPassword(e.target.value)}} />
                            <button type='button' className='absolute right-3' onClick={() => {setVisible(state => !state)}}>
                                {
                                    isVisible ? (<EyeSlashIcon className='icon-size text-primary' />) : (<EyeIcon className='icon-size text-primary' />)
                                }
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button className='w-full button flex-center py-3 rounded-md' disabled={loading ?? Boolean(!username && !password)}>{ loading ? (<Spinner />) : (<span>Login</span>) }</button>
                    </div>
                </form>
                <div className="mt-6">
                    <h1>Belum mempunyai akun? <Link href={'/signup'} className='text-sky-500 font-semibold'>Daftar</Link></h1>
                </div>
            </div>
        </div>
    </div>
  )
}