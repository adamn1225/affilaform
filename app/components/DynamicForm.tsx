'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type FormField = {
    label: string
    name: string
    placeholder: string
    type: string
    required: boolean
}

type FormConfig = {
    fields: FormField[]
    form_title: string
    button_text: string
    button_color: string
}

export default function DynamicForm() {
    const searchParams = useSearchParams()
    const affiliateId = searchParams.get('affiliate') || 'preview-mode'
    const [formConfig, setFormConfig] = useState<FormConfig | null>(null)
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        fetch(`https://affiliate-tracking.onrender.com/api/formconfig/${affiliateId}`)
            .then((res) => res.json())
            .then((data) => {
                setFormConfig(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [affiliateId])

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('https://affiliate-tracking.onrender.com/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, affiliate_id: affiliateId }),
        })

        if (res.ok) setSubmitted(true)
    }

    if (loading) return <p>Loading form...</p>
    if (!formConfig) return <p>Unable to load form</p>
    if (submitted) return <p className="text-green-600 font-bold">Thanks for submitting!</p>

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-center">{formConfig.form_title}</h2>

            {formConfig.fields.map((field) => (
                <div key={field.name}>
                    <label className="block font-medium mb-1">{field.label}</label>
                    <input
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>
            ))}

            <button
                type="submit"
                style={{ backgroundColor: formConfig.button_color }}
                className="text-white px-4 py-2 rounded hover:opacity-90"
            >
                {formConfig.button_text || 'Submit'}
            </button>
        </form>
    )
}
