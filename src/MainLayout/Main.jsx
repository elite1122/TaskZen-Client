import React from 'react';
import { Outlet } from 'react-router-dom';
import WelcomePage from '../Components/WelcomePage';

const Main = () => {
    return (
        <div className=''>
            <WelcomePage></WelcomePage>
            <section className='w-11/12 max-w-[1440px] mx-auto'>
                <Outlet></Outlet>
            </section>
        </div>
    );
};

export default Main;