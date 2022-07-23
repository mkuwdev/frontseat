import React, { useState, Fragment } from 'react'
import Link from "next/link"
import { Dialog, Transition } from "@headlessui/react";
import { AddPost } from "./addPost";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Explore = () => {

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="px-2 py-2 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-archivo font-semibold">
        Explore
      </h1>
      <Link href="/editprofile">
        <h1 className="mt-2 hover:cursor-pointer">Edit Profile</h1>
      </Link>
      <Link href="/launch">
        <h1 className="mt-2 hover:cursor-pointer">Launch Membership</h1>
      </Link>
      <button
        type="button"
        onClick={openModal}
        className="mt-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
      >
        Add post
      </button>
      <AddPost isOpen={isOpen} closeModal={closeModal}/>
      <Link href="/lit">
        <h1 className="mt-2 hover:cursor-pointer">lit</h1>
      </Link>
      <Link href="/addpostlit">
        <h1 className="mt-2 hover:cursor-pointer">lit addpost</h1>
      </Link>
      <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
      />
    </div>
  )
}

export default Explore