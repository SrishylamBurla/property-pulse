import '@/assets/styles/globals.css'

export const metadata = {
  title: 'Property Pulse',
  keywords: 'real estate, property insights, market trends',
  description: 'Your go-to platform for real estate insights',
}
const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default MainLayout;