import React from 'react'
import dynamic from 'next/dynamic'


const TokenPreview = ({ tokenPic, tokenName, tokenNum, cTokProfPic, cTokDisName, cTokTitle }) => {
    return (
        <div className="items-center flex grow  flex-row space-x-4">
            <img className="object-cover h-[72px] w-[72px] rounded-lg" src={tokenPic} alt="" />
            <div className="flex flex-col grow space-y-2">
                {/* Token name and number */}
                <div className="-space-y-1">
                    <p className="font-clashg font-semibold text-lg text-stone-600">{tokenName}</p>
                    <p className="font-archivo font-regular text-[10px] text-stone-400">{tokenNum}</p>
                </div>
                {/* Creator of the token*/}
                <div className="flex flex-row space-x-2 items-center">
                    <img className="object-cover h-6 w-6 rounded-full" src={cTokProfPic} alt="" />
                    <div className="flex flex-col">
                        <p className="font-archivo text-[10px] font-semibold text-stone-600">{cTokDisName}</p>
                        <p className="font-archivo text-[10px] font-light text-stone-500">{cTokTitle}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dynamic(()=> Promise.resolve(TokenPreview), {ssr: false});
