import { Disclosure, Menu } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, UserCircleIcon } from '@heroicons/react/outline'
import NavItems from './NavItems'
import ProfileDropdown from './ProfileDropdown'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { useMoralis } from "react-moralis";

const Navbar = () => {

  const { Moralis, authenticate, logout } = useMoralis();

  const login = async () => {
      await authenticate({signingMessage: "Log in to FRONTSEAT" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  // TO DO:
  // If not connected, profile picture is default
  // If connected but wrong chain, must indicate unsupported network and prompt to change
  // Otherwise, connected
  
  return (
    <Disclosure as="nav" className="bg-doctor">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center">
              <div className="flex-1 flex justify-start mr-auto">
                {/* Mobile menu button*/}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:text-stone-800
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* Menu */}
                <div className="flex items-center justify-center">
                  <div className="hidden sm:block ">
                    <div className="flex space-x-4">
                      <NavItems/>
                    </div>
                  </div>
                </div>
              </div>
              {/* Center Logo */}
              <div className="text-2xl mx-auto font-chillax font-title hidden sm:block">
                FRONTSEAT
              </div>
              {/* Notification and Profile */}
              <div className="flex-1 flex justify-end ml-auto">
                <button
                  className="rounded-full hover:bg-gray-100 px-1"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="border-l-2 ml-3 p-2 h-8 border-silverSnippet"/>
                {/* Profile w./ dropdown */}
                <Menu as="div" className="relative pr-2 sm:pr-0">
                  <div>
                    {Moralis.account
                      ? (
                        <Menu.Button className="bg-doctor flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                          <Jazzicon diameter={32} seed={jsNumberForAddress(Moralis.account)} />
                        </Menu.Button>
                      )
                      : <UserCircleIcon className="h-8 w-8 hover:cursor-pointer" onClick={login}/>
                    }
                  </div>
                  <ProfileDropdown/>
                </Menu>
              </div>
            </div>
          </div>
          {/* Dropdown menu for mobile */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavItems mobile={true}/>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar