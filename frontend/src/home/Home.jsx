import React from 'react'
import { useState, useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import Banner from './Banner';

const Home = () => {

    useEffect(() => {
        // check to see if userID is in local storage
        const userID = localStorage.getItem('userID');
        if (!userID) {
          // if userID is in local storage, redirect to login page
          window.location.replace('http://localhost:5173/login');
        }
      });

    
  return (
    <div>
        <Banner/>
    </div>
  )
}

export default Home