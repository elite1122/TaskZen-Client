import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const Main = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);


    // useEffect(() => {
    //     const storedTheme = localStorage.getItem("theme");
    //     if (storedTheme === "dark") {
    //         setIsDarkMode(true);
    //         document.documentElement.classList.add("dark");
    //     } else {
    //         document.documentElement.classList.remove("dark");
    //     }
    // }, []);

    // const handleToggleTheme = () => {
    //     setIsDarkMode((prev) => !prev);
    //     if (!isDarkMode) {
    //         document.documentElement.classList.add("dark");
    //         localStorage.setItem("theme", "dark");
    //     } else {
    //         document.documentElement.classList.remove("dark");
    //         localStorage.setItem("theme", "light");
    //     }
    // };
    return (
        <div className="">
            <NavBar></NavBar>
            <section className='w-11/12 max-w-[1440px] mx-auto'>
                <Outlet></Outlet>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default Main;