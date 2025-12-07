import React from 'react'
import Nav from './Nav'
import Navbar from './Navbar'

const Header = () => {
  return (
    <>
    <div className='flex justify-between bg-black'>
      <div className='text-white font-bold p-3 flex items-center'>
        <a href='/'>Game<span className='text-red-400'>HUB</span></a>
      </div>
      <div className='text-white uppercase font-bold p-3 flex items-center ' >
        <a href="/" className='hover:text-sky-300 p-3 ' >Cửa hàng</a>
        <a href="/CongDong" className='hover:text-sky-300 p-3'>cộng đồng</a>
        <a href="/ThongTin" className='hover:text-sky-300 p-3'>Thông tin</a>
        <a href="/HoTro" className='hover:text-sky-300 p-3'>hỗ trợ</a>
      </div>
    
    </div>
    <Nav/>
    <Navbar/>
    </>
  )
}

export default Header
