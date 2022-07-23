import React, { useEffect, useState } from 'react'
import { useWeb3Contract, useMoralisQuery } from "react-moralis";
import { contractAddress, contractAbi } from "@utils/contractDetails"
import { cidUrl } from "@utils/cidWrapper"

const ProfileCard = ({ user }) => {
    const [cid, setCid] = useState('')
    const [profile, setProfile] = useState()
    const { runContractFunction } = useWeb3Contract()

    // const { data } = useMoralisQuery("ProfileUpdated", (query) => 
    //     query.equalTo("user", user).first()
    // );
    // console.log(data)

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
        <div class="p-4 w-full md:w-1/2 lg:px-4 lg:w-1/4 font-archivo">
            {profile &&
            <article class="container overflow-hidden rounded-md shadow-lg pb-8 hover:cursor-pointer hover:shadow-xl">
                <div class="h-48 lg:h-24 overflow-hidden">
                    <img class="w-full rounded-t"
                        // src="https://bafkreiddepglttf3hs6nirp3yp7ejeqtyppveoj7btkn5ayxhj4ls7wfsq.ipfs.dweb.link/"
                        src={cidUrl(profile.backgroundImage)}
                    />
                </div>
                <div class="flex justify-center px-5 -mt-12">
                    <span clspanss="block relative h-32 w-32">
                        <img
                        // src="https://bafkreihjovs6cccvyst3qg3hgftxrjjfpzepefzni5yyywd7m3qcvryzhi.ipfs.dweb.link/"
                        src={cidUrl(profile.profileImage)}
                        class="mx-auto object-cover rounded-full h-24 w-24 bg-white p-1" 
                        />
                    </span>
                </div>
                <header class="mx-auto justify-center text-center px-2">
                    <h1 class="text-xl mt-1">
                        <div class="font-semibold" href="#">
                            {profile.name}
                        </div>
                    </h1>
                    <p className="text-sm text-gray-500">
                        {profile.username}
                    </p>
                    <div className="mt-2 px-8">
                        {profile.title}
                    </div>
                </header>
            </article>}
        </div>
  )
}

export default ProfileCard