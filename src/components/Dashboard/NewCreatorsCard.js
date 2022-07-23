import React, { useState, useEffect } from 'react'
import { useMoralisQuery } from "react-moralis";
import dynamic from 'next/dynamic';
import Link from 'next/link'
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import CProfPreview from './CProfPreview';

const NewCreatorsCard = () => {

    const [creators, setCreators] = useState([])  

    const { fetch } = useMoralisQuery(
        "MembershipLaunched",
        (query) => query.exists("confirmed"),
        [],
        { autoFetch: false }
    );

    useEffect(() => {
    const creatorsQuery = async () => {
        const results = await fetch();
        const creatorList = JSON.parse(JSON.stringify(results, ["user"]))
        setCreators(creatorList);
        console.log(creators);
    };
    creatorsQuery();
    }, [])

    // CProfPreview will fetch props (newCProfPic, newCName, newCTitle)
    return (
        <div className="rounded-2xl bg-white">
            {/* Container to control spacing of items inside */}
            <div className="flex flex-col space-y-5 p-6">
                {/* Container fill the entirety of the content inside */}
                <div className="flex items-center justify-start space-x-3">
                    {/* Control spacing between the title and profiles */}
                    <div className="flex flex-col space-y-4">
                        <p className="font-clashg text-base font-medium text-stone-900">New Creators</p>
                        {/* Invisible container to store new creator profiles and control spacing */}
                        <div className="container flex flex-col space-y-3">
                            {/* <CProfPreview
                                newCProfPic="https://akcdn.detik.net.id/visual/2022/06/16/ryan-gosling-dalam-film-barbie-2023_169.jpeg?w=650"
                                newCName="Ryan Gosling"
                                newCTitle="Actor"
                            />
                            <CProfPreview
                                newCProfPic="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2022%2F06%2F21%2FBrad-Pitt_1-2000.jpg"
                                newCName="Brad Pitt"
                                newCTitle="Actor"
                            />
                            <CProfPreview
                                newCProfPic="https://s3.r29static.com/bin/entry/736/0,153,2000,1500/x,80/1580069/image.jpg"
                                newCName="Leonardo Dicaprio"
                                newCTitle="Actor"
                            /> */}
                            {creators.map((item) => (
                                <CProfPreview user={item.user}/>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Explore creators link and divider */}
                <Link href="/explore">
                    <div className="flex flex-row items-center content-center justify-center space-x-2 border-t-2 border-t-stone-100 pt-4 hover: cursor-pointer">
                        <p className="font-archivo text-sm font-semibold align-middle">Explore creators</p>
                        <div className="">
                            <ArrowSmRightIcon className="text-stone-900 h-4 w-4"></ArrowSmRightIcon>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default dynamic(() => Promise.resolve(NewCreatorsCard), { ssr: false });