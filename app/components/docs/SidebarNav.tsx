const categories = [
    {
        label: 'Getting Started',
        items: [
            { label: 'Overview', href: '#overview' },
            { label: 'How Embeds Work', href: '#embedding' },
        ],
    },
    {
        label: 'No-Code / CMS',
        items: [
            { label: 'WordPress', href: '#wordpress' },
            { label: 'Wix', href: '#wix' },
            { label: 'Squarespace', href: '#squarespace' },
            { label: 'Shopify', href: '#shopify' },
        ],
    },
    {
        label: 'Ecommerce / Platforms',
        items: [
            { label: 'Magento', href: '#magento' },
            { label: 'WooCommerce', href: '#woocommerce' },
        ],
    },
    {
        label: 'Frontend Frameworks',
        items: [
            { label: 'React / Next.js', href: '#react' },
            { label: 'Vue / Vite', href: '#vite' },
            { label: 'Angular', href: '#angular' },
            { label: 'Astro', href: '#astro' },
            { label: 'Svelte', href: '#svelte' },
        ],
    },
    {
        label: 'Backend Frameworks',
        items: [
            { label: 'Laravel', href: '#laravel' },
            { label: 'Rails', href: '#rails' },
            { label: 'Flask / Django', href: '#flask' },
            { label: 'Node / Express', href: '#express' },
            { label: 'PHP', href: '#php' },
            { label: '.NET', href: '#dotnet' },
        ],
    },
    {
        label: 'Raw / Universal',
        items: [
            { label: 'HTML / JS', href: '#html-js' },
            { label: 'Custom / Any Stack', href: '#any-stack' },
        ],
    },
]

export default function SidebarNav() {
    return (
        <nav className="space-y-4">
            {categories.map((cat) => (
                <div key={cat.label}>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{cat.label}</p>
                    <ul className="space-y-1">
                        {cat.items.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className="block text-sm text-gray-600 hover:text-black transition"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    )
}
