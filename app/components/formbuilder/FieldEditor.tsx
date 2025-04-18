// components/FormBuilder/FieldEditor.tsx
'use client'
import React from 'react'
import type { FormField, FormConfig, FormOption, FormWidth } from './types'
import { Info } from 'lucide-react'

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
            <div className='flex justify-end'>
                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(index, { required: e.target.checked })}
                    />
                    Required?
                </label>
            </div>
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
                <option value="spacer">Spacer</option>
            </select>

            {field.type === 'spacer' ? (
                <>
                    <p className="text-sm font-semibold mt-4">Spacer Settings</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                        <input
                            type="number"
                            placeholder="Height (px)"
                            value={field.spacerHeight || ''}
                            onChange={(e) => updateField(index, { spacerHeight: parseInt(e.target.value, 10) || 0 })}
                            className="border p-2 rounded bg-white"
                        />
                        <input
                            type="number"
                            placeholder="Padding Top"
                            value={field.paddingTop || ''}
                            onChange={(e) => updateField(index, { paddingTop: parseInt(e.target.value, 10) || 0 })}
                            className="border p-2 rounded bg-white"
                        />
                        <input
                            type="number"
                            placeholder="Padding Bottom"
                            value={field.paddingBottom || ''}
                            onChange={(e) => updateField(index, { paddingBottom: parseInt(e.target.value, 10) || 0 })}
                            className="border p-2 rounded bg-white"
                        />
                    </div>
                </>
            ) : (
                <>
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
                </>
            )}


            {/* Required checkbox + Delete */}
            <div className="flex items-center justify-between mt-4">
                <div className='flex gap-4 items-center'>

                    <span className='flex gap-1 items-center'>
                        <label className="flex items-center gap-2 font-medium"> Step
                            <input
                                type="number"
                                value={field.step || 1}
                                onChange={(e) =>
                                    updateField(index, { step: parseInt(e.target.value, 10) })
                                }
                                className="border px-2 py-1.5 w-12 rounded bg-white"
                            /> </label>
                        <div className='tooltip'>
                            <Info className='text-gray-600 h-5 w-5 mb-4' />
                            <span className="tooltiptext">Multi-Step form option - if you are not making this a multi-step form keep the value at 1</span>
                        </div>
                    </span>
                    <span className='flex gap-1 items-center'>
                        <input
                            placeholder="Group ID (for inline fields)"
                            value={field.groupId || ''}
                            onChange={(e) => updateField(index, { groupId: e.target.value })}
                            className="border px-2 py-1.5 rounded bg-white"
                        />
                        <div className='tooltip'>
                            <Info className='text-gray-600 h-5 w-5 mb-4' />
                            <span className="tooltiptext">To have input fields inlined instead of in a block (column) add an Id (letter or number) to match the next field you would like inlined.</span>
                        </div>
                    </span>
                </div>
                <button onClick={() => removeField(index)} className="bg-red-500 text-white p-2 rounded hover:underline">
                    Remove Field
                </button>
            </div>
            <div className="mt-4 space-y-2">
                <label className="text-sm font-semibold">Conditional Visibility</label>
                <div className="flex justify-around items-center gap-2">
                    <input
                        placeholder="Field Name (e.g. need_a_[related]_rate)"
                        value={field.conditional?.field || ''}
                        onChange={(e) =>
                            updateField(index, {
                                conditional: {
                                    ...field.conditional,
                                    field: e.target.value,
                                    operator: field.conditional?.operator || 'equals',
                                    value: field.conditional?.value || '',
                                },
                            })
                        }
                        className="w-full border p-2 rounded bg-white placeholder:text-sm"
                    />
                    <select
                        value={field.conditional?.operator || 'equals'}
                        onChange={(e) =>
                            updateField(index, {
                                conditional: {
                                    ...field.conditional,
                                    field: field.conditional?.field || '',
                                    operator: e.target.value as 'equals' | 'notEquals',
                                    value: field.conditional?.value || '',
                                },
                            })
                        }
                        className="border p-2 rounded bg-white w-1/2"
                    >
                        <option value="equals">equals</option>
                        <option value="notEquals">not equals</option>
                    </select>
                    <input
                        placeholder="Value"
                        value={field.conditional?.value || ''}
                        onChange={(e) =>
                            updateField(index, {
                                conditional: {
                                    ...field.conditional,
                                    field: field.conditional?.field || '',
                                    operator: field.conditional?.operator || 'equals',
                                    value: e.target.value,
                                },
                            })
                        }
                        className="w-1/2 border p-2 rounded bg-white"
                    />
                </div>
            </div>
        </div>
    )
}
