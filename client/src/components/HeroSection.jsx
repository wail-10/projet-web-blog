import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <img
                src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Hero Background"
                className="w-full h-[90vh] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to The Blog Haven</h1>
                    <p className="text-lg">Discover the latest articles and explore new ideas.</p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
