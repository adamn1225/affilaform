'use client'
import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import SignupModal from './ui/SignupModal'

export type FormOption = {
    label: string
    value: string
}

export type FormField = {
    label: string
    name: string
    placeholder: string
    type: string
    required: boolean
    options?: FormOption[] // Used for select & radio
}

export type FormConfig = {
    fields: FormField[]
    form_title: string
    button_text: string
    button_color: string
    config?: FormConfig
}

interface FormBuilderProps {
    fields: FormField[]
    setFields: React.Dispatch<React.SetStateAction<FormField[]>>
    formTitle: string
    setFormTitle: (val: string) => void
    buttonColor: string
    setButtonColor: (val: string) => void
    buttonText: string
    setButtonText: (val: string) => void
    affiliateId: string
    setAffiliateId: (val: string) => void
    onSave?: (iframeCode: string) => void
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
    onSave
}: FormBuilderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const addField = () => {
        const newFieldName = `field-${fields.length + 1}`;
        setFields((prev) => [
            ...prev,
            {
                label: '',
                name: newFieldName, // Ensure a unique default name
                placeholder: '',
                type: 'text',
                required: false,
            },
        ]);
    };
    const updateField = (index: number, field: Partial<FormField>) => {
        setFields((prev) => {
            const updated = [...prev];
            const currentField = updated[index];

            // Ensure the name is unique and non-empty
            if (field.name) {
                const isDuplicate = updated.some((f, i) => i !== index && f.name === field.name);
                if (isDuplicate) {
                    alert('Field name must be unique.');
                    return prev;
                }
            }

            updated[index] = { ...currentField, ...field };
            return updated;
        });
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return
        const reordered = Array.from(fields)
        const [moved] = reordered.splice(result.source.index, 1)
        reordered.splice(result.destination.index, 0, moved)
        setFields(reordered)
    }

    const saveConfig = async () => {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1]
    
        if (!token) {
          setIsModalOpen(true) // Open the modal if the user is not logged in
          return
        }
    
        const payload = {
          affiliate_id: affiliateId,
          form_title: formTitle,
          button_text: buttonText,
          button_color: buttonColor,
          fields,
        }
    
        const res = await fetch('http://localhost:8080/api/formconfig', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
          body: JSON.stringify(payload),
        })
    
        if (res.ok) {
          alert('Form saved!')
          const iframe = `<iframe src="http://localhost:8080/embed/form?affiliate=${affiliateId}&button_color=${encodeURIComponent(
            buttonColor
          )}&form_title=${encodeURIComponent(
            formTitle
          )}" style="width:100%;height:600px;" frameborder="0"></iframe>`
          onSave?.(iframe)
        } else {
          alert('Save failed.')
        }
      }

    return (
        <div className="p-6 max-w-3xl">
            <div className=' space-y-2 h-full overflow-y-auto max-h-[70vh] bg-gray-50 p-3'>
                <h1 className="text-2xl font-bold">Form Builder</h1>

                <input
                    value={affiliateId}
                    onChange={(e) => setAffiliateId(e.target.value)}
                    placeholder="Affiliate ID"
                    className="hidden border border-gray-300 p-2 rounded w-full bg-white"
                />

                <input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Form Title"
                    className="border border-gray-300 p-2 rounded w-full bg-white"
                />

                <input
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="Button Text"
                    className="border border-gray-300 p-2 rounded w-full bg-white"
                />

                <div className="flex items-center gap-2">
                    <label>Button Color</label>
                    <input
                        type="color"
                        value={buttonColor}
                        onChange={(e) => setButtonColor(e.target.value)}
                    />
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="fields">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                                {fields.map((field, index) => (
                                    <Draggable key={index} draggableId={`field-${index}`} index={index}>
                                        {(provided) => (
                                            <div>
                                                <div className='border border-gray-200 shadow p-2 rounded'>
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className='flex flex-col gap-2 '
                                                    >
                                                        <div className='flex flex-col gap-1'>
                                                            <label className="block font-medium">Field Type</label>
                                                            <select
                                                                value={field.type}
                                                                onChange={(e) => updateField(index, { type: e.target.value })}
                                                                className="border p-2 rounded w-3/4 bg-white"
                                                            >
                                                                <option value="text">Text</option>
                                                                <option value="email">Email</option>
                                                                <option value="tel">Phone</option>
                                                                <option value="number">Number</option>
                                                                <option value="textarea">Textarea</option>
                                                                <option value="select">Select</option>
                                                                <option value="radio">Radio</option>
                                                            </select>
                                                            {(field.type === 'select' || field.type === 'radio') && (
                                                                <div className="col-span-6 space-y-2">
                                                                    <label className="block font-medium">Options</label>
                                                                    {field.options?.map((opt, i) => (
                                                                        <div key={i} className="flex gap-2">
                                                                            <input
                                                                                placeholder="Option Label"
                                                                                value={opt.label}
                                                                                onChange={(e) => {
                                                                                    const newOptions = [...(field.options || [])]
                                                                                    newOptions[i] = { ...newOptions[i], label: e.target.value }
                                                                                    updateField(index, { options: newOptions })
                                                                                }}
                                                                                className="border border-gray-300 p-1 rounded w-full bg-white"
                                                                            />
                                                                            <input
                                                                                placeholder="Field Value"
                                                                                value={opt.value}
                                                                                onChange={(e) => {
                                                                                    const newOptions = [...(field.options || [])]
                                                                                    newOptions[i] = { ...newOptions[i], value: e.target.value }
                                                                                    updateField(index, { options: newOptions })
                                                                                }}
                                                                                className="border border-gray-300 p-1 rounded w-full bg-white"
                                                                            />
                                                                            <button
                                                                                onClick={() => {
                                                                                    const newOptions = (field.options || []).filter((_, j) => j !== i)
                                                                                    updateField(index, { options: newOptions })
                                                                                }}
                                                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                                            >
                                                                                ✕
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                    <button
                                                                        onClick={() => updateField(index, {
                                                                            options: [...(field.options || []), { label: '', value: '' }]
                                                                        })}
                                                                        className="bg-blue-500 text-white px-2 py-1 mb-3 rounded"
                                                                    >
                                                                        + Add Option
                                                                    </button>
                                                                </div>

                                                            )}
                                                        </div>


                                                        <div className="grid grid-cols-3 gap-2 items-start">
                                                            <label className="block font-medium">Field Name
                                                                <input
                                                                    placeholder="Name"
                                                                    value={field.name}
                                                                    onChange={(e) => updateField(index, { name: e.target.value })}
                                                                    className="border border-gray-300 p-1 rounded bg-white"
                                                                /></label>
                                                            <label className="block font-medium">Field Label
                                                                <input
                                                                    placeholder="Label"
                                                                    value={field.label}
                                                                    onChange={(e) => updateField(index, { label: e.target.value })}
                                                                    className="border border-gray-300 p-1 rounded bg-white"
                                                                /></label>



                                                            {!(field.type === 'select' || field.type === 'radio' || field.type === 'textarea') && (
                                                                <label className="block font-medium">Placeholder
                                                                    <input
                                                                        placeholder="Placeholder"
                                                                        value={field.placeholder}
                                                                        onChange={(e) => updateField(index, { placeholder: e.target.value })}
                                                                        className="border border-gray-300 p-1 rounded bg-white"
                                                                    /></label>
                                                            )}
                                                        </div>

                                                    </div>



                                                    <div className='flex items-center gap-2 mt-2'>
                                                        <label className="flex items-center gap-1">
                                                            <input
                                                                type="checkbox"
                                                                checked={field.required}
                                                                onChange={(e) => updateField(index, { required: e.target.checked })}
                                                            />
                                                            Required?
                                                        </label>

                                                        <button
                                                            onClick={() => setFields(prev => prev.filter((_, i) => i !== index))}
                                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>


                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <button
                    onClick={addField}
                    className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    + Add Field
                </button>


            </div>
            <button
                onClick={saveConfig}
                className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-800 block w-full">
                Save Form
             </button>
        </div>
    )
}
