import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { PencilAltIcon, ArrowSmRightIcon } from '@heroicons/react/outline'
import { useMoralis, useWeb3Contract } from "react-moralis";
import { contractAddress, contractAbi } from "@utils/contractDetails"
import { cidUrl } from "@utils/cidWrapper"


const CreatorProfile = ({ profPic, disName }) => {
  const { Moralis } = useMoralis();
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
              // console.log(data)
              // console.log(cid)
          },
          onError: (error) => {
              console.log(error)
          },
      })

      return data
  }

  useEffect(() => {
      if (!cid) {
          getProfile(Moralis.account)
      } else {
          // console.log(cidUrl(cid))
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
    <div className="rounded-2xl bg-white">
      {/* Container to control spacing of items inside */}
      {profile &&
        <div className="flex flex-col space-y-5 px-6 py-6">
        {/* Profile pic and user name and wallet */}
        <div className="flex items-center justify-center space-x-3">
          <div className="flex flex-col space-y-4">
            {/* Profile Pic */}
            <div className="flex justify-center">
              <img className="object-cover h-14 w-14 rounded-full" src={cidUrl(profile.profileImage)} alt="" />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-clashg text-base font-medium text-center text-stone-900">{profile.name}</p>
              <p className="font-archivo text-xs font-normal leading-loose text-center text-stone-500">{profile.title}</p>
            </div>
            <Link href={`/profile/${Moralis.account}`}>
              <button type="button" className="text-white bg-stone-700 hover:bg-stone-900 hover:shadow-lg  focus:ring-4 focus:ring-stone-300 rounded-lg px-2 py-1">
                <div className="flex flex-row space-x-2 justify-end items-center hover:cursor-pointer m-1">
                  <p className="font-archivo font-semibold text-xs text-white">View full profile</p>
                  <ArrowSmRightIcon className="h-3 w-3 text-white" />
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default CreatorProfile