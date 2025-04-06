import SignupForm from '@/components/forms/SignupForm'

export default function VendorSignupPage() {
  return (
  <main className='w-screen max-w-3xl mx-auto p-6 flex flex-col items-center gap-8 mt-8'>
   <div className='flex gap-2'>
      <SignupForm role="vendor" />
      <SignupForm role="affiliate" />
   </div>
  </main>
)
}
