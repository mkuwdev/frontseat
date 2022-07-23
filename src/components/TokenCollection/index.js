import TokenCard from './TokenCard'
import React from 'react'
import UserProfile from './UserProfile'

const TokenCollection = () => {
  return (
    <div className="flex flex-col items-center pt-8">
      <UserProfile
        uProfPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
        uDisName="Ghozali"
        uWalletAdd="0xb794f.....79268"
      />
      <div className="flex justify-center pt-8">
        <span className="font-clashg font-semibold text-2xl">Membership token collection</span>
      </div>
      <div className="bg-stone-100 grid grid-cols-3 p-10 gap-6 ">
        <TokenCard
          tokenName="Livies"
          tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
          tokenNum="356"
          tokenSupply="5000"
          esLink="https://etherscan.io/"
          osLink="https://opensea.io/" />
        <TokenCard
          tokenName="Livies"
          tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
          tokenNum="356"
          tokenSupply="5000"
          esLink="https://etherscan.io/"
          osLink="https://opensea.io/" />
        <TokenCard
          tokenName="Livies"
          tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
          tokenNum="356"
          tokenSupply="5000"
          esLink="https://etherscan.io/"
          osLink="https://opensea.io/" />
        <TokenCard
          tokenName="Livies"
          tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
          tokenNum="356"
          tokenSupply="5000"
          esLink="https://etherscan.io/"
          osLink="https://opensea.io/" />
        <TokenCard
          tokenName="Livies"
          tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
          tokenNum="356"
          tokenSupply="5000"
          esLink="https://etherscan.io/"
          osLink="https://opensea.io/" />
        <TokenCard
          tokenName="Livies"
          tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
          tokenNum="356"
          tokenSupply="5000"
          esLink="https://etherscan.io/"
          osLink="https://opensea.io/" />
        <TokenCard
          tokenName="Livies"
          tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
          tokenNum="356"
          tokenSupply="5000"
          esLink="https://etherscan.io/"
          osLink="https://opensea.io/" />
        <TokenCard
          tokenName="Livies"
          tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
          tokenNum="356"
          tokenSupply="5000"
          esLink="https://etherscan.io/"
          osLink="https://opensea.io/" />
        <TokenCard
          tokenName="Livies"
          tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
          tokenNum="356"
          tokenSupply="5000"
          esLink="https://etherscan.io/"
          osLink="https://opensea.io/" />
      </div>
    </div>

  )
}

export default TokenCollection