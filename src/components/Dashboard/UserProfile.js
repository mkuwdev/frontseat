import React from 'react'
import Link from 'next/link'
import { PencilAltIcon, ArrowSmRightIcon } from '@heroicons/react/outline'
import { shortenAddress } from '@utils/shortenAddress'
const UserProfile = ({ uProfPic, uDisName, uWalletAdd }) => {
  return (
    <div className="rounded-2xl bg-white">
            <Link href="/editprofile">
              <div className="flex justify-end hover:cursor-pointer">
                <PencilAltIcon className=" h-5 w-5 mx-4 mt-3 text-stone-600"></PencilAltIcon>
              </div>
            </Link>

            {/* Container to control spacing of items inside */}
            <div className="flex flex-col space-y-5 px-6 pb-6 pt-0">
              {/* Profile pic and user name and wallet */}
              <div className="flex items-center justify-center space-x-3">
                <div className="flex flex-col space-y-4">
                  {/* Profile Pic */}
                  <div className="flex justify-center">
                    {/* {uProfPic ?
                      (<img className="object-cover h-14 w-14 rounded-full" src={uProfPic} alt="" />) :
                      (<Jazzicon diameter={32} seed={jsNumberForAddress(Moralis.account)}/>)
                    }  */}
                    <img className="object-cover h-14 w-14 rounded-full" src={uProfPic} alt="" />
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                      <p className="font-clashg text-base font-medium text-center text-stone-900">{uDisName}</p>
                      <p className="font-archivo text-xs font-normal leading-loose text-center text-stone-500">{shortenAddress(uWalletAdd)}</p>
                    </div>
                    <Link href={`/profile/${uWalletAdd}`}>
                      <button type="button" className="text-white bg-stone-700 hover:bg-stone-900 hover:shadow-lg  focus:ring-4 focus:ring-stone-300 rounded-lg px-2 py-1">
                        <div className="flex flex-row space-x-2 justify-end items-center hover:cursor-pointer m-1">
                          <p className="font-archivo font-semibold text-xs text-white">View full profile</p>
                          <ArrowSmRightIcon className="h-3 w-3 text-white" />
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default UserProfile