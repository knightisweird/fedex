import React from 'react'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import searchIcon from '@/assets/search.png'

const Header = () => {
  return (
    <header className="w-full bg-[#4d148c] p-6">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <Image src={logo} width={80} height={60} />
        <Image src={searchIcon} width={30} height={30} className="cursor-pointer" />
      </div>
    </header>
  )
}

export default Header