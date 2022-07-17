import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

const dropdown = [
    'Your Profile',
    'Sign Out'
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProfileDropdown = () => {
  return (
    <div>
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
    </div>
  )
}

export default ProfileDropdown