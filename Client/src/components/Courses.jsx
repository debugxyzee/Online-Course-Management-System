import React from 'react'
import Card from './ui/Card'

function Courses() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-20">
      {/* Heading */}
      <div className="text-[2rem] font-[700] mt-12">Our Courses</div>
      <div className="text-[#000000af] text-center max-w-2xl">
        Explore our curated courses to boost your skills and career. Whether you're a beginner or an expert, we have something for everyone.
      </div>

      {/* Grid of Cards */}
      <div className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default Courses
