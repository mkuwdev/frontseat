import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UploadIcon } from '@heroicons/react/outline'
import { useMoralis, useWeb3Contract, useMoralisWeb3Api } from "react-moralis";
import LitJsSdk from 'lit-js-sdk'
import { contractAddress, contractAbi } from "@api/contractDetails"
import { uploadToWeb3 } from "@utils/web3Storage"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddPost = ({ isOpen, closeModal }) => {

    const [imgDisplay, setImgDisplay] = useState()

    const [title, setTitle] = useState('')
    const [img, setImg] = useState([])
    const [content, setContent] = useState('')

    const { runContractFunction } = useWeb3Contract()
    const { Moralis } = useMoralis();
    const client = new LitJsSdk.LitNodeClient()

    let id

    const onImgChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImgDisplay(URL.createObjectURL(file))
            setImg(file)
        }
    }

    async function getCreatorProfile(address) {

        const getCreatorProfileOptions = {
            abi: contractAbi,
            contractAddress: contractAddress,
            functionName: "getCreatorProfile",
            params: { _creator: address }
        }
  
        const data = await runContractFunction({
            params: getCreatorProfileOptions,
            onSuccess: (data) => {
                console.log("Success")
            },
            onError: (error) => {
                console.log(error)
            },
        })
  
        return data
    }
  
    async function getPost(address, id) {
  
      const getPostOptions = {
          abi: contractAbi,
          contractAddress: contractAddress,
          functionName: "getPost",
          params: { 
            _creator: address,
            _postId: id
          }
      }
  
      const data = await runContractFunction({
          params: getPostOptions,
          onSuccess: (data) => {
              console.log("Success")
          },
          onError: (error) => {
              console.log(error)
          },
      })
  
      return data
  }
  
    async function encrypt(message) {
        
        const client = new LitJsSdk.LitNodeClient()
        const chain = 'mumbai'

        const creatorAccount = await Moralis.account
        console.log("Creator Account: ", creatorAccount)
        const creatorProfile = await getCreatorProfile(creatorAccount)
        const membershipNft = String(creatorProfile[0])
        console.log("Membership NFT", membershipNft)

        const accessControlConditions = [
            {
            contractAddress: membershipNft,
            standardContractType: 'ERC721',
            chain,
            method: 'balanceOf',
            parameters: [
                ':userAddress'
            ],
            returnValueTest: {
                comparator: '>',
                value: '0'
            }
            }
        ]

        if (!client.litNodeClient) {
        await client.connect()
        }
    
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message)
    
        const encryptedSymmetricKey = await client.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain,
        })

        console.log("Encrypted String: ", encryptedString)
        console.log("Encrypted Symmetric Key: ", LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"))
        const encryptedKey = LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
        console.log("KEY: ", encryptedKey)

        // setKey(LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"))

        // Upload Blob of encryptedString to ipfs
        const files = [new File([encryptedString], 'encrypted')]

        const cid = await uploadToWeb3(files)
        
        console.log(`https://${cid}.ipfs.dweb.link/`)

        toast.update(id, { 
            render: "Successfully uploaded files to IPFS", 
            type: "success", 
            isLoading: false, 
            autoClose: 3000 
        });

        const newPostOptions = {
        abi: contractAbi,
        contractAddress: contractAddress,
        functionName: "addPost",
        params: {
            _contentCid: cid,
            _key: encryptedKey
        },
    }

    id = toast.loading("Adding post")
    
    await runContractFunction({
        params: newPostOptions,
        onSuccess: (data) => {
            console.log("SUCCESS")
            console.log(data)
            toast.update(id, { 
                render: "Added post successfully", 
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
  
    async function onDecrypt(e) {
    e.preventDefault()

    const client = new LitJsSdk.LitNodeClient()
    const chain = 'mumbai'

    const creatorAccount = "0xaC29f0Df1D30369462efB3954552803ae3FC8366"
    console.log("Creator Account: ", creatorAccount)
    const creatorProfile = await getCreatorProfile(creatorAccount)
    const membershipNft = String(creatorProfile[0])
    console.log("Membership NFT", membershipNft)

        const accessControlConditions = [
            {
            contractAddress: membershipNft,
            standardContractType: 'ERC721',
            chain,
            method: 'balanceOf',
            parameters: [
                ':userAddress'
            ],
            returnValueTest: {
                comparator: '>',
                value: '0'
            }
            }
        ]

        e.preventDefault();
        console.log("DECRYPTING")

        if (!client.litNodeClient) {
            await client.connect()
        }

        const postData = await getPost(creatorAccount, 8)
        const contractCid = postData[1]
        const contractKey = postData[3]
        console.log("KEY FROM CONTRACT", contractKey)
    
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        const symmetricKey = await client.getEncryptionKey({
            accessControlConditions,
            toDecrypt: contractKey,
            chain,
            authSig
        })

        const URL = "https://" + contractCid + ".ipfs.dweb.link/"
        
        console.log("FETCHING BLOBB")
        const res = await fetch(URL)
        const encryptedBlob = await res.blob()
        console.log(encryptedBlob)
        console.log("FETCHED BLOB SUCCESS")
        
        console.log("Feeding into decryptor..")
        const decryptedString = await LitJsSdk.decryptString(
            encryptedBlob,
            symmetricKey
        );
    
        console.log(decryptedString)
        const decrypted = JSON.parse(decryptedString)
        console.log(decrypted.title)
        console.log(decrypted.image)
        console.log(decrypted.content)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        id = toast.loading("Encrypting and storing files to IPFS")
        const imgCid = await uploadToWeb3([img])
        const newPost = {
            title: title,
            image: imgCid,
            content: content
        }

        const sampleJSON = JSON.stringify(newPost)

        console.log(sampleJSON);
        encrypt(sampleJSON)
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto font-archivo">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-2xl mb-4 font-semibold leading-6 text-gray-900"
                    >
                        Add Post
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            {/* <label htmlFor="nftname" className="block text-xl font-semibold text-gray-700">
                                Title
                            </label> */}
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="focus:ring-black focus:border-black flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Enter post title.."
                                />
                            </div>
                        </div>
                        <div className="w-full max-w-xl mb-4 mx-auto">
                        {imgDisplay ?
                            (<>
                                <div className="mt-1 mb-1 rounded-md flex justify-center w-full">
                                    <img className="rounded-md" src={imgDisplay}/>
                                </div>
                            </>) :
                            (<>
                                <div className="mt-1 mb-1 py-24 flex justify-center items-center w-full border-2 border-gray-300 border-dashed rounded-md">
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
                                <input id="nftimg" name="nftimg" type="file" className="sr-only" onChange={onImgChange}/>
                            </label>
                        </div>
                        </div>
                        <div className="mb-4">
                            {/* <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
                                Description
                            </label> */}
                            <div className="mt-1">
                                <textarea
                                    id="content"
                                    name="content"
                                    rows={5}
                                    className="shadow-sm focus:ring-black focus:border-black mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    onChange={e => setContent(e.target.value)}
                                    placeholder="Enter content here.."
                                />
                            </div>
                        </div>
                        <div className="flex align-end">
                            <button
                                type="submit" 
                                className="ml-auto bg-black transition ease-in-out  hover:scale-105 text-white font-bold py-2 px-4 rounded">
                                Publish
                            </button>
                        </div>
                    </form>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>            
        </Transition>
    );
};
