import React from 'react'
import Link from 'next/link'
import { ArrowSmRightIcon } from '@heroicons/react/outline'

const startingpage = () => {
    return (
        <div className="mt-32 flex flex-col space-y-6">
            <h3 className="font-clashg font-semibold text-4xl text-center text-stone-900">
                Glad to have you here! ✨
            </h3>
            <p className="mt-2 text-xl font-archivo text-stone-600 text-center">
                Connect your wallet to access the app
            </p>
            <div className="pt-6 flex justify-center">
                <button type="button" className="text-white bg-stone-800 hover:bg-black hover:shadow-lg  focus:ring-4 focus:ring-stone-300 rounded-lg px-4 py-2">
                    <div className="flex flex-row space-x-2 justify-end items-center hover:cursor-pointer m-1">
                        <p className="font-archivo font-semibold text-lg text-white">Connect wallet</p>
                        <ArrowSmRightIcon className="h-6 w-6 text-white" />
                    </div>
                </button>
            </div>


        </div>
    )
}

export default startingpage