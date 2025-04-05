'use client'
import { useRouter } from 'next/navigation'

export function VendorSignupButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/signup/vendor')
  }

  return (
    <button
      onClick={handleClick}
      className="bg-zinc-900 text-white py-2 px-4 rounded-md hover:bg-gray-950 transition-all"
    >
      Vendor Signup
    </button>
  )
}

export function AffiliateSignupButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/signup/affiliate')
  }

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
    >
      Affiliate Signup
    </button>
  )
}