import React from 'react'
import Link from 'next/link'
import { PencilAltIcon, ArrowSmRightIcon } from '@heroicons/react/outline'


const CreatorProfile = ({ profPic, disName }) => {
  return (
    <div className="rounded-2xl bg-white">


      {/* Container to control spacing of items inside */}
      <div className="flex flex-col space-y-5 px-6 py-6">
        {/* Profile pic and user name and wallet */}
        <div className="flex items-center justify-center space-x-3">
          <div className="flex flex-col space-y-4">
            {/* Profile Pic */}
            <div className="flex justify-center">
              <img className="object-cover h-14 w-14 rounded-full" src={profPic} alt="" />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-clashg text-base font-medium text-center text-stone-900">{disName}</p>
              <p className="font-archivo text-xs font-normal leading-loose text-center text-stone-500">Creator</p>
            </div>
            <button type="button" className="text-white bg-stone-700 hover:bg-stone-900 hover:shadow-lg  focus:ring-4 focus:ring-stone-300 rounded-lg px-2 py-1">
              <div className="flex flex-row space-x-2 justify-end items-center hover:cursor-pointer m-1">
                <p className="font-archivo font-semibold text-xs text-white">View full profile</p>
                <ArrowSmRightIcon className="h-3 w-3 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorProfile