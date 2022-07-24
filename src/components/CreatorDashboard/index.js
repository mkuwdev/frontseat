import React, { useEffect, useState } from 'react'
import CreatorPost from './CreatorPost'
import CreatorProfile from './CreatorProfile'
import CreatorEarnings from './CreatorEarnings'
import CreatePost from './CreatePost'
import Posts from './Posts'
import { useMoralis, useWeb3Contract } from "react-moralis";
import { contractAddress, contractAbi } from "@utils/contractDetails"
import { cidUrl } from "@utils/cidWrapper"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatorDashboard = () => {
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
  }, [cid, profile])

  return (
    <div className="bg-stone-100"> {/* The Whole page */}
      <div className="grid grid-cols-[6fr_10fr_8fr]"> {/* Dividing the page into three*/}

        {/* The Left Section */}
        <div className="sticky top-0 flex flex-col space-y-5 px-10 pt-6">
          {/* Creator profile box*/}
          <CreatorProfile 
            profPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
            disName="Ghozali"
            />
        
        </div>
        {/* The Middle Section */}
        <div className="border-x">
          {/* The Feed Header */}
          <div>
            <div className="top-14 bg-stone-100 px-12 py-2">
              <p className="font-clashg text-lg font-semibold">Your Posts</p>
            </div>
            {/* Large invisible container for creator's post boxes */}
            {/* <div className="container my-2">
              <CreatePost />
              <CreatorPost
                postPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSol8wbdN8DpJ1zBICd61fpzJbk2KA7eBIqw&usqp=CAU"
                postTitle="This is the title"
                postContent="This is the content"
                postDate="May 5, 2022"
                profPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
              />
            </div> */}
            <Posts />
          </div>
        </div>
        {/* The right section*/}
        <div className="sticky top-0 flex flex-col space-y-5 px-10 pt-6">
          <CreatorEarnings />
          {/* CreatorEarnings will fetch props */}
        </div>
      </div>
      <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
      />
    </div>
  )
}

export default CreatorDashboard