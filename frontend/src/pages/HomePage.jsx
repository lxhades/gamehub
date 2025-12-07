import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import { useEffect, useState } from 'react';
import BrowseByCategory from '../components/CategoryList'
import GameList from "../components/GameList"
import { Footer } from '../components/Footer'
const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Lấy thông tin user từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  return (
    <div className='bg-wrap ' >
        <Header></Header>
        <Banner></Banner>
        <BrowseByCategory/>
        <GameList/>
        <Footer/>
         <div>

    </div>
    </div>
  )
}

export default HomePage
