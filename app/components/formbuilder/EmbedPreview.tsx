'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FormField, FormConfig, FormOption, FormWidth } from './types'


type Props = {
    liveConfig: FormConfig
}

export default function EmbedPreview({ liveConfig }: Props) {

    const isFieldVisible = (field: FormField): boolean => {
        if (!field.conditional) return true
        const actual = fieldValues[field.conditional.field]
        const expected = field.conditional.value
        if (field.conditional.operator === 'equals') return actual === expected
        if (field.conditional.operator === 'notEquals') return actual !== expected
        return true
    }

    const [step, setStep] = useState(1)
    const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
    const [showAsModal, setShowAsModal] = useState(liveConfig.showAsModal)

    useEffect(() => {
        setShowAsModal(liveConfig.showAsModal);
    }, [liveConfig.showAsModal]);
    // Randomly assign variant A or B (can be improved to persist in localStorage or A/B test framework)
    const variant: 'A' | 'B' = useMemo(() => (Math.random() > 0.5 ? 'A' : 'B'), [])

    const fieldsByStep = useMemo(() => {
        const stepMap = new Map<number, FormField[]>()
        liveConfig.fields.forEach((field) => {
            const fieldStep = field.step || 1
            if (!field.variant || field.variant === variant) {
                if (!stepMap.has(fieldStep)) stepMap.set(fieldStep, [])
                stepMap.get(fieldStep)!.push(field)
            }
        })
        return stepMap
    }, [liveConfig.fields, variant])

    const steps = Array.from(fieldsByStep.keys()).sort((a, b) => a - b)
    const maxStep = steps[steps.length - 1] || 1

    const currentFields = fieldsByStep.get(step) || []
    const currentStepTitle = currentFields[0]?.stepTitle || `Step ${step}`

    // Auto scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [step])

    const validateStep = () => {
        for (let field of currentFields) {
            if (field.required) {
                const el = document.querySelector(`[name="${field.name}"]`) as HTMLInputElement
                if (!el || !el.value.trim()) return false
            }
        }
        return true
    }

    const handleNext = () => {
        if (!validateStep()) {
            alert('Please fill all required fields for this step')
            return
        }
        setStep((s) => Math.min(s + 1, maxStep))
    }

    const handleBack = () => setStep((s) => Math.max(s - 1, 1))

    const getWidthClass = (width?: string) => {
        switch (width) {
            case 'sm': return 'max-w-md';
            case 'md': return 'max-w-xl';
            case 'lg': return 'max-w-2xl';
            case 'full': return 'w-full';
            default: return 'max-w-xl';
        }
    };


    return (
        <div className="mt-6 w-full">
            <h3 className="text-xl font-semibold mb-2">Live Form Preview</h3>
            <div className="">

                {showAsModal ? (
                    <div className="fixed inset-0 z-50 bg-gray-950/80 flex items-center justify-center">

                        <div className="bg-white max-h-[90vh] overflow-y-auto rounded-lg shadow-lg px-4 pb-6 pt-3 w-full max-w-2xl">
                            <button
                                type="button"
                                onClick={() => setShowAsModal(false)}
                                className="relative top-0 right-1 text-2xl text-gray-900 hover:text-gray-700"
                            >
                                &times;
                            </button>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <form className="space-y-4 w-full" onSubmit={(e) => e.preventDefault()}>
                                        <h2 className="text-xl font-bold text-center mb-4">{liveConfig.form_title}</h2>

                                        {maxStep > 1 && (
                                            <>
                                                <div className="w-full bg-gray-200 rounded h-2 mb-4 overflow-hidden">
                                                    <div
                                                        className="bg-blue-500 h-2 transition-all duration-300"
                                                        style={{ width: `${(step / maxStep) * 100}%` }}
                                                    />
                                                </div>

                                                <h4 className="text-lg font-semibold text-gray-700">{currentStepTitle}</h4>
                                            </>
                                        )}
                                        {Object.values(
                                            currentFields.reduce<Record<string, FormField[]>>((acc, field) => {
                                                if (!isFieldVisible(field)) return acc;
                                                const group = field.groupId || `__${field.name}`;
                                                if (!acc[group]) acc[group] = [];
                                                acc[group].push(field);
                                                return acc;
                                            }, {})
                                        ).map((group, groupIndex) => (
                                            <div
                                                key={`group-${groupIndex}`}
                                                className={`w-full ${group.length > 1 ? 'flex gap-4' : ''}`}
                                            >

                                                {group.map((field, index) => {
                                                    if (field.type === 'spacer') {
                                                        return (
                                                            <div
                                                                key={field.name || `spacer-${index}`}
                                                                style={{
                                                                    height: field.spacerHeight || 24,
                                                                    paddingTop: field.paddingTop || 0,
                                                                    paddingBottom: field.paddingBottom || 0,
                                                                }}
                                                                className="w-full"
                                                            />
                                                        )
                                                    }

                                                    return (
                                                        <div key={field.name || `field-${index}`} className="flex-1">
                                                            <label className="block text-sm font-medium mb-1">{field.label}</label>

                                                            {field.type === 'textarea' ? (
                                                                <textarea
                                                                    name={field.name}
                                                                    placeholder={field.placeholder}
                                                                    required={field.required}
                                                                    onChange={(e) => {
                                                                        setFieldValues(prev => ({ ...prev, [field.name]: e.target.value }))
                                                                    }}
                                                                    className="w-full border p-2 rounded bg-white"
                                                                />
                                                            ) : field.type === 'select' ? (
                                                                <select
                                                                    name={field.name}
                                                                    required={field.required}
                                                                    onChange={(e) => {
                                                                        setFieldValues(prev => ({ ...prev, [field.name]: e.target.value }))
                                                                    }}
                                                                    className="w-full border p-2 rounded bg-white"
                                                                >
                                                                    <option value="">Select...</option>
                                                                    {field.options?.map((opt, i) => (
                                                                        <option key={opt.value || `option-${i}`} value={opt.value}>
                                                                            {opt.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            ) : field.type === 'radio' ? (
                                                                <div className="space-y-1">
                                                                    {field.options?.map((opt, i) => (
                                                                        <label
                                                                            key={opt.value || `radio-${i}`}
                                                                            className="flex items-center gap-2"
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                name={field.name}
                                                                                value={opt.value}
                                                                                required={field.required}
                                                                                onChange={(e) => {
                                                                                    setFieldValues(prev => ({ ...prev, [field.name]: e.target.value }))
                                                                                }}
                                                                            />
                                                                            {opt.label}
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <input
                                                                    type={field.type}
                                                                    name={field.name}
                                                                    placeholder={field.placeholder}
                                                                    required={field.required}
                                                                    onChange={(e) => {
                                                                        setFieldValues(prev => ({ ...prev, [field.name]: e.target.value }))
                                                                    }}
                                                                    className="w-full border p-2 rounded bg-white"
                                                                />
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ))}
                                        {/* Step Navigation */}
                                        <div className="flex justify-between gap-4 pt-4">
                                            {step > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={handleBack}
                                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                                >
                                                    Back
                                                </button>
                                            )}
                                            {step < maxStep ? (
                                                <button
                                                    type="button"
                                                    onClick={handleNext}
                                                    className="ml-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                                                >
                                                    Next
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="ml-auto text-white px-4 py-2 rounded"
                                                    style={{ backgroundColor: liveConfig.button_color }}
                                                >
                                                    {liveConfig.button_text}
                                                </button>
                                            )}
                                        </div>
                                    </form>

                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <div className={`border w-full border-gray-200 shadow rounded p-6 bg-gray-50 ${getWidthClass(liveConfig.width)}`}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4 w-full"
                            >
                                <form className="space-y-4 w-full" onSubmit={(e) => e.preventDefault()}>
                                    <h2 className="text-xl font-bold text-center mb-4">{liveConfig.form_title}</h2>

                                    {maxStep > 1 && (
                                        <>
                                            <div className="w-full bg-gray-200 rounded h-2 mb-4 overflow-hidden">
                                                <div
                                                    className="bg-blue-500 h-2 transition-all duration-300"
                                                    style={{ width: `${(step / maxStep) * 100}%` }}
                                                />
                                            </div>

                                            <h4 className="text-lg font-semibold text-gray-700">{currentStepTitle}</h4>
                                        </>
                                    )}
                                    {Object.values(
                                        currentFields.reduce<Record<string, FormField[]>>((acc, field) => {
                                            if (!isFieldVisible(field)) return acc;
                                            const group = field.groupId || `__${field.name}`;
                                            if (!acc[group]) acc[group] = [];
                                            acc[group].push(field);
                                            return acc;
                                        }, {})
                                    ).map((group, groupIndex) => (
                                        <div
                                            key={`group-${groupIndex}`}
                                            className={`w-full ${group.length > 1 ? 'flex gap-4' : ''}`}
                                        >
                                            {group.map((field, index) => {
                                                if (field.type === 'spacer') {
                                                    return (
                                                        <div
                                                            key={field.name || `spacer-${index}`}
                                                            style={{
                                                                height: field.spacerHeight || 24,
                                                                paddingTop: field.paddingTop || 0,
                                                                paddingBottom: field.paddingBottom || 0,
                                                            }}
                                                            className="w-full"
                                                        />
                                                    )
                                                }

                                                return (
                                                    <div key={field.name || `field-${index}`} className="flex-1">
                                                        <label className="block text-sm font-medium mb-1">{field.label}</label>

                                                        {field.type === 'textarea' ? (
                                                            <textarea
                                                                name={field.name}
                                                                placeholder={field.placeholder}
                                                                required={field.required}
                                                                className="w-full border p-2 rounded bg-white"
                                                            />
                                                        ) : field.type === 'select' ? (
                                                            <select
                                                                name={field.name}
                                                                required={field.required}
                                                                className="w-full border p-2 rounded bg-white"
                                                            >
                                                                <option value="">Select...</option>
                                                                {field.options?.map((opt, i) => (
                                                                    <option key={opt.value || `option-${i}`} value={opt.value}>
                                                                        {opt.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        ) : field.type === 'radio' ? (
                                                            <div className="space-y-1">
                                                                {field.options?.map((opt, i) => (
                                                                    <label
                                                                        key={opt.value || `radio-${i}`}
                                                                        className="flex items-center gap-2"
                                                                    >
                                                                        <input
                                                                            type="radio"
                                                                            name={field.name}
                                                                            value={opt.value}
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
                                                                placeholder={field.placeholder}
                                                                required={field.required}
                                                                className="w-full border p-2 rounded bg-white"
                                                            />
                                                        )}
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    ))}
                                    {/* Step Navigation */}
                                    <div className="flex justify-between gap-4 pt-4">
                                        {step > 1 && (
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                            >
                                                Back
                                            </button>
                                        )}
                                        {step < maxStep ? (
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="ml-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                                            >
                                                Next
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="ml-auto text-white px-4 py-2 rounded"
                                                style={{ backgroundColor: liveConfig.button_color }}
                                            >
                                                {liveConfig.button_text}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {/* GA4 Debug Info */}
                {(liveConfig.affiliate_ga4_id || liveConfig.vendor_ga4_id) && (
                    <div className="mt-4 text-sm text-gray-500 space-y-1">
                        {liveConfig.affiliate_ga4_id && (
                            <p>Affiliate GA4 ID: <code>{liveConfig.affiliate_ga4_id}</code></p>
                        )}
                        {liveConfig.vendor_ga4_id && (
                            <p>Vendor GA4 ID: <code>{liveConfig.vendor_ga4_id}</code></p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
