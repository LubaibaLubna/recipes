import React from 'react';
import { Link } from 'react-router';

const ContactUs = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[url('https://i.ibb.co/NdhvVh5n/404.jpg')] bg-cover bg-center text-white p-6">
            <div className='py-10'>
                <img src="https://i.ibb.co/tMKNCgXB/error.jpg" className='mx-auto' alt="" />

                <div className='text-center'>
                <h1 className='text-4xl font-semibold text-green-800'> 404 - Page Not Found </h1>
                <h1 className='pb-7 pt-2 text-black'> Oops! The page you are looking for doesn't exist. </h1>
                <Link to="/"><button className='btn bg-[#0EA106] text-white px-3 '>Go Back Home</button></Link>
                </div>

            </div>
            
            
        </div>
    );
};

export default ContactUs;