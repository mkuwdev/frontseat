import React from 'react'

const TokenInfo = ({ tokenName, tokenPic, percentMinted, tokenRemaining, tokenSupply, tokenPrice }) => {
    return (
        <div className="bg-stone-700 p-6 rounded-lg">
            <div className="flex flex-col space-y-3">
                <p className="font-archivo font-bold text-xs uppercase text-white">Membership Token</p>
                {/* Token info */}
                <div className="flex flex-row space-x-6 items-center">
                    <img className="shadow-lg object-cover h-[128px] w-[128px] rounded-md" src={tokenPic} alt="" />
                    {/* The right part */}
                    <div className="flex flex-col space-y-2">
                        {/* Token name and minting info */}
                        <div className="flex flex-col space-y-2">
                            <p className="font-clashg font-semibold text-2xl text-white">{tokenName}</p>
                            {/* Minting info */}
                            <div className="flex flex-col space-y-3">
                                {/* Progress bar and tokens left */}
                                <div className="flex flex-col space-y-1">
                                    <div>
                                        <div className="flex justify-end mb-0">
                                            <span class="font-archivo font-regular text-[10px] text-stone-300">{percentMinted}% minted</span>
                                        </div>
                                        <div className=" bg-white rounded-full h-1 shadow-sm">
                                            <div className="bg-stone-400 h-1 rounded-full" style={{ width:`${percentMinted}%` }}></div>
                                        </div>
                                    </div>
                                    <p className="font-archivo font-regular text-[10px] text-stone-300">{tokenRemaining}/{tokenSupply} tokens left</p>
                                </div>
                            </div>
                        </div>
                        {/* Price and mint links */}
                        <div className="flex flex-row space-x-1 justify-end">
                            <div className="flex flex-col -space-y-1 items-end">
                                <p className="font-archivo font-semibold text-[10px] uppercase text-stone-400">price</p>
                                <div className="flex flex-row -space-x-1 justify-end -mr-1">
                                    <p className="font-archivo font-semibold text-lg text-white">{tokenPrice}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 560 400"><path d="m29 10.2c-.7-.4-1.6-.4-2.4 0l-5.6 3.3-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0l-4.3-2.6c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0l4.3 2.6c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2v-3.4c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0l-8.2 4.8c-.8.4-1.2 1.2-1.2 2v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1l-4.2 2.5c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1v-3.2l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1v-9.5c0-.8-.4-1.6-1.2-2.1z" fill="#a8a29e" fill-rule="nonzero" transform="matrix(7.04961 0 0 7.04961 145 81.9191)" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default TokenInfo