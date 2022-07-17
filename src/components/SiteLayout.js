import Navbar from '@components/Shared/Navbar'
import NavbarTest from '@components/Shared/NavbarTest'

const SiteLayout = ({ children }) => {
    return (
      <div className="flex flex-col min-h-screen">
          <Navbar/>
          <div className="mx-auto max-w-7xl w-full px-2 py-2 sm:px-6 lg:px-8">
            {children}
          </div>
      </div>
    )
  }
  
  export default SiteLayout