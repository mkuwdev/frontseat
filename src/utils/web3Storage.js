import { Web3Storage } from 'web3.storage'

function getWeb3AccessToken () {
    return process.env.NEXT_PUBLIC_WEB3
}

export async function uploadToWeb3(file) {

    const client = new Web3Storage({token: getWeb3AccessToken()})
    const cid = await client.put(file, {
        wrapWithDirectory: false,
        onRootCidReady: localCid => {
            console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
            console.log('> 📡 sending files to web3.storage ')
        },
        onStoredChunk: bytes => {
            console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
        }
    })

    console.log(`> ✅ web3.storage now hosting ${cid}`)
    console.log(`https://${cid}.ipfs.dweb.link/`)

    return cid
}