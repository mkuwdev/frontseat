import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link'
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { useMoralis, useWeb3Contract, useMoralisQuery } from "react-moralis";
import { contractAddress, contractAbi, nftAbi } from "@utils/contractDetails"
import { getMintedAmount, getTotalEarnings, getTotalWithdrawn, getBalance, getMaxSupply, getPrice } from "@utils/membershipNFT"

const ViewCreatorDash = ({ totalPosts, totalEarnings, tokenSold }) => {
    const [isLoading, setLoading] = useState(true)
    const [membership, setMembership] = useState()
    const [tokenAddress, setTokenAddress] = useState()

    const [postCount, setPostCount] = useState()
    const [mintedAmount, setMintedAmount] = useState()
    const [totalEarned, setTotalEarned] = useState()

    const { Moralis, isWeb3Enabled } = useMoralis();
    const { runContractFunction } = useWeb3Contract()

    const membershipQuery = useMoralisQuery(
        "MembershipLaunched",
        (query) => query.equalTo("user", Moralis.account),
        [],
        { autoFetch: false }
    );

    const postCountQuery = useMoralisQuery(
        "PostAdded",
        (query) => query.equalTo("creator", Moralis.account),
        [],
        { autoFetch: false }
    );

    async function getQueries() {
        const results = await membershipQuery.fetch();
        console.log("MEMBERSHIP: ",results[0])
        setMembership(results[0]);
        const pc = await postCountQuery.fetch()
        setPostCount(pc.length)
    }

    async function updateUI() {
        setTokenAddress(membership.get("nftCollection"))
        if (tokenAddress && isLoading) {
            // Load Data from NFT Contract
            const mintedAmountRaw = await getMintedAmount(tokenAddress, runContractFunction)
            setMintedAmount(mintedAmountRaw)
            const totalEarnedRaw = await getTotalEarnings(tokenAddress, runContractFunction)
            setTotalEarned(totalEarnedRaw)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!membership) {
            getQueries(Moralis.account)
        } else {
            updateUI()
       }
    }, [isWeb3Enabled, membership])


    return (
        <div className="rounded-2xl bg-white">
            {/* Container to control spacing of items inside */}
            <div className="flex flex-col space-y-5 p-6">
                {/* Title and caption */}
                <div className="flex items-center justify-start space-x-3">
                    <div className="flex flex-col space-y-4">
                        <p className="font-clashg text-base font-medium text-stone-900">Your creator stats</p>
                        {/* Stats */}
                        <div className="flex flex-row space-x-4">
                            <div className="flex flex-col items-center">
                                <span className="font-archivo font-normal text-[10px] text-stone-500 uppercase text-center">Total Posts</span>
                                <span className="font-archivo font-semibold text-base text-stone-800">{postCount}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-archivo font-normal text-[10px] text-stone-500 uppercase text-center">Total Earnings</span>
                                <div className="flex flex-row">
                                    <span className="font-archivo font-semibold text-base text-stone-800 text-center">{totalEarned}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 560 400"><path d="m29 10.2c-.7-.4-1.6-.4-2.4 0l-5.6 3.3-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0l-4.3-2.6c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0l4.3 2.6c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2v-3.4c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0l-8.2 4.8c-.8.4-1.2 1.2-1.2 2v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1l-4.2 2.5c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1v-3.2l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1v-9.5c0-.8-.4-1.6-1.2-2.1z" fill="#a8a29e" fill-rule="nonzero" transform="matrix(7.04961 0 0 7.04961 145 81.9191)" /></svg>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-archivo font-normal text-[10px] text-stone-500 uppercase text-center">Tokens Minted</span>
                                <span className="font-archivo font-semibold text-base text-stone-800 text-center">{mintedAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Get started link and divider */}
                <Link href="/creatordashboard">
                    <div className="flex flex-row items-center content-center justify-center space-x-2 pt-4 border-t-2 border-t-stone-100 hover: cursor-pointer">
                        <p className="font-archivo text-sm font-semibold align-middle text-stone-900">View creator dashboard</p>
                        <div className="">
                            <ArrowSmRightIcon className="text-stone-900 h-4 w-4"></ArrowSmRightIcon>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ViewCreatorDash