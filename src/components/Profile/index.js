import BannerPicture from '@components/Dashboard/BannerPicture'
import React, { useEffect, useState } from 'react'
import ProfileInfo from './ProfileInfo'
import TokenMinting from './TokenMinting'
import TokenOwned from './TokenOwned'
import TokenDoneMinting from './TokenDoneMinting'
import TokenCreatorView from './TokenCreatorView'
import { useRouter } from 'next/router'
import { useMoralis } from "react-moralis";
import ProfilePost from './ProfilePost'
import Feed from './Feed'
import { contractAddress, contractAbi } from "@utils/contractDetails"
import { useWeb3Contract, useMoralisQuery } from "react-moralis";
import { cidUrl } from "@utils/cidWrapper"


const Profile = () => {

    const { query: { id } } = useRouter()
    const { Moralis } = useMoralis();

    function strCompare(str1,str2){
        return str1 === str2 ;
    }

    const selfProfile = strCompare(Moralis.account,id)

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
            getProfile(id)
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
        <div className="bg-stone-100">
            {/* Banner image */}
            {profile &&
                <BannerPicture
                cBannerPic={cidUrl(profile.backgroundImage)}
            />
            }
            {/* Banner content*/}
            <div className="">
                <div className="bg-stone-900/50 flex justify-center w-full h-[360px] items-center -mt-[360px]">
                    {/* Banner content */}
                    <div className="flex flex-row space-x-32 justify-center items-center ">
                        <ProfileInfo
                            profileAddress={id}
                            profileInfo={profile}
                            cProfPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWJDhlIp_IIVCYzDx3i7Br4y_jQX1NFMKVQ_Net4I0HWPxUGXdQ8vNjqvgHKYKYP5jL0s&usqp=CAU"
                            cDisName="Olivia Rodrigo"
                            cUsername="@oliviarodrigo"
                            cTitle="Singer"
                            cBio="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium."
                            cWebsite="oliviarodrigo.com/or"
                            cTwitterLink="twitter.com/oliviarodrigo"
                            cIgLink="instagram.com/oliviarodrigo"
                            cYtLink="https://www.youtube.com/c/OliviaRodrigomusic/"
                            cTtLink="https://www.tiktok.com/@livbedumb"
                            isSelf={selfProfile}
                        />
                        <TokenMinting
                            tokenName="Livies"
                            tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
                            percentMinted="45"
                            tokenRemaining="4600"
                            tokenSupply="5000"
                            tokenPrice="200"
                            mintLink="opensea.com"
                            selfProfile={selfProfile} />
                        {/* <TokenOwned
                            tokenName="Livies"
                            tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
                            tokenNum="356"
                            tokenSupply="5000"
                            esLink="https://etherscan.io/"
                            osLink="https://opensea.io/" /> */}
                        {/* <TokenDoneMinting
                            tokenName="Livies"
                            tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
                            esLink="https://etherscan.io"
                            osCollLink="https://opensea.io" /> */}
                        {/* <TokenCreatorView
                            tokenName="Livies"
                            tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
                            percentMinted="45"
                            tokenRemaining="4600"
                            tokenSupply="5000"
                            esLink="https://etherscan.io"
                            osCollLink="https://opensea.io" /> */}
                    </div>
                </div>
            </div>
            <Feed/>

        </div>

    )
}

export default Profile