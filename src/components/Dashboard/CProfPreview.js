import React, { useEffect, useState } from 'react'
import { useWeb3Contract } from "react-moralis";
import dynamic from 'next/dynamic';
import { contractAddress, contractAbi } from "@utils/contractDetails"
import { cidUrl } from "@utils/cidWrapper"

const CProfPreview = ({ user }) => {
    const [cid, setCid] = useState('')
    const [profile, setProfile] = useState()
    const { runContractFunction } = useWeb3Contract()

    async function getProfile(address) {
        const getProfileOptions = {
            abi: contractAbi,
            contractAddress: contractAddress,
            functionName: "getProfile",
            params: { _user: address }
        }
  
        const data = await runContractFunction({
            params: getProfileOptions,
            onSuccess: (data) => {
                console.log("Success")
                setCid(data.personalDetailCid)
                console.log(data)
                console.log(cid)
            },
            onError: (error) => {
                console.log(error)
            },
        })
  
        return data
    }

    useEffect(() => {
        // setLoading(true)
        if (!cid) {
            getProfile(user)
        } else {
            console.log(cidUrl(cid))
            if (!profile) {
                fetch(cidUrl(cid))
                .then((res) => res.json())
                .then((data) => {
                    setProfile(data)
                })
            }
        }
    }, [cid, profile])

    return (
        <div className="items-center flex flex-row space-x-3">
            {profile &&
            <>
                <img className="object-cover h-8 w-8 rounded-full " src={cidUrl(profile.profileImage)} alt="" />
                <div className="flex flex-col">
                    <p className="font-archivo text-sm font-bold text-stone-800">{profile.name}</p>
                    <p className="font-archivo text-xs font-regular text-stone-600">{profile.title}</p>
                </div>
            </>
            }
        </div>
    )
}

export default dynamic(() => Promise.resolve(CProfPreview), { ssr: false });
