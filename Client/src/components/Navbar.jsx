import React from 'react'
import { GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/button'


function Navbar() {
    return (
        <div className='bg-gray-900 z-50 w-full fixed top-0 flex px-16 justify-between items-center py-2'>
            {/* logo */}
            <div className='flex gap-2 items-center'>
                <div className='text-[#fff]'>
                    <GraduationCap size={'50px'}/>
                </div>
                <h1 className='text-[25px] font-[700] text-[#fff]'>Logo</h1>
            </div>

            {/* menu */}
            <div className='flex items-center gap-5'>
                <div className='text-[#fff] font-[600]'>Home</div>
                <div className='text-[#fff] font-[600]'>Courses</div>
                <div>
                    <Button className='bg-[#2563EB] hover:bg-[#2564ebb4]'>Login</Button>
                </div>
                <div>
                    <Button className='bg-[#353E4E] hover:bg-[#353e4e59]'>Sign Up</Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar