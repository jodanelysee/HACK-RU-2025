import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pastaImg from '../assets/pasta.jpg';
import logoIMG from '../assets/PrepNGo.png';

const Banner = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("search", searchTerm);
        const searchQuery = urlParams.toString();
    
        localStorage.removeItem("searchTerm");
        localStorage.setItem("searchTerm", searchTerm);
    
        navigate(`/recipe-search?${searchQuery}`);
    };
    
    return (
        <div className='flex flex-col w-full min-h-screen bg-gradient-to-r from-yellow-100 to-orange-300 items-center justify-center py-20'>
            <h2 className='text-5xl font-bold text-black text-center mb-6'>Welcome to PrepNGo</h2>
            
            <img src={pastaImg} alt="Pasta Boiling" className="w-80 h-80 object-cover rounded-full mb-6" />
            
            <form onSubmit={handleSearch} className='flex flex-col items-center w-full'>
                <div className='relative w-80'>
                    <input 
                        type="text" 
                        placeholder='List an ingredient' 
                        className='py-3 px-5 w-full rounded-full border border-gray-300 outline-none shadow-sm focus:ring-2 focus:ring-yellow-500'
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <button className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black px-4 py-2 text-white font-medium hover:bg-gray-800 transition-all ease-in duration-200 rounded-full'>🔍</button>
                </div>
            </form>
        </div>
    );
};

export default Banner;