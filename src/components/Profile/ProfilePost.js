import React, { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from "react-moralis";
import LitJsSdk from 'lit-js-sdk'
import { contractAddress, contractAbi } from "@api/contractDetails"
import { cidUrl } from "@utils/cidWrapper"

const ProfilePost = ({ postPic, postTitle, postContent, postDate, uProfPic, contentCid, postKey, creator, time, requiredNft }) => {
    const [isLoading, setLoading] = useState(true)
    const [title, setTitle] = useState()
    const [image, setImage] = useState()
    const [content, setContent] = useState()

    const { Moralis, isWeb3Enabled } = useMoralis();
    const { runContractFunction } = useWeb3Contract()

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

    async function decrypt(cid, key, creator) {
        const client = new LitJsSdk.LitNodeClient()
        const chain = 'mumbai'

        if (cid && key && creator) {

            const creatorProfile = await getCreatorProfile(creator)
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
            const symmetricKey = await client.getEncryptionKey({
                accessControlConditions,
                toDecrypt: key,
                chain,
                authSig
            })
    
            const URL = "https://" + cid + ".ipfs.dweb.link/"
            console.log("Fetching Blob")
            const res = await fetch(URL)
            const encryptedBlob = await res.blob()
            // console.log(encryptedBlob)
            console.log("Fetched Blob Success")
            
            console.log("Feeding into decryptor..")
            const decryptedString = await LitJsSdk.decryptString(
                encryptedBlob,
                symmetricKey
            );
        
            const decrypted = JSON.parse(decryptedString)
            console.log(decrypted.title)
            setTitle(decrypted.title)
            console.log(decrypted.image)
            setImage(cidUrl(decrypted.image))
            console.log(decrypted.content)
            setContent(decrypted.content)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isLoading) {
            decrypt(contentCid, postKey, creator);
        } else {
            // updateUI()
       }
    }, [])

  return (
    <div className="mx-12 mb-4 rounded-2xl bg-white">
            {/* Container inside the box of creator's post*/}
            {!isLoading && 
            <div className="flex flex-col space-y-5 p-7">  
                {/* Post's picture and texts*/}
                <div className="flex flex-col space-y-4 justify-self-end">
                    <img className="object-contain" src={image} />
                    <div className="flex flex-col space-y-2">
                        <p className="font-clashg text-base font-medium text-stone-900">{title}</p>
                        <p className="font-archivo text-sm font-normal text-stone-700">{content}</p>
                    </div>
                </div>
                {/* Date and divider*/}
                <div className="div border-b-2 pb-2  border-stone-100">
                    <p className="font-archivo text-xs font-semibold uppercase text-stone-900">{postDate}</p>
                </div>
                {/* Comment section*/}
                <div className="div">
                    <div className="flex flex-row items-center justify-start space-x-3">
                        <img className="object-cover h-6 w-6 rounded-full" src={uProfPic} alt="" />
                        <div className="box-content flex h-7 flex-auto rounded-lg bg-stone-100">
                            <label for="comments"></label>
                            <input type="text" className="form-control font-archivo flex flex-auto rounded-lg bg-stone-100 bg-clip-padding px-4 py-1 text-xs font-normal text-stone-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none" id="comments" placeholder="Comments (disabled)" aria-label="Comments" disabled />
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
  )
}

export default ProfilePost