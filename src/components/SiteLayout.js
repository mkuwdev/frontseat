import Navbar from '@components/Shared/Navbar'

const SiteLayout = ({ children }) => {
    return (
      <div className="flex flex-col min-h-screen">
          <Navbar/>
          <div className="max-w-7xl px-2 py-2 sm:px-6 lg:px-8">
            {children}
          </div>
      </div>
    )
  }
  
  export default SiteLayout