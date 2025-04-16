// components/FormBuilder/FieldEditor.tsx
'use client'
import React from 'react'
import { FormField } from './types'

type Props = {
    field: FormField
    index: number
    updateField: (index: number, field: Partial<FormField>) => void
    removeField: (index: number) => void
}

export default function FieldEditor({ field, index, updateField, removeField }: Props) {
    return (
        <div className="border border-gray-200 shadow p-4 rounded bg-white">
            <h4 className="font-medium text-gray-700">Field {index + 1}</h4>

            {/* Type Selector */}
            <select
                value={field.type}
                onChange={(e) => updateField(index, { type: e.target.value })}
                className="border p-2 rounded w-full mt-2"
            >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="tel">Phone</option>
                <option value="number">Number</option>
                <option value="textarea">Textarea</option>
                <option value="select">Select</option>
                <option value="radio">Radio</option>
            </select>

            {/* Name/Label/Placeholder/Required */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                    placeholder="Name"
                    value={field.name}
                    onChange={(e) => updateField(index, { name: e.target.value })}
                    className="border p-2 rounded bg-white"
                />
                <input
                    placeholder="Label"
                    value={field.label}
                    onChange={(e) => updateField(index, { label: e.target.value })}
                    className="border p-2 rounded bg-white"
                />
                {field.type !== 'select' && field.type !== 'radio' && field.type !== 'textarea' && (
                    <input
                        placeholder="Placeholder"
                        value={field.placeholder}
                        onChange={(e) => updateField(index, { placeholder: e.target.value })}
                        className="border p-2 rounded bg-white"
                    />
                )}
            </div>

            {/* Required checkbox + Delete */}
            <div className="flex items-center justify-between mt-4">
                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(index, { required: e.target.checked })}
                    />
                    Required
                </label>
                <button onClick={() => removeField(index)} className="text-red-500 hover:underline">
                    Remove Field
                </button>
            </div>
        </div>
    )
}
