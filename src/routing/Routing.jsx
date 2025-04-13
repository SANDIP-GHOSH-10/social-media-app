import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Home from '../pages/Home';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';
import Show from '../pages/Show';
import UpdateBlog from '../pages/UpdateBlog';
import AddBlogs from '../pages/AddBlogs';
import Profile from '../pages/Players';


const Routing = () => {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/show" element={<Show/>} />
        <Route path="/update/:id" element={<UpdateBlog/>} />
        <Route path="/post/new" element={<AddBlogs/>} />
        <Route path="/profile" element={<Profile/>} />
        
        {/* <Route path='*' element={<PageNotFound/>}></Route> */}
        
      </Routes>
      <Footer/>
    </Router>
  );
};

export default Routing;