export type FormOption = {
    label: string
    value: string
    step?: number
}

export type FormWidth = 'sm' | 'md' | 'lg' | 'xl'

export type ConditionalRule = {
    field: string; // field name to check
    operator: 'equals' | 'notEquals'; // expandable later
    value: string;
};

export type FormField = {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    options?: { label: string; value: string }[];
    step?: number;
    stepTitle?: string;
    variant?: 'A' | 'B';
    groupId?: string;
    inline?: boolean;
    isSpacer?: boolean;
    spacerHeight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    height?: number;
    conditional?: ConditionalRule;
};

export type FormConfig = {
    fields: FormField[]
    form_title: string
    button_text: string
    button_color: string
    affiliate_ga4_id?: string
    vendor_ga4_id?: string
    showAsModal?: boolean
    width?: FormWidth
}

export interface FormBuilderProps {
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
    affiliateGA4ID: string
    setAffiliateGA4ID: (val: string) => void
    showAsModal: boolean
    setShowAsModal: (val: boolean) => void
    formWidth: FormWidth
    setFormWidth: (val: FormWidth) => void
}
