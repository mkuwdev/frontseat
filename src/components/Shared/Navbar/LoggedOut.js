import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UploadIcon } from '@heroicons/react/outline'
import { useMoralis, useWeb3Contract, useMoralisWeb3Api } from "react-moralis";
import LitJsSdk from 'lit-js-sdk'
import { contractAddress, contractAbi } from "@api/contractDetails"
import { uploadToWeb3 } from "@utils/web3Storage"

const LoggedOut = ({isOpen}) => {
  return (
    <div>hi</div>
  )
}

export default LoggedOut