import React, { useState } from 'react'
import LitJsSdk from 'lit-js-sdk'
import { Web3Storage } from 'web3.storage'
import { useMoralisWeb3Api } from "react-moralis";

const index = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [encrypted, setEncrypted] = useState()
    const [key, setKey] = useState()
    const [cid, setCID] = useState('')

    const Web3Api = useMoralisWeb3Api();

    const client = new LitJsSdk.LitNodeClient()
    const chain = 'mumbai'

    function getWeb3AccessToken () {
        return process.env.NEXT_PUBLIC_WEB3
    }

    function makeFileObjects (obj) {
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
        const files = [
          new File([blob], 'data.json')
        ]
        return files
    }


    const accessControlConditions = [
        {
          contractAddress: '0x4296900ed93efb9452cc44811fdd5609154bef7d',
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

    const fetchNFTsForContract = async (e) => {
        e.preventDefault()
        const options = {
          chain: "mumbai",
          address: "0xaC29f0Df1D30369462efB3954552803ae3FC8366",
          token_address: "0x4fb32d4a0bad898904f745f38e7be0b62f873934",
        };
        const polygonNFTs = await Web3Api.account.getNFTsForContract(options);
        console.log(polygonNFTs);
      };

    async function encrypt(message) {
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

        setEncrypted(encryptedString)
        // setKey(LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"))

        // Upload Blob of encryptedString to ipfs
        const files = [new File([encryptedString], 'encrypted')]
        const web3storage = new Web3Storage({token: getWeb3AccessToken()})

        const cid = await web3storage.put(files, {
            wrapWithDirectory: false,
            onRootCidReady: localCid => {
              console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
              console.log('> 📡 sending files to web3.storage ')
            },
            onStoredChunk: bytes => console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
        })
        console.log(`https://${cid}.ipfs.dweb.link/`)
    }

    async function onDecrypt(e) {
        e.preventDefault();
        console.log("DECRYPTING")

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
        console.log(decrypted.name)
        console.log(decrypted.description)

        console.log(typeof key)
        console.log(typeof "hello")
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const samplePost = {
            name: name,
            description: description
        }

        const sampleJSON = JSON.stringify(samplePost)

        console.log(sampleJSON);
        encrypt(sampleJSON)
    }
    
    return (
        <div>
            <form id='upload-form' onSubmit={handleSubmit}>
                <input id='name' placeholder="Insert Name" onChange={e => setName(e.target.value)} required />
                <input id='desc' placeholder="Insert Description" onChange={e => setDescription(e.target.value)} required />
                <input type='submit' value='Submit' id='submit' />
            </form>
            <form id='decrypt-form' onSubmit={onDecrypt}>
                <input id='desc' placeholder="Insert cid" onChange={e => setCID(e.target.value)} required />
                <input id='desc' placeholder="Insert cid" onChange={e => setKey(e.target.value)} required />
                <input type='submit' value='Submit' id='submit' />
            </form>
            <form id='decrypt-form' onSubmit={fetchNFTsForContract}>
                <input type='submit' value='Fetch' id='submit' />
            </form>
        </div>
        
    )
}

export default index