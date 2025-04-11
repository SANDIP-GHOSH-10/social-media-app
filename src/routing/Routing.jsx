import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Home from '../pages/Home';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';


const Routing = () => {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        
        {/* <Route path='*' element={<PageNotFound/>}></Route> */}
        
      </Routes>
      <Footer/>
    </Router>
  );
};

export default Routing;