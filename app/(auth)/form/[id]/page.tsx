import { getMyForms, FormConfig } from '@/lib/api/forms';
import EmbedPreview from '@/components/EmbedPreview';
import Link from 'next/link';
import { IoReturnUpBackOutline } from "react-icons/io5";


export async function generateStaticParams() {
    try {
        const forms = await getMyForms(); // Fetch forms
        return forms.map((form) => ({ id: form.id.toString() })); // Map to params structure
    } catch (err) {
        console.error('Failed to fetch forms for static params:', err);
        return []; // Return an empty array if fetching fails
    }
}
export default async function FormPreview({ params }: { params: { id: string } }) {
    // Fetch forms
    const forms: FormConfig[] = await getMyForms();

    console.log('params.id:', params.id);
    console.log('forms:', forms);

    // Parse params.id and find the form
    const formId = parseInt(params.id, 10);
    if (isNaN(formId)) {
        console.error(`Invalid form ID: ${params.id}`);
        return <p>Invalid form ID</p>;
    }

    const form = forms.find((f) => f.id === formId);

    if (!form) {
        console.error(`Form with ID ${params.id} not found`);
        return <p>Form not found</p>;
    }

    console.log('Selected form:', form);

    // Create the liveConfig object
    const liveConfig = {
        fields: form.fields,
        form_title: form.form_title,
        button_text: form.button_text,
        button_color: form.button_color,
    };

    return (
        <div className='flex flex-col gap-3 items-center w-full mt-10'>
            <div className='w-1/2'>
                <Link href="/vendor/dashboard" className="flex flex-col text-gray-500 underline font-semibold hover:underline hover:text-blue-500">
                    <IoReturnUpBackOutline size={24} className="inline-block mr-2" />
                    Back to Dashboard
                </Link>
            </div>
            <div className="w-1/2 mx-auto max-w-2xl py-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold text-center">{form.form_title || 'Untitled Form'}</h1>
                <p className="text-gray-500 mt-2 text-center">Form ID: {form.id}</p>
                {/* Pass liveConfig to EmbedPreview */}
                <div className='flex justify-center'>
                    <div className='px-12 w-2/3'>
                        <EmbedPreview liveConfig={liveConfig} />
                    </div>
                </div>
            </div>
        </div>
    );
}