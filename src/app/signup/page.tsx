"use client"
import Spinner from '@/components/loading/Spinner'
import { ToastErr } from '@/lib/alert'
import { Axios } from '@/lib/axios'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

export default function Page({}: Props) {
  const router = useRouter()
  const [isVisible, setVisible] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>()
  const [email, setEmail] = React.useState<string>()
  const [username, setUsername] = React.useState<string>()
  const [password, setPassword] = React.useState<string>()
  const [error, setError] = React.useState<any>()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if ( !email ) {
        setError({ email: 'Email address harus diisi' })
    }
    if ( !username ) {
        setError({ username: 'Username harus diisi' })
    }
    if ( !password ) {
        setError({ password: 'Password harus diisi' })
    }
    if ( password && password.length < 3 ) {
        setError({ password: 'Password minimal 3 karakter' })
    }
    if ( email && username && password && password.length >= 3 ) {
        setLoading(true)
        setError(null)
        try {
            const response = await Axios.post('/auth/signup', {
                email: email,
                username: username,
                password: password
            })
            if ( response.status == 200 ) {
                const signin = await signIn('credentials', {
                    username: username,
                    password: password,
                    redirect: false
                })
                if ( signin?.ok ) {
                    router.push('/')
                } else {
                    router.push('/signin')
                }
            }
        } catch(e: any) {
            ToastErr('Gagal membuat akun')
            if ( e?.response?.data?.errors ) {
                setError(e?.response?.data?.errors)
            }
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
                <h1 className='text-3xl font-bold'>Create Account</h1>
                <p>Mohon isi data berikut dengan benar</p>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" autoComplete='off' placeholder='Username' className={`${error?.username ? 'input-error' : 'input'} w-full mt-0.5 px-4 py-3 rounded-md`} onChange={(e) => {setUsername(e.target.value)}} />
                        {
                            error?.username && (
                                <span className='text-red-500'>{ error?.username }</span>
                            )
                        }
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" autoComplete='off' placeholder='Email Address' className={`${error?.email ? 'input-error' : 'input'} w-full mt-0.5 px-4 py-3 rounded-md`} onChange={(e) => {setEmail(e.target.value)}} />
                        {
                            error?.email && (
                                <span className='text-red-500'>{ error?.email }</span>
                            )
                        }
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="password">Password</label>
                        <div className="w-full sticky flex items-center">
                            <input type={isVisible ? 'text': 'password'} id="password" autoComplete='off' placeholder='Password' className={`${error?.password ? 'input-error' : 'input'} w-full mt-0.5 px-4 py-3 rounded-md`} onChange={(e) => {setPassword(e.target.value)}} />
                            <button type='button' className='absolute right-3' onClick={() => {setVisible(state => !state)}}>
                                {
                                    isVisible ? (<EyeSlashIcon className='icon-size text-primary' />) : (<EyeIcon className='icon-size text-primary' />)
                                }
                            </button>
                        </div>
                        {
                            error?.password && (
                                <span className='text-red-500'>{ error?.password }</span>
                            )
                        }
                    </div>
                    <div className="mt-4">
                        <button className='w-full button flex-center py-3 rounded-md' disabled={loading ?? Boolean(!email && !username && !password)}>{ loading ? (<Spinner />) : (<span>Daftar</span>) }</button>
                    </div>
                </form>
                <div className="mt-6">
                    <h1>Sudah mempunyai akun? <Link href={'/signin'} className='text-sky-500 font-semibold'>Masuk</Link></h1>
                </div>
            </div>
        </div>
    </div>
  )
}