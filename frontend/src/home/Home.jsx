import React from 'react'
import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

const Home = () => {
/*
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate();
    console.log(searchTerm)

    const handleSearch = (event) => {
        event.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);    
        urlParams.set("searchTerm", searchTerm)
        const searchQuery = urlParams.toString()
        localStorage.removeItem("searchTerm");
        localStorage.setItem("searchTerm", searchTerm);
        navigate(`/book-search?${searchQuery}`)
    }
*/        

  return (
    <div className='px-4 lg:px-24 bg-gray-300 flex items-center'>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
            <div className='md:w-1/2 space-y-8 h-full'>
            <h2 className='text-5xl font-bold leading-snug text-black'>Welcome to PrepNGo 
            </h2>
                <p className='md:w-4/5'>Welcome to Manga Mania! You have now found the anime community's best kept secret, stand tall and be proud!
                At Manga Mania, you and a community of manga fans will be able to sell your manga and/or you will be able to buy from others.</p>
            </div>
        </div>
    </div>
  )
}

export default Home