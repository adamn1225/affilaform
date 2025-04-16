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