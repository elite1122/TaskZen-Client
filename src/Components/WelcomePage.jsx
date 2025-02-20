import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function WelcomePage() {
    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <nav className=" bg-white shadow-md sticky top-0 z-50">
                <div className="flex justify-between items-center p-6 max-w-[1440px] mx-auto">
                    <Link to="/">
                        <h1 className="text-4xl font-extrabold text-blue-600">TaskZen</h1>
                    </Link>
                    <div className="space-x-4">
                        <button class="btn btn-warning">Get Started</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="w-11/12 mx-auto max-w-[1440px] flex flex-col items-center justify-center text-center px-6 py-24 bg-gray-100 min-h-[calc(100vh-80px)]">
                <motion.h2
                    className="text-5xl font-extrabold text-gray-900 mb-6 tracking-wide leading-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Master Your Productivity with TaskZen
                </motion.h2>
                <motion.p
                    className="text-xl text-gray-700 mb-10 max-w-3xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    TaskZen helps you streamline your workflow, manage daily tasks efficiently, and
                    achieve your goals with precision. Experience seamless task tracking, intuitive
                    organization, and a productivity boost like never before. Empower your work-life
                    balance today!
                </motion.p>
                <motion.div
                    className="space-x-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                >
                    <button className="btn btn-warning bg-green-500 border-none">Sign In</button>
                    <button className="btn btn-warning">Sign Up</button>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-16 text-center w-11/12 mx-auto max-w-[1440px]">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Why Choose TaskZen?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition">
                        <h4 className="text-xl font-bold text-blue-600 mb-2">Organize Effortlessly</h4>
                        <p className="text-gray-700">Create, manage, and track tasks with a user-friendly interface designed for ultimate productivity.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition">
                        <h4 className="text-xl font-bold text-purple-600 mb-2">Stay Focused</h4>
                        <p className="text-gray-700">Eliminate distractions with smart notifications and priority settings tailored to your needs.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition">
                        <h4 className="text-xl font-bold text-pink-600 mb-2">Achieve Goals</h4>
                        <p className="text-gray-700">Set milestones, track progress, and celebrate your achievements with detailed analytics.</p>
                    </div>
                </div>

            </section>
        </div>
    );
}
