import { GridEleven, GridSeven, GridSix, ParentGrid } from '@components/GridLayout'
import React from 'react'
import Link from 'next/link'
import { ArrowNarrowRightIcon, ArrowSmRightIcon } from '@heroicons/react/outline'


const Dashboard = () => {
  return (
    <div className="bg-stone-100"> {/* The Whole page */}
      <div className="grid grid-cols-[7fr_11fr_6fr]"> {/* Dividing the page into three*/}

        {/* The Left Section */}
        <div className="flex flex-col space-y-5 px-10 pt-6">
          {/* Be a creator box*/}
          <div className="rounded-2xl bg-white">
            {/* Container to control spacing of items inside */}
            <div className="flex flex-col space-y-5 p-6">
              {/* Title and caption */}
              <div className="flex items-center justify-start space-x-3">
                <div className="flex flex-col space-y-4">
                  <p className="font-clashg text-base font-medium">Be a creator!✨</p>
                  <p className="font-archivo text-xs font-normal leading-loose">Launch your own membership NFT collection and release exclusive contents for your top fans</p>
                </div>
              </div>
              {/* Get started link and divider */}
              <Link href="/get-started">
                <div className="flex flex-row items-center content-center justify-center space-x-2 border-t-2 pt-4 hover: cursor-pointer">
                  <p className="font-archivo text-xs font-semibold align-middle">Get started</p>
                  <div className="">
                    <ArrowSmRightIcon className="text-stone-800 h-4 w-4"></ArrowSmRightIcon>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* Explore new creator box */}
          <div className="rounded-2xl bg-white">
            {/* Container to control spacing of items inside */}
            <div className="flex flex-col space-y-5 p-6">
              {/* Container fill the entirety of the content inside */}
              <div className="flex items-center justify-start space-x-3">
                {/* Control spacing between the title and profiles */}
                <div className="flex flex-col space-y-4">
                  <p className="font-clashg text-base font-medium">New Creators</p>
                  {/* Invisible container to store new creator profiles and control spacing */}
                  <div className="container flex flex-col space-y-3">
                    {/* New creator profile component 1*/}
                    <div className="items-center flex flex-row space-x-3">
                      <img className="h-8 w-8 rounded-full" src="https://data.whicdn.com/images/354500359/original.jpg" alt="" />
                      <div className="flex flex-col">
                        <p className="font-archivo text-sm font-bold">Olivia Rodrigo</p>
                        <p className="font-archivo text-xs font-regular">@oliviarodrigo</p>
                      </div>
                    </div>
                    {/* New creator profile component 2*/}
                    <div className="items-center flex flex-row space-x-3">
                      <img className="h-8 w-8 rounded-full" src="https://data.whicdn.com/images/354500359/original.jpg" alt="" />
                      <div className="flex flex-col">
                        <p className="font-archivo text-sm font-bold">Olivia Rodrigo</p>
                        <p className="font-archivo text-xs font-regular">@oliviarodrigo</p>
                      </div>
                    </div>
                    {/* New creator profile component 3*/}
                    <div className="items-center flex flex-row space-x-3">
                      <img className="h-8 w-8 rounded-full" src="https://data.whicdn.com/images/354500359/original.jpg" alt="" />
                      <div className="flex flex-col">
                        <p className="font-archivo text-sm font-bold">Olivia Rodrigo</p>
                        <p className="font-archivo text-xs font-regular">@oliviarodrigo</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              {/* Get started link and divider */}
              <Link href="/get-started">
                <div className="flex flex-row items-center content-center justify-center space-x-2 border-t-2 pt-4 hover: cursor-pointer">
                  <p className="font-archivo text-xs font-semibold align-middle">Get started</p>
                  <div className="">
                    <ArrowSmRightIcon className="text-stone-800 h-4 w-4"></ArrowSmRightIcon>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* The Middle Section */}
        <div className="border-x">
          {/* The Feed Header */}
          <div>
            <div className="sticky top-14 bg-stone-100 px-12 py-2">
              <p className="font-clashg text-lg font-semibold">Feed</p>
            </div>
            {/* Large invisible container for creator's post */}
            <div className="container my-2">
              {/* Creator's post box */}
              <div className="mx-12 rounded-2xl bg-white">
                {/* Container inside the box of creator's post*/}
                <div className="flex flex-col space-y-5 p-7">
                  {/* Creator name and username*/}
                  <div className="flex items-center justify-start space-x-3">
                    <img className="h-10 w-10 rounded-full" src="https://data.whicdn.com/images/354500359/original.jpg" alt="" />
                    <div className="flex flex-col">
                      <p className="font-clashg text-base font-medium">Olivia Rodrigo</p>
                      <p className="font-archivo text-xs font-semibold">@oliviarodrigo</p>
                    </div>
                  </div>
                  {/* Post's picture and texts*/}
                  <div className="flex flex-col space-y-4 justify-self-end">
                    <img className="object-contain" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSol8wbdN8DpJ1zBICd61fpzJbk2KA7eBIqw&usqp=CAU" />
                    <div className="flex flex-col space-y-2">
                      <p className="font-clashg text-base font-medium">This is a title</p>
                      <p className="font-archivo text-xs font-normal">This is a caption</p>
                    </div>
                  </div>
                  {/* Date and divider*/}
                  <div className="div border-b-2 pb-3">
                    <p className="font-archivo text-xs font-semibold uppercase">May 5, 2022</p>
                  </div>
                  {/* Comment section*/}
                  <div className="div">
                    <div className="flex flex-row items-center justify-start space-x-3">
                      <img className="h-6 w-6 rounded-full" src="https://data.whicdn.com/images/354500359/original.jpg" alt="" />
                      <div className="box-content flex h-7 flex-auto rounded-lg bg-stone-100">
                        <label for="comments"></label>
                        <input type="text" className="form-control font-archivo flex flex-auto rounded-lg bg-stone-100 bg-clip-padding px-4 py-1 text-xs font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none" id="comments" placeholder="Comments (disabled)" aria-label="Comments" disabled />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* The right section*/}
        <div className="sticky top-0 flex flex-col space-y-5 px-10 pt-6">
          {/* Be a creator box*/}
          <div className="rounded-2xl bg-white">
            {/* Container to control spacing of items inside */}
            <div className="flex flex-col space-y-5 p-6">
              {/* Title and caption */}
              <div className="flex items-center justify-start space-x-3">
                <div className="flex flex-col space-y-4">
                  <p className="font-clashg text-base font-medium">Be a creator!✨</p>
                  <p className="font-archivo text-xs font-normal leading-loose">Launch your own membership NFT collection and release exclusive contents for your top fans</p>
                </div>
              </div>
              {/* Get started link and divider */}
              <Link href="/get-started">
                <div className="flex flex-row items-center content-center justify-center space-x-2 border-t-2 pt-4 hover: cursor-pointer">
                  <p className="font-archivo text-xs font-semibold align-middle">Get started</p>
                  <div className="">
                    <ArrowSmRightIcon className="text-stone-800 h-4 w-4"></ArrowSmRightIcon>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* Explore new creator box */}
          <div className="rounded-2xl bg-white">
            {/* Container to control spacing of items inside */}
            <div className="flex flex-col space-y-5 p-6">
              {/* Container fill the entirety of the content inside */}
              <div className="flex items-center justify-start space-x-3">
                {/* Control spacing between the title and profiles */}
                <div className="flex flex-col space-y-4">
                  <p className="font-clashg text-base font-medium">New Creators</p>
                  {/* Invisible container to store new creator profiles and control spacing */}
                  <div className="container flex flex-col space-y-3">
                    {/* New creator profile component 1*/}
                    <div className="items-center flex flex-row space-x-3">
                      <img className="h-8 w-8 rounded-full" src="https://data.whicdn.com/images/354500359/original.jpg" alt="" />
                      <div className="flex flex-col">
                        <p className="font-archivo text-sm font-bold">Olivia Rodrigo</p>
                        <p className="font-archivo text-xs font-regular">@oliviarodrigo</p>
                      </div>
                    </div>
                    {/* New creator profile component 2*/}
                    <div className="items-center flex flex-row space-x-3">
                      <img className="h-8 w-8 rounded-full" src="https://data.whicdn.com/images/354500359/original.jpg" alt="" />
                      <div className="flex flex-col">
                        <p className="font-archivo text-sm font-bold">Olivia Rodrigo</p>
                        <p className="font-archivo text-xs font-regular">@oliviarodrigo</p>
                      </div>
                    </div>
                    {/* New creator profile component 3*/}
                    <div className="items-center flex flex-row space-x-3">
                      <img className="h-8 w-8 rounded-full" src="https://data.whicdn.com/images/354500359/original.jpg" alt="" />
                      <div className="flex flex-col">
                        <p className="font-archivo text-sm font-bold">Olivia Rodrigo</p>
                        <p className="font-archivo text-xs font-regular">@oliviarodrigo</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              {/* Get started link and divider */}
              <Link href="/get-started">
                <div className="flex flex-row items-center content-center justify-center space-x-2 border-t-2 pt-4 hover: cursor-pointer">
                  <p className="font-archivo text-xs font-semibold align-middle">Get started</p>
                  <div className="">
                    <ArrowSmRightIcon className="text-stone-800 h-4 w-4"></ArrowSmRightIcon>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default Dashboard
