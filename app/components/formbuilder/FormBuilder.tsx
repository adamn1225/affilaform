'use client'

import React, { useState } from 'react'
import FormBuilderSettings from './FormBuilderSettings'
import FormFieldList from './FormFieldList'
import type { FormBuilderProps } from './types'

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
    affiliateGA4ID,
    setAffiliateGA4ID,
    showAsModal,
    setShowAsModal,
    formWidth,
    setFormWidth,
}: FormBuilderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const updateField = (index: number, field: Partial<typeof fields[number]>) => {
        setFields((prev) => {
            const updated = [...prev]
            const current = updated[index]

            if (field.name) {
                const duplicate = updated.some((f, i) => i !== index && f.name === field.name)
                if (duplicate) {
                    alert('Field name must be unique.')
                    return prev
                }
            }

            updated[index] = { ...current, ...field }
            return updated
        })
    }

    const saveConfig = async () => {
        if (!formTitle.trim()) {
            alert('Form title is required.')
            return
        }

        if (!fields.length) {
            alert('Please add at least one field.')
            return
        }

        if (fields.some((f) => !f.name || !f.label)) {
            alert('Each field must have a name and label.')
            return
        }

        const payload = {
            affiliate_id: affiliateId,
            form_title: formTitle,
            button_text: buttonText,
            button_color: buttonColor,
            fields,
            affiliate_ga4_id: affiliateGA4ID,
            show_as_modal: showAsModal,
            form_width: formWidth,
        }

        try {
            const res = await fetch('http://localhost:8080/api/formconfig', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (res.status === 401) {
                setIsModalOpen(true)
                return
            }

            if (!res.ok) throw new Error('Save failed')

            const savedForm = await res.json()

            const iframe = `<iframe src="http://localhost:8080/embed/form?form_id=${savedForm.id}&affiliate=${affiliateId}&button_color=${encodeURIComponent(buttonColor)}&form_title=${encodeURIComponent(formTitle)}&utm_source=default&utm_medium=embed&utm_campaign=leadgen" style="width:100%;height:600px;" frameborder="0"></iframe>`

            onSave?.(iframe)
        } catch (err) {
            console.error('Save error:', err)
            alert('Save failed.')
        }
    }

    return (
        <div className="h-full">
            <h1 className="text-xl text-center md:text-start md:text-2xl font-bold pb-3">Affiliation Form Builder</h1>
            <p className="md:hidden tracking-tight text-base pb-3 font-semibold text-justify hyphens-auto">
                (For the best experience we recommend trying out the demo on desktop)
            </p>
            <FormBuilderSettings
                formTitle={formTitle}
                setFormTitle={setFormTitle}
                buttonText={buttonText}
                setButtonText={setButtonText}
                buttonColor={buttonColor}
                setButtonColor={setButtonColor}
                affiliateGA4ID={affiliateGA4ID}
                setAffiliateGA4ID={setAffiliateGA4ID}
                vendorGA4ID={''}
                setVendorGA4ID={() => { }}
                showAsModal={showAsModal}
                setShowAsModal={setShowAsModal}
                formWidth={formWidth}
                setFormWidth={setFormWidth}
            />
            <div className="space-y-2 h-auto overflow-y-auto mb-4 max-h-[80vh] w-full bg-gray-100 pt-1">


                <FormFieldList fields={fields} setFields={setFields} updateField={updateField} />

                <div className='flex flex-col gap-2 px-4 py-3 bg-white rounded shadow'>
                    <button
                        onClick={() =>
                            setFields((prev) => [
                                ...prev,
                                {
                                    type: 'spacer',
                                    name: `spacer-${prev.length + 1}`,
                                    label: `Spacer ${prev.length + 1}`, // Added required 'label' property
                                    height: 24,
                                    paddingTop: 0,
                                    paddingBottom: 0,
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
        </div>
    )
}
