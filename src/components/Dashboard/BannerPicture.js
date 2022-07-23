import React from 'react'

const BannerPicture = ({ cBannerPic }) => {
    return (
        <div>
            <div
                className="w-full h-[360px] bg-cover"
                style={{
                    backgroundImage:`url(${cBannerPic})`}}
            >
                <span
                    id="blackOverlay"
                    className="opacity-50 bg-black"
                ></span>
            </div>
        </div>
    )
}

export default BannerPicture