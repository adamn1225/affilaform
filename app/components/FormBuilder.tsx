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
  affiliateId: number
  setAffiliateId: (val: number) => void
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
    const payload = {
      affiliate_id: affiliateId,
      form_title: formTitle,
      button_text: buttonText,
      button_color: buttonColor,
      fields,
    };

    try {
      const res = await fetch('http://localhost:8080/api/formconfig', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        setIsModalOpen(true);
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to save form config');
      }

      const savedForm = await res.json();

      const iframe = `<iframe src="http://localhost:8080/embed/form?form_id=${savedForm.id}&affiliate=${affiliateId}&button_color=${encodeURIComponent(
        buttonColor
      )}&form_title=${encodeURIComponent(formTitle)}&utm_source=default&utm_medium=embed&utm_campaign=leadgen" style="width:100%;height:600px;" frameborder="0"></iframe>`;

      onSave?.(iframe);

    } catch (err) {
      console.error('Save error:', err);
      alert('Save failed.');
    }
  };


  return (
    <div className="md:p-6 h-full md:max-w-6xl md:mx-auto">
      <h1 className="text-xl text-center md:text-start md:text-2xl font-bold pb-3">Affiliation Form Builder</h1>
      <p className="md:hidden tracking-tight text-base pb-3 font-semibold text-justify hyphens-auto">
        (For the best experience we recommend trying out the demo on desktop)</p>

      <div className="space-y-2 h-full overflow-y-auto max-h-[70vh] bg-gray-50 md:p-3 rounded">

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
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4 overflow-x-auto"
              >
                {fields.map((field, index) => (
                  <Draggable key={index} draggableId={`field-${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border border-gray-200 shadow p-4 rounded bg-white"
                      >
                        {/* Drag Handle */}
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-700">Field {index + 1}</h4>
                          <span
                            {...provided.dragHandleProps}
                            className="cursor-move text-gray-500 hover:text-gray-700"
                          >
                            ☰
                          </span>
                        </div>

                        {/* Field Type */}
                        <div className="flex flex-col gap-2 mt-2">
                          <label className="block font-medium">Field Type</label>
                          <select
                            value={field.type}
                            onChange={(e) => updateField(index, { type: e.target.value })}
                            className="border p-2 rounded w-full bg-white"
                          >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="tel">Phone</option>
                            <option value="number">Number</option>
                            <option value="textarea">Textarea</option>
                            <option value="select">Select</option>
                            <option value="radio">Radio</option>
                          </select>
                        </div>

                        {/* Options for Select/Radio */}
                        {(field.type === 'select' || field.type === 'radio') && (
                          <div className="mt-4">
                            <label className="block font-medium">Options</label>
                            {field.options?.map((opt, i) => (
                              <div key={i} className="flex gap-2 mt-2">
                                <input
                                  placeholder="Option Label"
                                  value={opt.label}
                                  onChange={(e) => {
                                    const newOptions = [...(field.options || [])]
                                    newOptions[i] = { ...newOptions[i], label: e.target.value }
                                    updateField(index, { options: newOptions })
                                  }}
                                  className="border border-gray-300 p-2 rounded w-full bg-white"
                                />
                                <input
                                  placeholder="Option Value"
                                  value={opt.value}
                                  onChange={(e) => {
                                    const newOptions = [...(field.options || [])]
                                    newOptions[i] = { ...newOptions[i], value: e.target.value }
                                    updateField(index, { options: newOptions })
                                  }}
                                  className="border border-gray-300 p-2 rounded w-full bg-white"
                                />
                                <button
                                  onClick={() => {
                                    const newOptions = (field.options || []).filter((_, j) => j !== i)
                                    updateField(index, { options: newOptions })
                                  }}
                                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() =>
                                updateField(index, {
                                  options: [...(field.options || []), { label: '', value: '' }],
                                })
                              }
                              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
                            >
                              + Add Option
                            </button>
                          </div>
                        )}

                        {/* Field Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <label className="block font-medium">Field Name</label>
                            <input
                              placeholder="Name"
                              value={field.name}
                              onChange={(e) => updateField(index, { name: e.target.value })}
                              className="border border-gray-300 p-2 rounded w-full bg-white"
                            />
                          </div>
                          <div>
                            <label className="block font-medium">Field Label</label>
                            <input
                              placeholder="Label"
                              value={field.label}
                              onChange={(e) => updateField(index, { label: e.target.value })}
                              className="border border-gray-300 p-2 rounded w-full bg-white"
                            />
                          </div>
                          {!(field.type === 'select' || field.type === 'radio' || field.type === 'textarea') && (
                            <div>
                              <label className="block font-medium">Placeholder</label>
                              <input
                                placeholder="Placeholder"
                                value={field.placeholder}
                                onChange={(e) => updateField(index, { placeholder: e.target.value })}
                                className="border border-gray-300 p-2 rounded w-full bg-white"
                              />
                            </div>
                          )}
                        </div>

                        {/* Required Checkbox and Remove Button */}
                        <div className="flex items-center gap-4 mt-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => updateField(index, { required: e.target.checked })}
                            />
                            Required?
                          </label>
                          <button
                            onClick={() => setFields((prev) => prev.filter((_, i) => i !== index))}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
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
          className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-800 w-full">
          + Add Field
        </button>
        <button
          onClick={saveConfig}
          className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-800 block w-full mt-2"
        >
          Save Form
        </button>
      </div>


    </div>
  )
}
