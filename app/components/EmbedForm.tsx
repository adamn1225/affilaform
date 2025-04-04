'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

type FormField = {
    label: string
    name: string
    placeholder: string
    type: string
    required: boolean
}

const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
}

export default function DynamicForm() {
    const searchParams = useSearchParams()
    const affiliateId = searchParams.get('affiliate') || 'unknown'

    const [formFields, setFormFields] = useState<FormField[]>([])
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [formTitle, setFormTitle] = useState('Request a Transport Quote')
    const [buttonColor, setButtonColor] = useState('#000000')
    const [buttonText, setButtonText] = useState('Submit Request')

    const [step, setStep] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(`https://affiliate-tracking.onrender.com/api/formconfig/${affiliateId}`)
            .then((res) => res.json())
            .then((data) => {
                const fields: FormField[] = JSON.parse(data.fields)
                setFormFields(fields)
                setFormTitle(data.form_title || 'Request a Transport Quote')
                setButtonColor(data.button_color || '#000000')
                setButtonText(data.button_text || 'Submit Request')
                const initialData = Object.fromEntries(fields.map(f => [f.name, '']))
                setFormData(initialData)
            })
    }, [affiliateId])

    const fieldsPerStep = 3
    const totalSteps = Math.ceil(formFields.length / fieldsPerStep)

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('https://affiliate-tracking.onrender.com/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, affiliate_id: affiliateId }),
            })

            if (res.ok) setSubmitted(true)
            else alert('Submission failed')
        } catch {
            alert('Error connecting to server')
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="text-center space-y-2 p-6">
                <h2 className="text-2xl font-semibold">Thank you!</h2>
                <p>Your submission was received.</p>
            </div>
        )
    }

    const currentFields = formFields.slice(step * fieldsPerStep, (step + 1) * fieldsPerStep)

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-xl mx-auto bg-white rounded shadow">
            <h2 className="text-xl font-bold text-center">{formTitle}</h2>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-4"
                >
                    {currentFields.map((field) => (
                        <input
                            key={field.name}
                            required={field.required}
                            placeholder={field.placeholder}
                            type={field.type}
                            className="w-full border p-2 rounded"
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-4">
                {step > 0 && (
                    <button
                        type="button"
                        onClick={() => setStep(prev => prev - 1)}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Back
                    </button>
                )}

                {step < totalSteps - 1 ? (
                    <button
                        type="button"
                        onClick={() => setStep(prev => prev + 1)}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        type="submit"
                        style={{ backgroundColor: buttonColor }}
                        className="text-white px-4 py-2 rounded hover:opacity-90"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : buttonText}
                    </button>
                )}
            </div>
        </form>
    )
}
