import { AuthProvider } from '@/context/UserContext'
import { Toaster } from 'react-hot-toast'

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      {children}
    </AuthProvider>
  )
}
