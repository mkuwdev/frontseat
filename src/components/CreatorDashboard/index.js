import React from 'react'
import CreatorPost from './CreatorPost'
import CreatorProfile from './CreatorProfile'
import CreatorEarnings from './CreatorEarnings'
import CreatePost from './CreatePost'


const CreatorDashboard = () => {

   // What needs to be fetched (Component = props)

  // CreatorProfile = profPic
  // CreatorPost = postPic, postTitle, postContent, postDate, profPic

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
            <div className="sticky top-14 bg-stone-100 px-12 py-2">
              <p className="font-clashg text-lg font-semibold">Your Posts</p>
            </div>
            {/* Large invisible container for creator's post boxes */}
            <div className="container my-2 align-middle">
              <CreatePost />
              <CreatorPost
                postPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSol8wbdN8DpJ1zBICd61fpzJbk2KA7eBIqw&usqp=CAU"
                postTitle="This is the title"
                postContent="This is the content"
                postDate="May 5, 2022"
                profPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
              />
            </div>
          </div>
        </div>
        {/* The right section*/}
        <div className="sticky top-0 flex flex-col space-y-5 px-10 pt-6">
          <CreatorEarnings />
          {/* CreatorEarnings will fetch props */}
        </div>
      </div>
    </div>
  )
}

export default CreatorDashboard