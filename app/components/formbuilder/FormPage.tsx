'use client'

import { useState, useEffect } from 'react'
import FormBuilder from '@/components/formbuilder/FormBuilder'
import EmbedPreview from '@/components/formbuilder/EmbedPreview'
import { AnimatePresence, motion } from 'framer-motion'

type FormField = {
    label: string
    name: string
    placeholder: string
    type: string
    required: boolean
}

export default function FormPage() {
    const [affiliateId, setAffiliateId] = useState<number | null>(null)
    const [formTitle, setFormTitle] = useState('Your Custom Title')
    const [buttonColor, setButtonColor] = useState('#000000')
    const [buttonText, setButtonText] = useState('Submit Request')
    const [iframeCode, setIframeCode] = useState<string | null>(null)
    const [fields, setFields] = useState<FormField[]>([
        {
            label: '',
            name: '',
            placeholder: '',
            type: 'text',
            required: false,
        },
    ])

    const [affiliateGA4ID, setAffiliateGA4ID] = useState('')
    const [vendorGA4ID, setVendorGA4ID] = useState('')

    useEffect(() => {
        const draft = localStorage.getItem('formConfigDraft')
        if (draft) {
            try {
                const parsed = JSON.parse(draft)
                setFields(parsed.fields || [])
                setFormTitle(parsed.form_title || 'Your Custom Title')
                setButtonColor(parsed.button_color || '#000000')
                setButtonText(parsed.button_text || 'Submit Request')
                setAffiliateGA4ID(parsed.affiliate_ga4_id || '')
                setVendorGA4ID(parsed.vendor_ga4_id || '')
            } catch (err) {
                console.error('Invalid draft config')
            } finally {
                localStorage.removeItem('formConfigDraft')
            }
        }
    }, [])

    const liveConfig = {
        fields,
        form_title: formTitle,
        button_text: buttonText,
        button_color: buttonColor,
        affiliate_ga4_id: affiliateGA4ID,
        vendor_ga4_id: vendorGA4ID,
    }

    return (
        <div className="w-full py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded">
                <FormBuilder
                    fields={fields}
                    setFields={setFields}
                    formTitle={formTitle}
                    setFormTitle={setFormTitle}
                    buttonColor={buttonColor}
                    setButtonColor={setButtonColor}
                    buttonText={buttonText}
                    setButtonText={setButtonText}
                    affiliateId={affiliateId || 0}
                    setAffiliateId={setAffiliateId}
                    affiliateGA4ID={affiliateGA4ID}
                    setAffiliateGA4ID={setAffiliateGA4ID}
                    onSave={(iframe) => setIframeCode(iframe)}
                />

                <EmbedPreview liveConfig={liveConfig} />
            </div>

            {/* Embed Code Modal */}
            <AnimatePresence>
                {iframeCode && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                        >
                            <button
                                onClick={() => setIframeCode(null)}
                                className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-center">Your Embed Code</h2>
                            <textarea
                                value={iframeCode}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-100 text-sm"
                                rows={6}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
