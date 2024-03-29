import '../globals.css'
import Head from "next/head"
import SiteLayout from '@components/SiteLayout'
import { MoralisProvider } from "react-moralis"

const APP_ID = process.env.NEXT_PUBLIC_APP_ID
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>frontseat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </MoralisProvider>
    </div>
  )
}

export default MyApp
