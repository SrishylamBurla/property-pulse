import '@/assets/styles/globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GlobalProvider } from '@/context/GlobalContext'

export const metadata = {
  title: 'Property Pulse',
  keywords: 'real estate, property insights, market trends',
  description: 'Your go-to platform for real estate insights',
}
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
    <GlobalProvider>
    <html lang="en">
      <body>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ToastContainer />
      </body>
    </html>
    </GlobalProvider>
    </AuthProvider>
  )
}

export default MainLayout;