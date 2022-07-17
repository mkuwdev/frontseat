import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Explore', href: '#', current: false },
]

const dropdown = [
  'Your Profile',
  'Sign Out'
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-doctor">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center">
              <div class="flex-1 flex justify-start mr-auto">
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
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-black text-white' : 'text-black hover:bg-gray-100',
                            'px-3 py-2 rounded-md text-base font-semibold font-archivo'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Center Logo */}
              <div className="text-3xl mx-auto font-chillax font-title hidden sm:block">
                FRONTSEAT
              </div>
              {/* Notification and Profile */}
              <div class="flex-1 flex justify-end ml-auto">
                <button
                  className="rounded-full hover:bg-gray-200 px-1"
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
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-xl py-1 bg-doctor ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {dropdown.map((item) => (
                        <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-rhineCastle font-archivo')}
                          >
                            {item}
                          </a>
                        )}
                      </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {/* Dropdown menu for mobile */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-black text-white' : 'text-black hover:bg-gray-100',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar