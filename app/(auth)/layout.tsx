import { AuthProvider } from '@/context/UserContext'
import { Toaster } from 'react-hot-toast'
import '../globals.css'
import VendorTopNav from '@/components/VendorTopNav'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='flex flex-col bg-gray-50 min-w-screen min-h-screen'>
        <AuthProvider>
          <VendorTopNav />
          <Toaster position="top-right" />
          <div className='flex-grow'>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}