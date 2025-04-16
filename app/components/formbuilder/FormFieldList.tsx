'use client'

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { FormField } from './types'
import FieldEditor from './FieldEditor'

type Props = {
    fields: FormField[]
    setFields: React.Dispatch<React.SetStateAction<FormField[]>>
    updateField: (index: number, field: Partial<FormField>) => void
}

export default function FormFieldList({ fields, setFields, updateField }: Props) {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return
        const reordered = Array.from(fields)
        const [moved] = reordered.splice(result.source.index, 1)
        reordered.splice(result.destination.index, 0, moved)
        setFields(reordered)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="fields">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                        {fields.map((field, index) => (
                            <Draggable key={index} draggableId={`field-${index}`} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <FieldEditor
                                            index={index}
                                            field={field}
                                            updateField={updateField}
                                            removeField={() => setFields((prev) => prev.filter((_, i) => i !== index))}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
