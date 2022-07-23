import Navbar from '@components/Shared/Navbar'
import NextNProgress from "nextjs-progressbar";
import { useMoralis } from "react-moralis";
import React, { useState, Fragment } from 'react'

const SiteLayout = ({ children }) => {

    return (
      <div className="flex flex-col min-h-screen">
          <NextNProgress 
            height={3} 
            color="#000000"
            options={{ showSpinner: false }}
          />
          <Navbar/>
          <div className="mx-auto max-w-7xl w-full max-h-screen ">
            {children}
          </div>
      </div>
    )
  }
  
  export default SiteLayout