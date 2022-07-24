import { PlusCircleIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { AddPost } from './AddPost'

const CreatePost = () => {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div className="flex flex-col mx-12 mb-4 rounded-2xl bg-white justify-center items-center hover:drop-shadow-md hover:cursor-pointer">
            <button
                type="button"
                onClick={openModal}>
                <div className="p-6 justify-center">
                    <div className="flex flex-row space-x-3 justify-center items-center">
                        <PlusCircleIcon className="w-5 h-5 text-stone-800" />
                        <span className="font-archivo font-semibold text-base text-stone-800 text-center">Create new post</span>
                    </div>
                </div>
            </button>
            <AddPost isOpen={isOpen} closeModal={closeModal} />
        </div>

    )
}

export default CreatePost