'use client'

import { useState, useEffect } from 'react'
import FormBuilder from '@/components/FormBuilder'
import EmbedPreview from '@/components/EmbedPreview'
import { AnimatePresence, motion } from 'framer-motion'
import { FormField } from '@/components/FormBuilder'

export default function FormBuilderPage() {
  const [affiliateId, setAffiliateId] = useState('preview-mode')
  const [formTitle, setFormTitle] = useState('Your Custom Title')
  const [buttonColor, setButtonColor] = useState('#000000')
  const [buttonText, setButtonText] = useState('Submit Request')
  const [iframeCode, setIframeCode] = useState<string | null>(null)
  const [fields, setFields] = useState<FormField[]>([{
    label: '',
    name: '',
    placeholder: '',
    type: 'text',
    required: false
  }])

  const liveConfig = {
    fields,
    form_title: formTitle,
    button_text: buttonText,
    button_color: buttonColor,
  }

  useEffect(() => {
    const draft = localStorage.getItem('formConfigDraft')
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        setFields(parsed.fields || [])
        setFormTitle(parsed.form_title || 'Your Custom Title')
        setButtonColor(parsed.button_color || '#000000')
        setButtonText(parsed.button_text || 'Submit Request')
      } catch (err) {
        console.error('Invalid draft config')
      } finally {
        localStorage.removeItem('formConfigDraft')
      }
    }
  }, [])
  

  return (
    <>
      <div className="w-full py-12">

        <div className="grid grid-cols-2 gap-6 p-6 rounded border-gray-100 shadow">
          <FormBuilder
            fields={fields}
            setFields={setFields}
            formTitle={formTitle}
            setFormTitle={setFormTitle}
            buttonColor={buttonColor}
            setButtonColor={setButtonColor}
            buttonText={buttonText}
            setButtonText={setButtonText}
            affiliateId={affiliateId}
            setAffiliateId={setAffiliateId}
            onSave={(iframe) => setIframeCode(iframe)}
          />

          <EmbedPreview
            liveConfig={liveConfig}
          />
        </div>

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
    </>
  )
}