import React from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link'
import TokenPreview from './TokenPreview';
import { ArrowSmRightIcon } from '@heroicons/react/outline';

const TokenCard = () => {
     // What needs to be fetched (Component = props)
     // TokenPreview = tokenPic, tokenName, tokenNum, cTokProfPic, cTokDisName, cTokTitle
    return (
        <div className="rounded-2xl bg-white">
            {/* Container to control spacing of items inside */}
            <div className="flex flex-col space-y-5 p-6">
                {/* Container fill the entirety of the content inside */}
                <div className="flex items-center space-x-3">
                    {/* Control spacing between the title and tokens */}
                    <div className="flex grow flex-col space-y-4">
                        <div className="">
                            <p className="font-clashg text-base font-medium text-center text-stone-900">Your Membership Tokens</p>
                        </div>
                        {/* Invisible container to store membership tokens and control spacing */}
                        <div className="container flex flex-col space-y-3">
                            <TokenPreview
                                tokenPic="https://i.pinimg.com/564x/44/60/87/446087c8c1d488b308fa34cc0803a4c8.jpg"
                                tokenName="Livies"
                                tokenNum="#336"
                                cTokProfPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWJDhlIp_IIVCYzDx3i7Br4y_jQX1NFMKVQ_Net4I0HWPxUGXdQ8vNjqvgHKYKYP5jL0s&usqp=CAU"
                                cTokDisName="Olivia Rodrigo"
                                cTokTitle="singer"
                            />
                            <TokenPreview
                                tokenPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz2V335gN7v7kAYWXvOof5_lt1JopQ8LMPmw&usqp=CAU"
                                tokenName="Swifties"
                                tokenNum="#2347"
                                cTokProfPic="https://thekit.ca/wp-content/uploads/2020/12/evermoreFEAT-1200x1445.jpg"
                                cTokDisName="Taylor Swift"
                                cTokTitle="singer"
                            />
                        </div>
                    </div>
                </div>
                {/* View link and divider */}
                <Link href="/get-started">
                    <div className="flex flex-row items-center content-center justify-center space-x-2 border-t-2 border-t-stone-100 pt-4 hover: cursor-pointer">
                        <p className="font-archivo text-sm font-semibold align-middle text-stone-900">View All</p>
                        <div className="">
                            <ArrowSmRightIcon className="text-stone-900 h-4 w-4"></ArrowSmRightIcon>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default dynamic(() => Promise.resolve(TokenCard), { ssr: false });
