import React from 'react'
import FeedPost from './FeedPost'
import TokenCard from './TokenCard'
import NewCreatorsCard from './NewCreatorsCard'
import UserProfile from './UserProfile'
import CreateMembership from './CreateMembership'
import ViewCreatorDash from './ViewCreatorDash'

const Dashboard = () => {

   // What needs to be fetched (Component = props)
  //  UserProfile = uProfPic, uDisName, uWalletAdd
  //  FeedPost = cProfPic, cDisName, cUsername, postPic, postTitle, postContent, postDate, uProfPic
  //  If visitor==creator, display ViewCreatorDash else display CreateMembership
  // ViewCreatorDash = totalPosts, totalEarnings, tokenSold

  return (
    <div className="bg-stone-100"> {/* The Whole page */}
      <div className="grid grid-cols-[7fr_11fr_6fr]"> {/* Dividing the page into three*/}

        {/* The Left Section */}
        <div className="sticky top-0 flex flex-col space-y-5 px-10 pt-6">
          {/* User profile box*/}
          <UserProfile 
            uProfPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
            uDisName="Ghozali"
            uWalletAdd="0xb794f.....79268"
          />
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
                cDisName="Olivia Rodrigo"
                cUsername="@oliviarodrigo"
                postPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSol8wbdN8DpJ1zBICd61fpzJbk2KA7eBIqw&usqp=CAU"
                postTitle="This is the title"
                postContent="This is the content"
                postDate="May 5, 2022"
                uProfPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
              />
            </div>
          </div>
        </div>
        {/* The right section*/}
        <div className="sticky top-0 flex flex-col space-y-5 px-10 pt-6">
          {/* If creator, load view creator dash. If user, load createmembership */}
          <CreateMembership />
          <ViewCreatorDash 
            totalPosts="500"
            totalEarnings="5000"
            tokenSold="4345"
          />
          <NewCreatorsCard />
          {/* NewCreatorsCard will fetch props */}
        </div>
      </div>
    </div>



  )
}

export default Dashboard
