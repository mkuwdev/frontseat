import React from 'react'
import { PencilAltIcon } from '@heroicons/react/outline'

const EditProfile = () => {
    return (
        <div className="px-4">
            <button type="button" className="text-white bg-stone-800 hover:bg-black hover:shadow-lg  focus:ring-4 focus:ring-stone-300 rounded-lg px-2 py-1">
                <div className="flex flex-row space-x-2 justify-end items-center hover:cursor-pointer m-1">
                    <PencilAltIcon className="h-3 w-3 stroke-2 text-white" />
                    <p className="font-archivo font-semibold text-xs text-white">Edit profile</p>
                </div>
            </button>
        </div>

    )
}

export default EditProfile