import { NFTStorage } from 'nft.storage'

function getNFTAccessToken () {
    return process.env.NEXT_PUBLIC_NFT
}

export async function uploadNFT(name, img, desc) {

    const client = new NFTStorage({ token: getNFTAccessToken() })
    const nftUri = await client.store({
        name: name,
        image: img,
        description: desc
    })

    const tokenURI = nftUri.url
    console.log('> 🚀 Successfully stored to nft.storage!')
    console.log(`> ✅ nft.storage now hosting ${nftUri.ipnft}`)
    console.log(`> 🌐 Generated url ${tokenURI}`)

    return tokenURI
}