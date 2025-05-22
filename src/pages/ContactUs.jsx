import React from 'react';
import { Link } from 'react-router';

const ContactUs = () => {
    return (
        <div>
            <div className='py-10'>
                <img src="https://i.ibb.co/tMKNCgXB/error.jpg" className='mx-auto' alt="" />

                <div className='text-center'>
                <h1 className='text-4xl font-semibold text-red-400'> 404 - Page Not Found </h1>
                <h1 className='pb-7 pt-2'> Oops! The page you are looking for doesn't exist. </h1>
                <Link to="/"><button className='btn bg-[#0EA106] text-white px-3 '>Go Back Home</button></Link>
                </div>

            </div>
            
            
        </div>
    );
};

export default ContactUs;