import React from 'react'
import NavbarLeft from '../header/navbar/NavbarLeft'
import NavbarCenter from '../header/navbar/NavbarCenter'
import NavbarRight from '../header/navbar/NavbarRight'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className="w-full bg-light dark:bg-dark fixed top-0 left-0 px-4 ss:px-8 py-3 flex-between-center z-[48]">
        <NavbarLeft />
        <NavbarCenter />
        <NavbarRight />
    </div>
  )
}