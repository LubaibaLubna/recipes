import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Banner from './Banner';
import TopChefs from '../pages/TopChefs';
import Specialties from '../pages/Specialties';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <TopChefs></TopChefs>
            <Specialties></Specialties>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Home;