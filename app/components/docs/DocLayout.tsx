import SidebarNav from './SidebarNav'

export default function DocLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-screen">
            <aside className="bg-gray-100 p-4 border-r">
                <SidebarNav />
            </aside>
            <main className="p-6 overflow-y-auto">{children}</main>
        </div>
    )
}
