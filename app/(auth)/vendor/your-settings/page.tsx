import UserSettings from '@/components/UserSettings';

export default function VendorSettingsPage() {
    return (
        <div className="py-6 w-full">
            <div className='flex flex-col justify-center items-center w-full'>
                <h1 className="text-2xl font-bold">Your Personal Settings</h1>
                <p className="mt-2 text-gray-600">Manage your account settings and preferences.</p>
                <p className="mt-2 text-gray-600">Make sure to save your changes before leaving this page.</p>
            </div>
            <UserSettings />
        </div>

    )

}