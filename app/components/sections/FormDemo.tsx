'use client'
import { useRouter } from 'next/navigation'

export default function FormDemo() {
  const router = useRouter()

  const handlePreviewClick = () => {
    router.push('/form-builder-demo')
  }

  return (
    <div className="flex flex-col justify-center items-center py-16 w-full bg-white">
      <div className="bg-gray-50 md:min-w-3xl rounded-lg shadow-md p-6 max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Form Demo</h2>
        <p className="mb-6 text-base text-zinc-950">
          Click the button below to preview the affiliation form builder in action. No sign-up required!
        </p>
        <button
          onClick={handlePreviewClick}
          className=" py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          AffilaForm Builder Demo
        </button>
      </div>
    </div>
  )
}