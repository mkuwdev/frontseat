import React from 'react'

const ProfilePost = ({ postPic, postTitle, postContent, postDate, uProfPic }) => {
  return (
    <div className="mx-12 mb-4 rounded-2xl bg-white">
            {/* Container inside the box of creator's post*/}
            <div className="flex flex-col space-y-5 p-7">
                
                {/* Post's picture and texts*/}
                <div className="flex flex-col space-y-4 justify-self-end">
                    <img className="object-contain" src={postPic} />
                    <div className="flex flex-col space-y-2">
                        <p className="font-clashg text-base font-medium text-stone-900">{postTitle}</p>
                        <p className="font-archivo text-sm font-normal text-stone-700">{postContent}</p>
                    </div>
                </div>
                {/* Date and divider*/}
                <div className="div border-b-2 pb-2  border-stone-100">
                    <p className="font-archivo text-xs font-semibold uppercase text-stone-900">{postDate}</p>
                </div>
                {/* Comment section*/}
                <div className="div">
                    <div className="flex flex-row items-center justify-start space-x-3">
                        <img className="object-cover h-6 w-6 rounded-full" src={uProfPic} alt="" />
                        <div className="box-content flex h-7 flex-auto rounded-lg bg-stone-100">
                            <label for="comments"></label>
                            <input type="text" className="form-control font-archivo flex flex-auto rounded-lg bg-stone-100 bg-clip-padding px-4 py-1 text-xs font-normal text-stone-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none" id="comments" placeholder="Comments (disabled)" aria-label="Comments" disabled />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ProfilePost