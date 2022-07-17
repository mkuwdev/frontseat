import Navbar from '@components/Shared/Navbar'
import NextNProgress from "nextjs-progressbar";

const SiteLayout = ({ children }) => {
    return (
      <div className="flex flex-col min-h-screen">
          <NextNProgress 
            height={3} 
            color="#000000"
            options={{ showSpinner: false }}
          />
          <Navbar/>
          <div className="mx-auto max-w-7xl w-full px-2 py-2 sm:px-6 lg:px-8">
            {children}
          </div>
      </div>
    )
  }
  
  export default SiteLayout