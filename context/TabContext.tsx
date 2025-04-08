'use client'
import { createContext, useContext, useState } from 'react'

type Tab = 'forms' | 'submissions' | 'builder'

const TabContext = createContext<{
    tab: Tab
    setTab: (tab: Tab) => void
}>({
    tab: 'forms',
    setTab: () => { },
})

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
    const [tab, setTab] = useState<Tab>('forms')
    return (
        <TabContext.Provider value={{ tab, setTab }}>
            {children}
        </TabContext.Provider>
    )
}

export const useTab = () => useContext(TabContext)
