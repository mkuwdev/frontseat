import React from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link'
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import TokenInfo from './TokenInfo';

const CreatorEarnings = () => {
    // What needs to be fetched (Component = props)
    // TokenInfo = tokenName, tokenPic, percentMinted, tokenRemaining, tokenSupply, tokenPrice

    return (
        <div className="rounded-2xl bg-white">
            {/* Container to control spacing of items inside */}
            <div className="flex flex-col space-y-5 p-6">
                {/* Container fill the entirety of the content inside */}
                <div className="flex items-center space-x-3">
                    {/* Control spacing between the title and tokens */}
                    <div className="flex grow flex-col space-y-4">
                        <div className="">
                            <p className="font-clashg text-base font-medium text-center text-stone-900">Creator Earnings</p>
                        </div>
                        {/* Invisible container to store membership tokens and control spacing */}
                        <div className="container flex flex-col space-y-6">
                            <TokenInfo
                                tokenName="Livies"
                                tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
                                percentMinted="45"
                                tokenRemaining="4600"
                                tokenSupply="5000"
                                tokenPrice="200"
                            />
                            {/* Stats first row*/}
                            <div className="flex flex-row space-x-4 justify-start">
                                <div className="flex flex-col">
                                    <span className="font-archivo font-normal text-[10px] text-stone-500 uppercase text-center">Tokens sold</span>
                                    <span className="font-archivo font-semibold text-base text-stone-800">50</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-archivo font-normal text-[10px] text-stone-500 uppercase text-center">Total Earnings</span>
                                    <div className="flex flex-row">
                                        <span className="font-archivo font-semibold text-base text-stone-800 text-center">50</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 560 400"><path d="m29 10.2c-.7-.4-1.6-.4-2.4 0l-5.6 3.3-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0l-4.3-2.6c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0l4.3 2.6c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2v-3.4c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0l-8.2 4.8c-.8.4-1.2 1.2-1.2 2v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1l-4.2 2.5c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1v-3.2l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1v-9.5c0-.8-.4-1.6-1.2-2.1z" fill="#a8a29e" fill-rule="nonzero" transform="matrix(7.04961 0 0 7.04961 145 81.9191)" /></svg>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-archivo font-normal text-[10px] text-stone-500 uppercase text-center">Amt. withdrawn</span>
                                    <span className="font-archivo font-semibold text-base text-stone-800 text-center">50</span>
                                </div>
                            </div>
                            {/* Stats second row*/}
                            <div className="flex flex-row space-x-4 justify-between">
                                <div className="flex flex-col">
                                    <span className="font-archivo font-normal text-[10px] text-stone-500 uppercase text-center">Amt. remaining</span>
                                    <span className="font-archivo font-semibold text-base text-stone-800">50</span>
                                </div>
                                {/* Put withdraw link inside the href */}
                                <Link href=""> 
                                    <button type="button" className="text-white bg-stone-800 hover:bg-black hover:shadow-lg  focus:ring-4 focus:ring-stone-300 rounded-lg px-2 py-1">
                                        <div className="flex flex-row space-x-2 justify-end items-center hover:cursor-pointer m-1">
                                            <p className="font-archivo font-semibold text-xs text-white">Withdraw remaining</p>
                                            <ArrowSmRightIcon className="h-3 w-3 text-white" />
                                        </div>
                                    </button>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dynamic(() => Promise.resolve(CreatorEarnings), { ssr: false });
