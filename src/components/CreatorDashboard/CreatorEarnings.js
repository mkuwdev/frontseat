import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link'
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { useMoralis, useWeb3Contract, useMoralisQuery } from "react-moralis";
import { contractAddress, contractAbi, nftAbi } from "@utils/contractDetails"
import TokenInfo from './TokenInfo';
import { ethers } from "ethers" 
import { uriConverter } from "@utils/uriConverter";
import { getMintedAmount, getTotalEarnings, getTotalWithdrawn, getBalance, getMaxSupply, getPrice } from "@utils/membershipNFT"

const CreatorEarnings = () => {
    const [isLoading, setLoading] = useState(true)
    const [membership, setMembership] = useState()
    const [tokenAddress, setTokenAddress] = useState()
    const [tokenUrl, setTokenUrl] = useState()
    const [info, setInfo] = useState()
    const [nftPic, setNftPic] = useState()
    const [nftName, setNftName] = useState()

    const [mintedAmount, setMintedAmount] = useState()
    const [totalEarned, setTotalEarned] = useState()
    const [totalWithdrawn, setTotalWithdrawn] = useState()
    const [balance, setBalance] = useState()
    const [maxSupply, setMaxSupply] = useState()
    const [price, setPrice] = useState()
    // const [price, setPrice] = useState()

    const { Moralis, isWeb3Enabled } = useMoralis();
    const { runContractFunction } = useWeb3Contract()

    const membershipQuery = useMoralisQuery(
        "MembershipLaunched",
        (query) => query.equalTo("user", Moralis.account),
        [],
        { autoFetch: false }
    );

    async function getMembership() {
        const results = await membershipQuery.fetch();
        console.log("MEMBERSHIP: ",results[0])
        setMembership(results[0]);
    }

    async function updateUI() {
        setTokenAddress(membership.get("nftCollection"))
        setTokenUrl(membership.get("contentUri"))
        console.log("Token addy: ", tokenAddress)
        if (tokenUrl && !info) {
            // Load Name and Image from IPFS URI of NFT
            const requestURL = uriConverter(tokenUrl)
            console.log("REQURL ", requestURL)
            const tokenURIResponse = await (await fetch(requestURL)).json()
            console.log("tokenURIResponse ", tokenURIResponse)
            const imageURI = tokenURIResponse.image
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            setNftPic(imageURIURL)
            setNftName(tokenURIResponse.name)
        }
        if (tokenAddress && isLoading) {
            // Load Data from NFT Contract
            const mintedAmountRaw = await getMintedAmount(tokenAddress, runContractFunction)
            setMintedAmount(mintedAmountRaw)
            const totalEarnedRaw = await getTotalEarnings(tokenAddress, runContractFunction)
            setTotalEarned(totalEarnedRaw)
            const totalWithdrawnRaw = await getTotalWithdrawn(tokenAddress, runContractFunction)
            setTotalWithdrawn(totalWithdrawnRaw)
            const balanceRaw = await getBalance(tokenAddress, runContractFunction)
            setBalance(balanceRaw)
            const maxSupplyRaw = await getMaxSupply(tokenAddress, runContractFunction)
            setMaxSupply(maxSupplyRaw)
            const priceRaw = await getPrice(tokenAddress, runContractFunction)
            setPrice(priceRaw)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!membership) {
            getMembership(Moralis.account)
        } else {
            updateUI()
       }
    }, [isWeb3Enabled, membership, info])
    

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
                        {membership && !isLoading &&
                        <div className="container flex flex-col space-y-6">
                            <TokenInfo
                                tokenName={nftName}
                                tokenPic={nftPic}
                                percentMinted={Math.round((mintedAmount/maxSupply)*100*10)/10}
                                tokenRemaining={maxSupply - mintedAmount}
                                tokenSupply={maxSupply}
                                tokenPrice={price}
                            />
                            {/* Stats first row*/}
                            <div className="flex flex-row space-x-4 justify-start">
                                <div className="flex flex-col">
                                    <span className="font-archivo font-normal text-[10px] text-stone-500 uppercase text-center">Tokens sold</span>
                                    <span className="font-archivo font-semibold text-base text-stone-800">{mintedAmount}</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-archivo font-normal text-[10px] text-stone-500 uppercase text-center">Total Earnings</span>
                                    <div className="flex flex-row">
                                        <span className="font-archivo font-semibold text-base text-stone-800 text-center">{totalEarned}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 560 400"><path d="m29 10.2c-.7-.4-1.6-.4-2.4 0l-5.6 3.3-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0l-4.3-2.6c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0l4.3 2.6c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2v-3.4c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0l-8.2 4.8c-.8.4-1.2 1.2-1.2 2v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1l-4.2 2.5c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1v-3.2l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1v-9.5c0-.8-.4-1.6-1.2-2.1z" fill="#a8a29e" fill-rule="nonzero" transform="matrix(7.04961 0 0 7.04961 145 81.9191)" /></svg>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-archivo font-normal text-[10px] text-stone-500 uppercase text-center">Amt. withdrawn</span>
                                    <span className="font-archivo font-semibold text-base text-stone-800 text-center">{totalWithdrawn}</span>
                                </div>
                            </div>
                            {/* Stats second row*/}
                            <div className="flex flex-row space-x-4 justify-between">
                                <div className="flex flex-col">
                                    <span className="font-archivo font-normal text-[10px] text-stone-500 uppercase text-center">Amt. remaining</span>
                                    <span className="font-archivo font-semibold text-base text-stone-800">{balance}</span>
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
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dynamic(() => Promise.resolve(CreatorEarnings), { ssr: false });
