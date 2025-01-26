import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home';
import Categories from './pages/categories';
import Podcast from './pages/podcast';
import Login from './pages/login';
import Signup from './pages/signup';
import Search from './pages/Search';
import UploadSong from './pages/UploadSong';
import CategorySongs from './components/CategorySongs';
import LikedSongs from './pages/LikedSongs';

const App = () => {
  return (
   <div>
    <Header/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/podcast" element={<Podcast/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/upload" element={<UploadSong/>} />
        <Route path="/category/:categoryName" element={<CategorySongs/>} />
        <Route path="/liked" element={<LikedSongs/>} />
      </Routes>
   </div>
  )
}

export default App