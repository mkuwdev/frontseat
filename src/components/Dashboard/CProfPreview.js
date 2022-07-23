import React from 'react'
import dynamic from 'next/dynamic';

const CProfPreview = ({ newCProfPic, newCName, newCTitle }) => {
    return (
        <div className="items-center flex flex-row space-x-3">
            <img className="object-cover h-8 w-8 rounded-full " src={newCProfPic} alt="" />
            <div className="flex flex-col">
                <p className="font-archivo text-sm font-bold text-stone-800">{newCName}</p>
                <p className="font-archivo text-xs font-regular text-stone-600">{newCTitle}</p>
            </div>
        </div>
    )
}

export default dynamic(() => Promise.resolve(CProfPreview), { ssr: false });
