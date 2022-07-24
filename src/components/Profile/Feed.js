import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { useMoralis, useMoralisQuery, useMoralisWeb3Api } from "react-moralis";
import ProfilePost from './ProfilePost'

const Feed = () => {
    const [membership, setMembership] = useState()
    const [token, setToken] = useState()
    const [access, setAccess] = useState(0)
    const [feed, setFeed] = useState([])

    const { query: { id } } = useRouter()
    const { Moralis, isWeb3Enabled } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    const membershipQuery = useMoralisQuery(
        "MembershipLaunched",
        (query) => query.equalTo("user", id),
        [],
        { autoFetch: false }
    );

    async function checkAccess(token, address) {
        const options = {
            chain: "mumbai",
            address: address,
            token_address: token,
        };
        const membershipNFTs = await Web3Api.account.getNFTsForContract(options);
        const amountOwned = membershipNFTs["total"]
        if (amountOwned > 0) {
            setAccess(1)
        }
    }

    async function getMembership() {
        const results = await membershipQuery.fetch();
        console.log("MEMBERSHIP: ",results[0])
        setMembership(results[0]);
        if (membership) {
            setToken(membership.get("nftCollection"))
        }
    }

    const feedQuery = useMoralisQuery(
        "PostAdded",
        (query) => query.equalTo("creator", id),
        [],
        { autoFetch: false }
    );

    async function loadFeed() {
        const results = await feedQuery.fetch();
        // console.log("FEED: ", results);
        const fetchedPosts = JSON.parse(JSON.stringify(results, ["contentCid", "key", "block_timestamp"]));
        console.log("FETCHED: ", fetchedPosts);
        setFeed(fetchedPosts)
    }

    useEffect(() => {
        if (!token) {
            getMembership(id)
        } else {
            if (access === 0) {
                checkAccess(token, Moralis.account)
            } else {
                loadFeed(id)
            }
       }
    }, [isWeb3Enabled, membership, access])

  return (
    <div>
        {(access === 0) &&
        <div className="flex flex-col space-y-2 px-[352px] py-8">
            <h1>You do not have access</h1>
        </div>}
        {(access === 1) && feed &&
        <div className="flex flex-col space-y-2 px-[352px] py-8">
            {/* <ProfilePost
                postPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSol8wbdN8DpJ1zBICd61fpzJbk2KA7eBIqw&usqp=CAU"
                postTitle="This is the title"
                postContent="This is the content"
                postDate="May 5, 2022"
                uProfPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
            /> */}
            {feed.map((item) => (
                <ProfilePost 
                    postPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSol8wbdN8DpJ1zBICd61fpzJbk2KA7eBIqw&usqp=CAU"
                    postTitle="This is the title"
                    postContent="This is the content"
                    postDate="May 5, 2022"
                    uProfPic="https://img.okezone.com/content/2022/01/14/54/2532215/raup-miliaran-rupiah-dari-foto-selfie-di-nft-ghozali-buat-bantu-ibu-bayar-utang-mTcTgjWvm5.jpg"
                    contentCid={item.contentCid}
                    postKey={item.key}
                    creator={id}
                    key={item.key}
                    time={item.block_timestamp}
                    requiredNft={token}
                />
            ))}
        </div>}
    </div>
    
  )
}

export default Feed