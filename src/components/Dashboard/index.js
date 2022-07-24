import React, { useEffect, useState } from 'react'
import FeedPost from './FeedPost'
import TokenCard from './TokenCard'
import NewCreatorsCard from './NewCreatorsCard'
import UserProfile from './UserProfile'
import CreateMembership from './CreateMembership'
import ViewCreatorDash from './ViewCreatorDash'
import { useMoralis, useWeb3Contract } from "react-moralis";
import { contractAddress, contractAbi } from "@utils/contractDetails"
import { cidUrl } from "@utils/cidWrapper"

const Dashboard = () => {
  const [cid, setCid] = useState('')
  const [profile, setProfile] = useState('')
  const [isCreator, setCreator] = useState(false)

   // What needs to be fetched (Component = props)
  //  UserProfile = uProfPic, uDisName, uWalletAdd
  //  FeedPost = cProfPic, cDisName, cUsername, postPic, postTitle, postContent, postDate, uProfPic
  //  If visitor==creator, display ViewCreatorDash else display CreateMembership
  // ViewCreatorDash = totalPosts, totalEarnings, tokenSold

  const { Moralis, isAuthenticated } = useMoralis();
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
              setCreator(data.isCreator)
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
          getProfile(Moralis.account)
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
  }, [cid, profile, isAuthenticated])

  return (
    <div className="bg-stone-100"> {/* The Whole page */}
      <div className="grid grid-cols-[7fr_11fr_6fr]"> {/* Dividing the page into three*/}
        {/* The Left Section */}
        <div className="sticky top-0 flex flex-col space-y-5 px-10 pt-6">
          {/* User profile box*/}
          {profile &&
            <UserProfile 
              uProfPic={cidUrl(profile.profileImage)}
              uDisName={profile.name}
              uWalletAdd={Moralis.account}
            />
          }
          {/* Your membership token box */}
          <TokenCard />
          {/* TokenCard will fetch props */}
        </div>
        {/* The Middle Section */}
        <div className="border-x">
          {/* The Feed Header */}
          <div>
            <div className="sticky top-14 bg-stone-100 px-12 py-2">
              <p className="font-clashg text-lg font-semibold">Feed</p>
            </div>
            {/* Large invisible container for creator's post boxes */}
            <div className="container my-2">
              <FeedPost
                cProfPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWJDhlIp_IIVCYzDx3i7Br4y_jQX1NFMKVQ_Net4I0HWPxUGXdQ8vNjqvgHKYKYP5jL0s&usqp=CAU"
                cDisName="Michelle"
                cUsername="@michelle"
                postPic="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                postTitle="Helloo"
                postContent="Thankful for every single one of you!!"
                postDate="May 5, 2022"
                uProfPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
              />
            </div>
          </div>
        </div>
        {/* The right section*/}
        <div className="sticky top-0 flex flex-col space-y-5 px-10 pt-6">
          {/* If creator, load view creator dash. If user, load createmembership */}
          {!isCreator ?
            (<CreateMembership />) :
            (<ViewCreatorDash 
              totalPosts="500"
              totalEarnings="5000"
              tokenSold="4345"
            />)
          }
          <NewCreatorsCard />
          {/* NewCreatorsCard will fetch props */}
        </div>
      </div>
    </div>



  )
}

export default Dashboard
