import BannerPicture from '@components/Dashboard/BannerPicture'
import React from 'react'
import ProfileInfo from './ProfileInfo'
import TokenMinting from './TokenMinting'
import TokenOwned from './TokenOwned'
import TokenDoneMinting from './TokenDoneMinting'
import TokenCreatorView from './TokenCreatorView'
import ProfilePost from './ProfilePost'

const Profile = () => {
    return (
        <div className="bg-stone-100">
            {/* Banner image */}
            <BannerPicture
                cBannerPic="https://assets.vogue.com/photos/623df04d60af6495ed87fc19/16:9/w_1280,c_limit/161668_01800008_ed2e463d.jpeg"
            />
            {/* Banner content*/}
            <div className="">
                <div className="bg-stone-900/50 flex justify-center w-full h-[360px] items-center -mt-[360px]">
                    {/* Banner content */}
                    <div className="flex flex-row space-x-32 justify-center items-center ">
                        <ProfileInfo
                            cProfPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWJDhlIp_IIVCYzDx3i7Br4y_jQX1NFMKVQ_Net4I0HWPxUGXdQ8vNjqvgHKYKYP5jL0s&usqp=CAU"
                            cDisName="Olivia Rodrigo"
                            cUsername="@oliviarodrigo"
                            cTitle="Singer"
                            cBio="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium."
                            cWebsite="oliviarodrigo.com/or"
                            cTwitterLink="twitter.com/oliviarodrigo"
                            cIgLink="instagram.com/oliviarodrigo"
                            cYtLink="https://www.youtube.com/c/OliviaRodrigomusic/"
                            cTtLink="https://www.tiktok.com/@livbedumb"
                            creatorBool="True"
                        />
                        <TokenMinting
                            tokenName="Livies"
                            tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
                            percentMinted="45"
                            tokenRemaining="4600"
                            tokenSupply="5000"
                            tokenPrice="200"
                            mintLink="opensea.com" />
                        {/* <TokenOwned
                            tokenName="Livies"
                            tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
                            tokenNum="356"
                            tokenSupply="5000"
                            esLink="https://etherscan.io/"
                            osLink="https://opensea.io/" /> */}
                        {/* <TokenDoneMinting
                            tokenName="Livies"
                            tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
                            esLink="https://etherscan.io"
                            osCollLink="https://opensea.io" /> */}
                        {/* <TokenCreatorView
                            tokenName="Livies"
                            tokenPic="https://i.pinimg.com/564x/b2/a9/e2/b2a9e25600d0e4862aecdc263db8fa50.jpg"
                            percentMinted="45"
                            tokenRemaining="4600"
                            tokenSupply="5000"
                            esLink="https://etherscan.io"
                            osCollLink="https://opensea.io" /> */}
                    </div>


                </div>
            </div>
            <div className="flex flex-col space-y-2 px-[352px] py-8">
                <ProfilePost
                    postPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSol8wbdN8DpJ1zBICd61fpzJbk2KA7eBIqw&usqp=CAU"
                    postTitle="This is the title"
                    postContent="This is the content"
                    postDate="May 5, 2022"
                    uProfPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
                />
                <ProfilePost
                    postPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSol8wbdN8DpJ1zBICd61fpzJbk2KA7eBIqw&usqp=CAU"
                    postTitle="This is the title"
                    postContent="This is the content"
                    postDate="May 5, 2022"
                    uProfPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
                />
            </div>

        </div>

    )
}

export default Profile