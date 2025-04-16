'use client'

import React, { useState } from 'react'
import FormBuilderSettings from './FormBuilderSettings'
import FormFieldList from './FormFieldList'
import { FormField } from './types'

interface FormBuilderProps {
    fields: FormField[]
    setFields: React.Dispatch<React.SetStateAction<FormField[]>>
    formTitle: string
    setFormTitle: (val: string) => void
    buttonColor: string
    setButtonColor: (val: string) => void
    buttonText: string
    setButtonText: (val: string) => void
    affiliateId: number
    setAffiliateId: (val: number) => void
    onSave?: (iframeCode: string) => void
    affiliateGA4ID: string
    setAffiliateGA4ID: (val: string) => void
}

export default function FormBuilder({
    fields,
    setFields,
    formTitle,
    setFormTitle,
    buttonColor,
    setButtonColor,
    buttonText,
    setButtonText,
    affiliateId,
    setAffiliateId,
    onSave,
}: FormBuilderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [affiliateGA4ID, setAffiliateGA4ID] = useState('')
    const [vendorGA4ID, setVendorGA4ID] = useState('')

    const updateField = (index: number, field: Partial<FormField>) => {
        setFields((prev) => {
            const updated = [...prev]
            const currentField = updated[index]

            if (field.name) {
                const isDuplicate = updated.some((f, i) => i !== index && f.name === field.name)
                if (isDuplicate) {
                    alert('Field name must be unique.')
                    return prev
                }
            }

            updated[index] = { ...currentField, ...field }
            return updated
        })
    }

    const saveConfig = async () => {
        const payload = {
            affiliate_id: affiliateId,
            form_title: formTitle,
            button_text: buttonText,
            button_color: buttonColor,
            fields,
            affiliate_ga4_id: affiliateGA4ID,
            vendor_ga4_id: vendorGA4ID,
        }

        try {
            const res = await fetch('http://localhost:8080/api/formconfig', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (res.status === 401) {
                setIsModalOpen(true)
                return
            }

            if (!res.ok) {
                throw new Error('Failed to save form config')
            }
            if (!formTitle.trim()) {
                alert('Form title is required');
                return;
            }
            if (!fields.length) {
                alert('Please add at least one field.');
                return;
            }
            const hasInvalid = fields.some(f => !f.name || !f.label);
            if (hasInvalid) {
                alert('Each field must have a name and label.');
                return;
            }

            const savedForm = await res.json()

            const iframe = `<iframe src="http://localhost:8080/embed/form?form_id=${savedForm.id}&affiliate=${affiliateId}&button_color=${encodeURIComponent(
                buttonColor
            )}&form_title=${encodeURIComponent(
                formTitle
            )}&utm_source=default&utm_medium=embed&utm_campaign=leadgen" style="width:100%;height:600px;" frameborder="0"></iframe>`

            onSave?.(iframe)
        } catch (err) {
            console.error('Save error:', err)
            alert('Save failed.')
        }
    }

    return (
        <div className="md:p-6 h-full md:max-w-6xl md:mx-auto">
            <h1 className="text-xl text-center md:text-start md:text-2xl font-bold pb-3">Affiliation Form Builder</h1>
            <p className="md:hidden tracking-tight text-base pb-3 font-semibold text-justify hyphens-auto">
                (For the best experience we recommend trying out the demo on desktop)
            </p>

            <div className="space-y-4 h-full overflow-y-auto max-h-[70vh] bg-gray-50 md:p-4 rounded">
                <FormBuilderSettings
                    formTitle={formTitle}
                    setFormTitle={setFormTitle}
                    buttonText={buttonText}
                    setButtonText={setButtonText}
                    buttonColor={buttonColor}
                    setButtonColor={setButtonColor}
                    affiliateGA4ID={affiliateGA4ID}
                    setAffiliateGA4ID={setAffiliateGA4ID}
                    vendorGA4ID={vendorGA4ID}
                    setVendorGA4ID={setVendorGA4ID}
                />

                <FormFieldList fields={fields} setFields={setFields} updateField={updateField} />

                <button
                    onClick={() =>
                        setFields((prev) => [
                            ...prev,
                            {
                                label: '',
                                name: `field-${prev.length + 1}`,
                                placeholder: '',
                                type: 'text',
                                required: false,
                            },
                        ])
                    }
                    className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
                >
                    + Add Field
                </button>

                <button
                    onClick={saveConfig}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    Save Form
                </button>
            </div>
        </div>
    )
}
