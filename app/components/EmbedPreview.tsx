'use client'
import React from 'react'
import { FormConfig } from './FormBuilder'

type Props = {
    liveConfig: FormConfig // Ensure the type matches the expected structure
}

export default function EmbedPreview({ liveConfig }: Props) {
    return (
        <div className="mt-6 w-full">
            <h3 className="text-xl font-semibold mb-2">Live Form Preview</h3>
            <div className="border border-gray-200 shadow rounded p-4 bg-gray-50">
                <form className="space-y-4">
                    <h2 className="text-xl font-bold text-center">{liveConfig.form_title}</h2>

                    {liveConfig.fields.map((field, index) => (
                        <div key={field.name || `field-${index}`} className="w-full">
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
                                        <label key={opt.value || `radio-${i}`} className="flex items-center gap-2">
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
                    ))}

                    <button
                        type="button"
                        className="text-white px-4 py-2 rounded w-full"
                        style={{ backgroundColor: liveConfig.button_color }}
                    >
                        {liveConfig.button_text}
                    </button>
                </form>
            </div>
        </div>
    )
}