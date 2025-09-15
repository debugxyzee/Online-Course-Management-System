import React from 'react'
import hero from '../assets/hero.png'
import { Award } from 'lucide-react';
import { User } from 'lucide-react';



function Hero() {
    return (
        <div className='text-[28px] bg-[#1E293B] h-[80vh] flex justify-around items-center px-40'>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col justify-end items-end'>
                    <div className='text-[#fff] text-[4rem] font-[700] w-[70%]'>Explore Our <span className='text-[#3B82F6]'>14000+</span> Online courses for all</div>
                    <div className='text-[15px] text-[#fff]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, consectetur adipiscing elit tempor ut labore</div>
                </div>
                <div className='flex w-[40%]'>
                    <input className='bg-[#fff] mt-5 py-2 rounded-l text-[15px] outline-none w-full px-2' placeholder='Search For Courses...' />
                    <div className='flex items-center text-[15px] font-[600] bg-[#3B82F6] mt-5 px-2 rounded-r cursor-pointer text-[#fff]'>Search</div>
                </div>

            </div>

            <div className='h-full'>
                <div className='h-full flex items-end relative'>

                    <div className='bg-[#fff] flex items-center w-[200px] justify-center gap-3 absolute left-2 rounded-md py-1 top-1/4'>
                        <div className='bg-[#60A5FA] p-1 rounded-full text-[#fff] '><Award /></div>
                        <div className='-space-y-1.5'>
                            <div className='font-[700]'>684+</div>
                            <div className='text-[15px] text-[#4b545f] font-[400]'>Certified Students</div>
                        </div>
                    </div>

                    <img src={hero} alt="" className='object-contain w-[800px]' />

                    <div className='bg-[#fff] flex items-center w-[200px] justify-center gap-3 absolute -right-5 rounded-md py-1 bottom-1/2'>
                        <div className='bg-[#60A5FA] p-1 rounded-full text-[#fff] '><User /></div>
                        <div className='-space-y-1.5'>
                            <div className='font-[700]'>4,500+</div>
                            <div className='text-[15px] text-[#4b545f] font-[400]'>Active Students</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Hero