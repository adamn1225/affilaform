'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export type FormField = {
    label: string
    name: string
    placeholder: string
    type: string
    required: boolean
    config?: FormConfig;
    options?: { value: string; label: string }[] // Optional for select and radio fields
}

export type FormConfig = {
    fields: FormField[]
    form_title: string
    button_text: string
    button_color: string
    config?: FormConfig
}


export default function DynamicForm({ config }: { config?: FormConfig }) {
    const searchParams = useSearchParams()
    const affiliateId = searchParams.get('affiliate') || 'preview-mode'

    const [formConfig, setFormConfig] = useState<FormConfig | null>(config || null)
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(!config)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (config) return; // skip fetching if config is provided

        const fetchConfig = async () => {
            const res = await fetch(`http://localhost:8080/api/formconfig/${affiliateId}`);
            const data = await res.json();
            if (Array.isArray(data.fields)) {
                setFormConfig(data);
            } else {
                console.error("Expected 'fields' to be an array");
            }
            setLoading(false);
        };

        fetchConfig();
    }, [affiliateId, config]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('http://localhost:8080/api/leads', {
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

            {formConfig?.fields?.map((field) => (
                <div key={field.name} className="w-full">
                    <label className="block text-sm font-medium mb-1">{field.label}</label>

                    {field.type === 'textarea' ? (
                        <textarea
                            name={field.name}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                    ) : field.type === 'select' ? (
                        <select
                            name={field.name}
                            required={field.required}
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select...</option>
                            {field.options?.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    ) : field.type === 'radio' ? (
                        <div className="space-y-1">
                            {field.options?.map((opt) => (
                                <label key={opt.value} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name={field.name}
                                        value={opt.value}
                                        checked={formData[field.name] === opt.value}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                        required={field.required}
                                    />
                                    {opt.label}
                                </label>
                            ))}
                        </div>
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                    )}
                </div>
            ))}



            <button
                type="submit"
                className="text-white px-4 py-2 rounded w-full"
                style={{ backgroundColor: formConfig?.button_color || '#000' }}
            >
                {formConfig?.button_text || 'Submit Request'}
            </button>
        </form>
    )
}
