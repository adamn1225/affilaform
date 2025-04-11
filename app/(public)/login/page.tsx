'use client'
import React, { useEffect } from 'react'
import LoginForm from '@/components/forms/LoginForm'
import { redirect } from 'next/navigation'


export default function LoginPage() {
    useEffect(() => {
        const checkLogin = async () => {
            const res = await fetch('/api/me', { credentials: 'include' })
            if (res.ok) {
                const { user } = await res.json()
                redirect(`/${user.role}/dashboard`)
            }
        }
        checkLogin()
    }, [])

    return (
        <div className="flex mt-8 justify-evenly gap-8">
            <div><LoginForm role="vendor" /></div>
            <div><LoginForm role="affiliate" /></div>
        </div>
    )
}