import { getMyForms, FormConfig } from '@/lib/api/forms';

export async function generateStaticParams() {
    try {
        const forms = await getMyForms(); // Use the imported function
        return forms.map((form: { id: number }) => ({ id: form.id.toString() }));
    } catch (err) {
        console.error('Failed to fetch forms for static params:', err);
        return [];
    }
}

export default async function FormPreview({ params }: { params: { id: string } }) {
    const res = await getMyForms();

    const forms: FormConfig[] = res; // Use the FormConfig type here
    console.log('params.id:', params.id);
    console.log('forms:', forms);

    const form = forms.find((f) => f.id === parseInt(params.id, 10)); // TypeScript will infer `f` as FormConfig

    if (!form) {
        console.error(`Form with ID ${params.id} not found`);
        return <p>Form not found</p>;
    }

    console.log('Selected form:', form);
    console.log('Form fields:', form.fields);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold">Fields</h2>
            <form className="bg-gray-100 p-4 rounded">
                {form.fields.map((field, index) => (
                    <div key={index} className="mb-4">
                        <label className="block font-medium mb-1">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="w-full p-2 border rounded"
                        />
                        {field.options && field.options.length > 0 && (
                            <select
                                name={field.name}
                                className="w-full p-2 border rounded mt-2"
                            >
                                {field.options.map((option: string, idx: number) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {form.button_text}
                </button>
            </form>
        </div>
    );
}