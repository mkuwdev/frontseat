import React from 'react'

const ProfileCard = ({ name, username, title, profileImg, bgImg }) => {
  return (
    <div class="p-4 w-full md:w-1/2 lg:px-4 lg:w-1/4 font-archivo">
        <article class="container overflow-hidden rounded-md shadow-lg pb-8 hover:cursor-pointer hover:shadow-xl">
            <div class="h-48 lg:h-24 overflow-hidden">
                <img class="w-full rounded-t"
                    src="https://bafkreiddepglttf3hs6nirp3yp7ejeqtyppveoj7btkn5ayxhj4ls7wfsq.ipfs.dweb.link/"
                />
            </div>
            <div class="flex justify-center px-5 -mt-12">
                <span clspanss="block relative h-32 w-32">
                    <img
                    src="https://bafkreihjovs6cccvyst3qg3hgftxrjjfpzepefzni5yyywd7m3qcvryzhi.ipfs.dweb.link/"
                    class="mx-auto object-cover rounded-full h-24 w-24 bg-white p-1" 
                    />
                </span>
            </div>
            <header class="mx-auto justify-center text-center px-2">
                <h1 class="text-xl mt-1">
                    <div class="font-semibold" href="#">
                        Jennie
                    </div>
                </h1>
                <p className="text-sm text-gray-500">
                    @kimjennie
                </p>
                <div className="mt-2 px-8">
                    K-Idol
                </div>
            </header>
        </article>
    </div>
  )
}

export default ProfileCard