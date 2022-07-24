import { useMoralis, useWeb3Contract, useMoralisQuery } from "react-moralis"
import { contractAddress, contractAbi, nftAbi } from "@utils/contractDetails"
import { ethers } from "ethers" 


export async function getMintedAmount(address, runContractFunction) {

    const getMintedAmountOptions = {
        abi: nftAbi,
        contractAddress: address,
        functionName: "getMintedAmount"
    }

    const data = await runContractFunction({
        params: getMintedAmountOptions,
        onSuccess: (data) => {
            console.log("Got Minted Amount")
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const result = ethers.BigNumber.from(data).toNumber()
    return result
}

export async function getTotalEarnings(address, runContractFunction) {
        
    const options = {
        abi: nftAbi,
        contractAddress: address,
        functionName: "totalEarnings"
    }

    const data = await runContractFunction({
        params: options,
        onSuccess: (data) => {
            console.log("Got Total Earnings")
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    // const wei = ethers.BigNumber.from(data).toNumber()
    const result = ethers.utils.formatEther(data)
    return result
}

export async function getTotalWithdrawn(address, runContractFunction) {
        
    const options = {
        abi: nftAbi,
        contractAddress: address,
        functionName: "totalWithdrawn"
    }

    const data = await runContractFunction({
        params: options,
        onSuccess: (data) => {
            console.log("Got Total Withdrawn")
        },
        onError: (error) => {
            console.log(error)
        },
    })

    // const wei = ethers.BigNumber.from(data).toNumber()
    const result = ethers.utils.formatEther(data)
    return result
}

export async function getBalance(address, runContractFunction) {
        
    const options = {
        abi: nftAbi,
        contractAddress: address,
        functionName: "getBalance"
    }

    const data = await runContractFunction({
        params: options,
        onSuccess: (data) => {
            console.log("Got Balance Left")
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    // const wei = ethers.BigNumber.from(data).toNumber()
    const result = ethers.utils.formatEther(data)
    return result
}

export async function getMaxSupply(address, runContractFunction) {

    const options = {
        abi: nftAbi,
        contractAddress: address,
        functionName: "maxSupply"
    }

    const data = await runContractFunction({
        params: options,
        onSuccess: (data) => {
            console.log("Got Max Supply")
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const result = ethers.BigNumber.from(data).toNumber()
    return result
}

export async function getPrice(address, runContractFunction) {

    const options = {
        abi: nftAbi,
        contractAddress: address,
        functionName: "price"
    }

    const data = await runContractFunction({
        params: options,
        onSuccess: (data) => {
            console.log("Got Price")
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const result = ethers.utils.formatEther(data)
    return result
}