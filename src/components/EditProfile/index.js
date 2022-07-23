import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronDoubleLeftIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useWeb3Contract } from "react-moralis";
import { contractAddress, contractAbi } from "@api/contractDetails"
import { uploadToWeb3 } from "@utils/web3Storage"
import { makeFileObjects } from "@utils/makeFileObjects"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {

    const [profileImgDisplay, setProfileImgDisplay] = useState()
    const [bgImgDisplay, setBgImgDisplay] = useState()

    const [profileImg, setProfileImg] = useState([])
    const [bgImg, setBgImg] = useState([])
    const [displayName, setDisplayName] = useState('')
    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('')
    const [bio, setBio] = useState('')
    const [web, setWeb] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')

    const { runContractFunction } = useWeb3Contract()
    const router = useRouter()

    const onProfilePictureChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfileImgDisplay(URL.createObjectURL(file))
            setProfileImg(file)
        }
    };

    const onBgPictureChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setBgImgDisplay(URL.createObjectURL(file))
            setBgImg(file) 
        }
    }

    async function updateProfile(newCid) {
        console.log("Updating Profile")

        const id = toast.loading("Writing changes to the contract")
    
        const updateProfileOptions = {
          abi: contractAbi,
          contractAddress: contractAddress,
          functionName: "updateProfile",
          params: {
              _contentCid: newCid,
          },
        }
    
        await runContractFunction({
            params: updateProfileOptions,
            onSuccess: (data) => {
                console.log("SUCCESS")
                console.log(data)
                toast.update(id, { 
                    render: "Changes Saved", 
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

        const id = toast.loading("Uploading new profile to IPFS")

        const profileImgCid = await uploadToWeb3([profileImg])
        const bgImgCid = await uploadToWeb3([bgImg])

        const newProfile = {
            profileImage: profileImgCid,
            backgroundImage: bgImgCid,
            name: displayName,
            username: username,
            title: title,
            bio: bio,
            website: web,
            twitter: twitter,
            instagram: instagram
        }

        console.log(newProfile)
        const profileCid = await uploadToWeb3(makeFileObjects(newProfile))

        toast.update(id, { 
            render: "Successfully uploaded files to IPFS", 
            type: "success", 
            isLoading: false, 
            autoClose: 3000 
        });

        updateProfile(profileCid)
    }

    return (
        <div className="px-2 py-2 sm:px-6 lg:px-8">
            <button 
                type="button" 
                className="flex items-center my-8 px-4 sm:px-0"
                onClick={() => router.back()}
            >
                <ChevronDoubleLeftIcon className="h-4 w-4"/>
                <span className="ml-1 font-medium font-clashg">Back to Profile</span>
            </button>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6 mb-10">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                    <h3 className="text-3xl font-semibold font-clashg leading-6 text-gray-900">
                        Edit Profile
                    </h3>
                    <p className="mt-2 text-md font-archivo text-gray-600">
                        Customize your profile and let others know who you are!
                    </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2 font-archivo">
                    <form onSubmit={handleSubmit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        {/* Profile Picture */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Profile Picture
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                    { profileImgDisplay ?
                                                        (<Image src={profileImgDisplay} height="48px" width="48px"/>) :
                                                        (
                                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                        )
                                                    }
                                                </span>
                                                <label
                                                    htmlFor="profileupload"
                                                    className="relative"
                                                >
                                                    <div className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 hover:cursor-pointer">
                                                        Upload
                                                    </div>
                                                    <input id="profileupload" name="profileupload" type="file" className="sr-only"  onChange={onProfilePictureChange} required/>
                                                </label>
                                            </div>
                                        </div>
                                        {/* Background Cover */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Background Cover
                                            </label>
                                            {bgImgDisplay ?
                                                (<>
                                                    <div className="mt-1 mb-3 rounded-md flex justify-center max-w-sm">
                                                        <img className="rounded-md" src={bgImgDisplay}/>
                                                    </div>
                                                </>) :
                                                (<>
                                                    <div className="mt-1 mb-3 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                                            <label
                                                htmlFor="backgroundupload"
                                                className="cursor-pointer bg-white rounded-md font-semibold"
                                            >
                                                <div className="py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:cursor-pointer">
                                                    <div className="mx-auto">Upload</div>
                                                </div>
                                                <input id="backgroundupload" name="backgroundupload" type="file" className="sr-only" onChange={onBgPictureChange} required/>
                                            </label>
                                        </div>
                                        {/* Profile Details */}
                                        <div className="text-2xl font-semibold mb-4">
                                            Profile Details
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="displayname" className="block text-sm font-semibold text-gray-700">
                                                Display Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="displayname"
                                                    id="displayname"
                                                    className="focus:ring-black focus:border-black flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                    onChange={e => setDisplayName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                                                Username
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    className="focus:ring-black focus:border-black flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                    onChange={e => setUsername(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                                                Title
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    className="focus:ring-black focus:border-black flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                    onChange={e => setTitle(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">
                                                Bio
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    id="bio"
                                                    name="bio"
                                                    rows={4}
                                                    className="shadow-sm focus:ring-black focus:border-black mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    onChange={e => setBio(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {/* Social Links */}
                                        <div className="text-lg font-medium mb-2">
                                            Social Links
                                        </div>
                                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                            Website
                                        </label>
                                        <div className="mt-1 mb-2 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                https://
                                            </span>
                                            <input
                                                type="text"
                                                name="website"
                                                id="website"
                                                className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                onChange={e => setWeb(e.target.value)}
                                            />
                                        </div>
                                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                                            Twitter
                                        </label>
                                        <div className="mt-1 mb-2 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                @
                                            </span>
                                            <input
                                                type="text"
                                                name="twitter"
                                                id="twitter"
                                                className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                onChange={e => setTwitter(e.target.value)}
                                            />
                                        </div>
                                        <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                                            Instagram
                                        </label>
                                        <div className="mt-1 mb-2 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                @
                                            </span>
                                            <input
                                                type="text"
                                                name="instagram"
                                                id="instagram"
                                                className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                onChange={e => setInstagram(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-black shadow-sm text-sm font-medium rounded-md hover:bg-gray-200"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
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

export default EditProfile