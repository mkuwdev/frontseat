import React, { useState } from 'react'
import LitJsSdk from 'lit-js-sdk'
import { useMoralis, useWeb3Contract } from "react-moralis";
import { uploadToWeb3 } from "@utils/web3Storage"
import { contractAddress, contractAbi } from "@api/contractDetails"

const index = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [img, setImg] = useState([])
    const [encrypted, setEncrypted] = useState()
    const [key, setKey] = useState()
    const [cid, setCID] = useState('')

    const { runContractFunction } = useWeb3Contract()
    const { Moralis } = useMoralis();

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

    const onImgChange = (e) => {
      const file = e.target.files[0]
      if (file) {
          setImg(file)
      }
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

        const newPostOptions = {
          abi: contractAbi,
          contractAddress: contractAddress,
          functionName: "addPost",
          params: {
              _contentCid: cid,
              _key: encryptedKey
          },
      }
    
      await runContractFunction({
          params: newPostOptions,
          onSuccess: (data) => {
              console.log("SUCCESS")
              console.log(data)
          },
          onError: (error) => {
              console.log(error)
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

        const postData = await getPost(creatorAccount, 9)
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
        <div>
            <form id='upload-form' onSubmit={handleSubmit}>
                <input id='name' placeholder="Insert Title" onChange={e => setTitle(e.target.value)} required />
                <input id='desc' placeholder="Insert Content" onChange={e => setContent(e.target.value)} required />
                <input type='file' id='filepicker' name='fileList' onChange={onImgChange} required />
                <input type='submit' value='Submit' id='submit' />
            </form>
            <form id='decrypt-form' onSubmit={onDecrypt}>
                <input id='desc' placeholder="Insert cid" onChange={e => setCID(e.target.value)} />
                <input id='desc' placeholder="Insert cid" onChange={e => setKey(e.target.value)} />
                <input type='submit' value='Submit' id='submit' />
            </form>
        </div>
        
    )
}

export default index