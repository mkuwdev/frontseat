import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ArrowSmRightIcon } from '@heroicons/react/outline'
import { uriConverter } from "@utils/uriConverter";
import { useMoralis, useWeb3Contract, useMoralisQuery } from "react-moralis";
import { contractAddress, contractAbi, nftAbi } from "@utils/contractDetails"
import { ethers } from "ethers" 
import { getMintedAmount, getTotalEarnings, getTotalWithdrawn, getBalance, getMaxSupply, getPrice } from "@utils/membershipNFT"

const TokenMinting = ({ tokenName, tokenPic, percentMinted, tokenRemaining, tokenSupply, tokenPrice ,mintLink, selfProfile }) => {

    const [isLoading, setLoading] = useState(true)
    const [membership, setMembership] = useState()
    const [tokenAddress, setTokenAddress] = useState()
    const [tokenUrl, setTokenUrl] = useState()
    const [nftPic, setNftPic] = useState()
    const [nftName, setNftName] = useState()

    const [mintedAmount, setMintedAmount] = useState()
    const [maxSupply, setMaxSupply] = useState()
    const [price, setPrice] = useState()
    // const [price, setPrice] = useState()

    const { query: { id } } = useRouter()

    const { Moralis, isWeb3Enabled } = useMoralis();
    const { runContractFunction } = useWeb3Contract()

    const membershipQuery = useMoralisQuery(
        "MembershipLaunched",
        (query) => query.equalTo("user", id),
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
        if (tokenUrl) {
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
            const maxSupplyRaw = await getMaxSupply(tokenAddress, runContractFunction)
            setMaxSupply(maxSupplyRaw)
            const priceRaw = await getPrice(tokenAddress, runContractFunction)
            setPrice(priceRaw)
            // const progressRaw = Math.round((mintedAmount/maxSupply)*100*10)/10
            // setProgress(progressRaw)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!membership) {
            getMembership(id)
        } else {
            updateUI()
       }
    }, [isWeb3Enabled, membership])

    async function mintNft() {
        const mintOptions = {
            abi: nftAbi,
            contractAddress: tokenAddress,
            functionName: "mint",
            msgValue: ethers.utils.parseEther(price)
        }
    
        const data = await runContractFunction({
            params: mintOptions,
            onSuccess: (data) => {
                console.log("Minted")
            },
            onError: (error) => {
                console.log(error)
            },
        })
    }

    return (
        <div className="bg-stone-700/80 p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col space-y-4">
                <p className="font-archivo font-bold text-xs uppercase text-white">Membership Token</p>
                {/* Token info */}
                {membership && !isLoading &&
                <div className="flex flex-row space-x-9">
                    <img className="shadow-lg object-cover h-[134px] w-[134px] rounded-lg" src={nftPic} alt="" />
                    {/* The right part */}
                    <div className="flex flex-col space-y-5">
                        {/* Token name and minting info */}
                        <div className="flex flex-col">
                            <p className="font-clashg font-semibold text-3xl text-white">{nftName}</p>
                            {/* Minting info */}
                            <div className="flex flex-col space-y-4">
                                {/* Progress bar and tokens left */}
                                <div className="flex flex-col space-y-2">
                                    <div>
                                        <div className="flex justify-end mb-0">
                                            <span class="font-archivo font-regular text-[10px] text-stone-300">{Math.round((mintedAmount/maxSupply)*100*10)/10}% minted</span>
                                        </div>
                                        <div className=" bg-white rounded-full h-2 shadow-sm">
                                            <div className="bg-stone-400 h-2 rounded-full" style={{ width:`${Math.round((mintedAmount/maxSupply)*100*10)/10}%` }}></div>
                                        </div>
                                    </div>
                                    <p className="font-archivo font-regular text-[10px] text-stone-300">{maxSupply - mintedAmount}/{maxSupply} tokens left</p>
                                </div>
                            </div>
                        </div>
                        {/* Price and mint links */}
                        <div className="flex flex-row space-x-1 items-end">
                            <div className="flex flex-col">
                                <p className="font-archivo font-semibold text-[10px] uppercase text-stone-400">price</p>
                                <div className="flex flex-row -space-x-1">
                                    <p className="font-archivo font-semibold text-lg text-white">{price}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 560 400"><path d="m29 10.2c-.7-.4-1.6-.4-2.4 0l-5.6 3.3-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0l-4.3-2.6c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0l4.3 2.6c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2v-3.4c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0l-8.2 4.8c-.8.4-1.2 1.2-1.2 2v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1l-4.2 2.5c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1v-3.2l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1v-9.5c0-.8-.4-1.6-1.2-2.1z" fill="#a8a29e" fill-rule="nonzero" transform="matrix(7.04961 0 0 7.04961 145 81.9191)" /></svg>
                                </div>
                            </div>
                            {!selfProfile &&
                                <div className="flex flex-col items-end">
                                    <button type="button" className="text-white bg-stone-800 hover:bg-black hover:shadow-lg  focus:ring-4 focus:ring-stone-300 rounded-lg px-2 py-1" onClick={mintNft}>
                                        <div className="flex flex-row space-x-2 justify-end items-center hover:cursor-pointer m-1">
                                            <p className="font-archivo font-semibold text-xs text-white">Mint now</p>
                                            <ArrowSmRightIcon className="h-3 w-3 text-white" />
                                        </div>
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>

    )
}

export default TokenMinting