import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Components/NavBar';

const Main = () => {
    return (
        <div className=''>
            <NavBar></NavBar>
            <section className='w-11/12 max-w-[1440px] mx-auto'>
                <Outlet></Outlet>
            </section>
        </div>
    );
};

export default Main;