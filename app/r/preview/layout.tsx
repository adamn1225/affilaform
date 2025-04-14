import { AuthProvider } from '@/context/UserContext'
import { Toaster } from 'react-hot-toast'
import '../../globals.css'
export default function RotatorPublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-gray-50">
        <div className="flex-grow">
          <div>
            {children}
          </div>
          <Toaster position="top-center" />
        </div>
      </body>
    </html>
  )
}
