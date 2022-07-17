import { Disclosure, Menu } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import NavItems from './NavItems'
import ProfileDropdown from './ProfileDropdown'

import { useMoralis } from "react-moralis";

const Navbar = () => {

  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  // const login = async () => {
  //   if (!isAuthenticated) {
  //     await authenticate({signingMessage: "Log in using Moralis" })
  //       .then(function (user) {
  //         console.log("logged in user:", user);
  //         console.log(user.get("ethAddress"));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // }

  // const logOut = async () => {
  //   await logout();
  //   console.log("logged out");
  // }

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
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
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
              <div className="text-3xl mx-auto font-chillax font-title hidden sm:block">
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
                    <Menu.Button className="bg-doctor flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://data.whicdn.com/images/354500359/original.jpg"
                        alt=""
                      />
                    </Menu.Button>
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