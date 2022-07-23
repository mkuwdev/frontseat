import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import ProfileCard from './ProfileCard'

const Explore = () => {

  return (
    <div className="px-4 sm:px-0">
      <div className=" mt-8 mb-3">
          <h3 className="text-3xl font-semibold font-clashg leading-6 text-gray-900">
              EXPLORE
          </h3>
          <p className="mt-2 text-md font-archivo text-gray-600 max-w-3xl">
              Discover new creators and gain access to the content you love.
          </p>
      </div>
      <div className="flex">
        <div className="relative mx-auto text-black font-archivo flex bg-stone-100">
          <input className="border-1 border-gray-500 w-96 h-8 px-5 pr-16 rounded-full text-sm focus:ring-black focus:border-black" type="text" name="search" placeholder="Search"/>
          <SearchIcon className="h-6 w-6 ml-2 my-auto"/>
        </div>
      </div>
      <div class="container mt-6 mb-12 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
      </div>
    </div>
  )
}

export default Explore