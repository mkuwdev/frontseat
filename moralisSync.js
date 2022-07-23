const contractAbi = require("./constants/contractAbi.json")
const deployedContract = require("./constants/deployedContract.json")

require("dotenv").config()

const contractAddress = deployedContract["address"]
const contractChainId = deployedContract["chainId"]

const Moralis = require("moralis/node")

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
const appId = process.env.NEXT_PUBLIC_APP_ID
const masterKey = process.env.NEXT_PUBLIC_MASTERKEY

async function main() {
    console.log(serverUrl)
    await Moralis.start({ serverUrl, appId, masterKey })
    console.log(`Contract Address: ${contractAddress}`)
    console.log(`Chain Deployed to: ${contractChainId}`)

    let profileUpdatedOptions = {
        chainId: contractChainId,
        sync_historical: true,
        topic: "ProfileUpdated(address,string)",
        address: contractAddress,
        abi: contractAbi["profileUpdated"],
        tableName: "ProfileUpdated"
    }

    let membershipLaunchedOptions = {
        chainId: contractChainId,
        sync_historical: true,
        topic: "MembershipLaunched(address,address,string,uint256,uint256)",
        address: contractAddress,
        abi: contractAbi["membershipLaunched"],
        tableName: "MembershipLaunched"
    }

    let postAddedOptions = {
        chainId: contractChainId,
        sync_historical: true,
        topic: "PostAdded(address,uint256,string,string)",
        address: contractAddress,
        abi: contractAbi["postAdded"],
        tableName: "PostAdded"
    }

    let postEditedOptions = {
        chainId: contractChainId,
        sync_historical: true,
        topic: "PostEdited(address,uint256,string,string)",
        address: contractAddress,
        abi: contractAbi["postEdited"],
        tableName: "PostEdited"
    }

    let postDeletedOptions = {
        chainId: contractChainId,
        sync_historical: true,
        topic: "PostDeleted(address,uint256)",
        address: contractAddress,
        abi: contractAbi["postDeleted"],
        tableName: "PostDeleted"
    }

    let earningsWithdrawnOptions = {
        chainId: contractChainId,
        sync_historical: true,
        topic: "EarningsWithdrawn(address,uint256)",
        address: contractAddress,
        abi: contractAbi["earningsWithdrawn"],
        tableName: "EarningsWithdrawn"
    }

    const profileUpdatedResponse = await Moralis.Cloud.run("watchContractEvent", profileUpdatedOptions, {
        useMasterKey: true,
    })
    const membershipLaunchedResponse = await Moralis.Cloud.run("watchContractEvent", membershipLaunchedOptions, {
        useMasterKey: true,
    })
    const postAddedResponse = await Moralis.Cloud.run("watchContractEvent", postAddedOptions, {
        useMasterKey: true,
    })
    const postEditedResponse = await Moralis.Cloud.run("watchContractEvent", postEditedOptions, {
        useMasterKey: true,
    })
    const postDeleted = await Moralis.Cloud.run("watchContractEvent", postDeletedOptions, {
        useMasterKey: true,
    })
    const earningsWithdrawn = await Moralis.Cloud.run("watchContractEvent", earningsWithdrawnOptions, {
        useMasterKey: true,
    })
    
    if (profileUpdatedResponse.success && membershipLaunchedResponse.success && postAddedResponse.success && postEditedResponse.success && postDeleted.success && earningsWithdrawn.success) {
        console.log("Success! Moralis DB Updated with watching events")
    } else {
        console.log("Something went wrong...")
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })