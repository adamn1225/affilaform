import { AuthProvider } from '@/context/UserContext';
import { Toaster } from 'react-hot-toast';
import '../../globals.css';
import AffiliateSideNav from '@/components/affiliates/AffiliateSideNav';

export default function AffilLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="flex bg-gray-50 min-w-screen min-h-screen">

                <AuthProvider>
                    <AffiliateSideNav />
                    <Toaster position="top-right" />
                    <div className="flex-1 md:ml-64 p-6">
                        {children} {/* Dynamically render the content of the current route */}
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}