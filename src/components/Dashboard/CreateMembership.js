import React from 'react'
import Link from 'next/link'
import { ArrowSmRightIcon } from '@heroicons/react/outline'

const CreateMembership = () => {
    return (
        <div className="rounded-2xl bg-white">
            {/* Container to control spacing of items inside */}
            <div className="flex flex-col space-y-5 p-6">
                {/* Title and caption */}
                <div className="flex items-center justify-start space-x-3">
                    <div className="flex flex-col space-y-4">
                        <p className="font-clashg text-base font-medium text-stone-900">Be a creator!✨</p>
                        <p className="font-archivo text-xs font-normal leading-loose text-stone-600">Launch your own membership NFT collection and release exclusive contents for your top fans</p>
                    </div>
                </div>
                {/* Get started link and divider */}
                <Link href="/get-started">
                    <div className="flex flex-row items-center content-center justify-center space-x-2 pt-4 hover: cursor-pointer">
                        <p className="font-archivo text-sm font-semibold align-middle text-stone-900">Get started</p>
                        <div className="">
                            <ArrowSmRightIcon className="text-stone-900 h-4 w-4"></ArrowSmRightIcon>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default CreateMembership