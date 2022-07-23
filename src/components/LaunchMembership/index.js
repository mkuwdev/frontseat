import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronDoubleLeftIcon, UploadIcon } from '@heroicons/react/outline'
import { ParentGrid, GridSix } from '@components/GridLayout'
import { useWeb3Contract } from "react-moralis";
import { contractAddress, contractAbi } from "@api/contractDetails"
import { uploadToWeb3 } from "@utils/web3Storage"
import { uploadNFT } from "@utils/nftStorage"
import { makeFileObjects } from "@utils/makeFileObjects"
import { useMoralis } from "react-moralis";
import { ethers } from "ethers"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LaunchMembership = () => {

    const [nftImgDisplay, setNftImgDisplay] = useState()

    const [nftImg, setNftImg] = useState([])
    const [nftName, setNftName] = useState('')
    const [tokenName, setTokenName] = useState('')
    const [description, setDescription] = useState('')
    const [supply, setSupply] = useState()
    const [price, setPrice] = useState()
    const [royalty, setRoyalty] = useState()
 
    const router = useRouter()
    const { Moralis } = useMoralis();
    const { runContractFunction } = useWeb3Contract()

    const onNftImgChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setNftImgDisplay(URL.createObjectURL(file))
            setNftImg(file)
        }
    }

    async function launchCollection(tokenURI, contractURL, royaltyBPS) {

        console.log("Writing to contract")
        const id = toast.loading("Initializing Membership Collection")

        const launchMembershipOptions = {
            abi: contractAbi,
            contractAddress: contractAddress,
            functionName: "launchMembershipNft",
            params: {
                _name: nftName,
                _symbol: tokenName,
                _nftUri: tokenURI,
                _collectionUri: contractURL,
                _supply: supply,
                _price: ethers.utils.parseEther(price || "0"),
                _royalty: royaltyBPS,
            },
        }

        await runContractFunction({
            params: launchMembershipOptions,
            onSuccess: (data) => {
                console.log("SUCCESS")
                console.log(data)
                toast.update(id, { 
                    render: "Membership Launched", 
                    type: "success", 
                    isLoading: false, 
                    autoClose: 3000 
                });
            },
            onError: (error) => {
                console.log(error)
                toast.update(id, { 
                    render: "An error has occured", 
                    type: "error", 
                    isLoading: false, 
                    autoClose: 3000 
                });
            },
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const id = toast.loading("Uploading files to IPFS")

        const royaltyBPS = royalty * 100

        const tokenURI = await uploadNFT(nftName, nftImg, description)

        const creatorAddress = await Moralis.account
        const osMetadata = {
            name: nftName.concat(" Collection"),
            description: description,
            seller_fee_basis_points: royaltyBPS,
            fee_recipient: creatorAddress
        }

        console.log(osMetadata)
        const collectionCid = await uploadToWeb3(makeFileObjects(osMetadata))

        toast.update(id, { 
            render: "Successfully uploaded files to IPFS", 
            type: "success", 
            isLoading: false, 
            autoClose: 3000 
        });

        const contractURL = "https://" + collectionCid + ".ipfs.dweb.link"
        console.log("tokenURI: ", tokenURI)
        console.log("contractURL: ", contractURL)

        /// Update smart contract
        launchCollection(tokenURI, contractURL, royaltyBPS)
    }   

    return (
        <div>
            <button 
                type="button" 
                className="flex items-center my-8 px-4 sm:px-0"
                onClick={() => router.back()}
            >
                <ChevronDoubleLeftIcon className="h-4 w-4"/>
                <span className="ml-1 font-medium font-clashg">Back</span>
            </button>
            <div className="px-4 sm:px-0 mb-8">
                <h3 className="text-3xl font-semibold font-clashg leading-6 text-gray-900">
                    Launch Membership Token
                </h3>
                <p className="mt-2 text-md font-archivo text-gray-600 max-w-3xl">
                    Create a limited edition NFT collection for your fans to gain exclusive access to your content! Set royalties
                    to gain continuous earnings from secondary sales!
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <div className="mx-auto mb-8 px-4 py-5 bg-white sm:p-6 max-w-3xl shadow rounded-md sm:overflow-hidden font-archivo">
                        <ParentGrid>
                            <GridSix>
                            <label className="block text-xl font-semibold text-gray-700 mb-3">
                                NFT Details
                            </label>
                            {nftImgDisplay ?
                                    (<>
                                        <div className="mt-1 mb-1 rounded-md flex justify-center w-full aspect-square">
                                            <img className="rounded-md" src={nftImgDisplay}/>
                                        </div>
                                    </>) :
                                    (<>
                                        <div className="mt-1 mb-1 flex justify-center items-center border-2 border-gray-300 border-dashed rounded-md aspect-square">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                </svg>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </>)
                                }                                            
                                <div className="flex">
                                    <label htmlFor="nftimg" className="ml-auto hover:cursor-pointer">
                                        <div className="inline-flex items-center text-stone-500 hover:text-black">
                                            <UploadIcon className="h-4 w-4 mr-2"/>
                                            <span className="font-semibold text-sm">Upload</span>
                                        </div>
                                        <input id="nftimg" name="nftimg" type="file" className="sr-only" onChange={onNftImgChange}/>
                                    </label>
                                </div>
                            </GridSix>
                            <GridSix className="pt-8">
                                <div className="mb-4">
                                    <label htmlFor="nftname" className="block text-sm font-semibold text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="nftname"
                                            id="nftname"
                                            className="focus:ring-black focus:border-black flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                            onChange={e => setNftName(e.target.value)}
                                            placeholder="Membership Name"
                                        />
                                    </div>
                                </div>
                                <ParentGrid>
                                    <GridSix>
                                        <div className="mb-4">
                                            <label htmlFor="tokenname" className="block text-sm font-semibold text-gray-700">
                                                Token Identifier
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="tokenname"
                                                    id="tokenname"
                                                    className="focus:ring-black focus:border-black flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                    onChange={e => setTokenName(e.target.value)}
                                                    placeholder="TOKEN"
                                                />
                                            </div>
                                        </div>
                                    </GridSix>
                                    <GridSix>
                                        <div className="mb-4">
                                            <label htmlFor="supply" className="block text-sm font-semibold text-gray-700">
                                                Supply
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="number"
                                                    name="supply"
                                                    id="supply"
                                                    className="focus:ring-black focus:border-black flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                    onChange={e => setSupply(e.target.value)}
                                                    placeholder={5000}
                                                />
                                            </div>
                                        </div>
                                    </GridSix>
                                </ParentGrid>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                                        Description
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={5}
                                            className="shadow-sm focus:ring-black focus:border-black mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                            onChange={e => setDescription(e.target.value)}
                                            placeholder="Enter description here.."
                                        />
                                    </div>
                                </div>
                                <ParentGrid>
                                    <GridSix>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                            Price (MATIC)
                                        </label>
                                        <div className="mt-1 mb-2 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                <img src="/matic.png" className="h-3 w-3"/>
                                            </span>
                                            <input
                                                type="number"
                                                name="price"
                                                id="price"
                                                className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                onChange={e => setPrice(e.target.value)}
                                                placeholder={10}
                                                step="any"
                                            />
                                        </div>
                                    </GridSix>
                                    <GridSix>
                                        <label htmlFor="royalty" className="block text-sm font-medium text-gray-700">
                                            Royalty
                                        </label>
                                        <div className="mt-1 mb-2 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                %
                                            </span>
                                            <input
                                                type="number"
                                                name="royalty"
                                                id="royalty"
                                                className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                onChange={e => setRoyalty(e.target.value)}
                                                placeholder={5}
                                                step="any"
                                            />
                                        </div>
                                    </GridSix>
                                </ParentGrid>
                            </GridSix>
                        </ParentGrid>
                        <div className="mt-3 border-t-2">
                            <p className="font-normal mt-1 mb-7 text-xs text-stone-500">* A service fee of 2.5% will be charged from the initial mint</p>
                            <div className="flex align-center">
                                <button
                                    type="submit" 
                                    className="mx-auto bg-black transition ease-in-out  hover:scale-105 text-white font-bold py-2 px-4 rounded">
                                    Launch Membership NFT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default LaunchMembership