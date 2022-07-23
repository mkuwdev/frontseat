import { PlusCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import Link from 'next/link'

const CreatePost = () => {
    return (
        <Link href="#">
            <div className="mx-12 mb-4 rounded-2xl bg-white justify-center hover:drop-shadow-md hover:cursor-pointer">
                <div className="p-6 justify-center">
                    <div className="flex flex-row space-x-3 justify-center items-center">
                        <PlusCircleIcon className="w-5 h-5 text-stone-800" />
                        <span className="font-archivo font-semibold text-base text-stone-800 text-center">Create new post</span>
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default CreatePost