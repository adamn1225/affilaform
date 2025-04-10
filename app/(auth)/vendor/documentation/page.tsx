import DocLayout from '@/components/docs/DocLayout'
import CodeBlock from '@/components/docs/CodeBlock'

export default function DocsPage() {
    return (
        <DocLayout>
            <section id="overview">
                <h1 className="text-2xl font-bold mb-2">Documentation Overview</h1>
                <p className="text-gray-600">Learn how to embed and customize your forms anywhere.</p>
            </section>

            <section id="embedding" className="mt-8">
                <h2 className="text-xl font-semibold mb-2">How Embeds Work</h2>
                <p>
                    Every form you create can be embedded using an iframe. This allows you to copy/paste one line of code into any website.
                </p>
                <CodeBlock language="html" code={`<iframe src="..." style="width:100%;height:600px;"></iframe>`} />

            </section>

            {/* Repeat for each platform below… */}
            <section id="wordpress" className="mt-10">
                <h3 className="text-lg font-semibold">WordPress</h3>
                <p className="mb-2">WordPress supports form embeds through several methods depending on the editor or theme you're using:</p>

                <ul className="list-disc pl-6 mb-4 text-gray-600">
                    <li>
                        <strong>Block Editor (Gutenberg):</strong> Use a “Custom HTML” block and paste your iframe embed code.
                    </li>
                    <li>
                        <strong>Classic Editor:</strong> Switch to the “Text” tab and paste the iframe where you want it.
                    </li>
                    <li>
                        <strong>Page Builders (Elementor, Divi, etc):</strong> Use the HTML widget/module and insert your iframe.
                    </li>
                    <li>
                        <strong>Theme Templates:</strong> Edit your theme files (e.g. <code>page.php</code>) and hardcode the iframe.
                    </li>
                </ul>

                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." style="width:100%;height:600px;" frameborder="0"></iframe>`} />
            </section>


            <section id="wix" className="mt-10">
                <h3 className="text-lg font-semibold">Wix</h3>
                <p className="mb-2">
                    In the Wix editor, follow these steps to embed your custom form:
                </p>
                <ol className="list-decimal pl-6 mb-4 text-gray-600">
                    <li>Go to the editor → Click <strong>Add</strong></li>
                    <li>Select <strong>Embed → Embed a Widget</strong></li>
                    <li>Choose <strong>Custom Embed → HTML iframe</strong></li>
                    <li>Paste your iframe code in the window that appears</li>
                </ol>

                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." width="100%" height="600" frameborder="0"></iframe>`} />
            </section>

            <section id="squarespace" className="mt-10">
                <h3 className="text-lg font-semibold">Squarespace</h3>
                <p className="mb-2">Squarespace doesn’t allow iframes directly in some areas, so here’s the safest method:</p>

                <ol className="list-decimal pl-6 mb-4 text-gray-600">
                    <li>Open the page editor</li>
                    <li>Add a new <strong>Code Block</strong></li>
                    <li>Paste your iframe embed code</li>
                    <li>Make sure <em>Display Source</em> is unchecked</li>
                </ol>

                <p className="text-sm text-red-500 mb-2">⚠️ Note: Some Squarespace plans or pages may restrict iframe use — test thoroughly.</p>

                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." style="width:100%;height:600px;" frameborder="0"></iframe>`} />
            </section>


            <section id="shopify" className="mt-10">
                <h3 className="text-lg font-semibold">Shopify</h3>
                <p>
                    Open your theme files (Online Store → Themes → Edit Code). Locate a template (like <code>product.liquid</code>, <code>page.liquid</code>, or a section like <code>main-content.liquid</code>), and paste your iframe directly into the HTML structure.
                </p>
                <pre className="bg-gray-100 p-3 rounded text-sm mt-3 overflow-x-auto">
                    {`<!-- In a .liquid file -->
                    <div class="custom-form-wrapper">
                      <iframe src="https://yourdomain.com/embed/form?id=..." style="width:100%;height:600px;" frameborder="0"></iframe>
                    </div>`}
                </pre>
            </section>

            <section id="magento" className="mt-10">
                <h3 className="text-lg font-semibold">Magento</h3>
                <p>
                    In Magento, you can embed forms in CMS pages or static blocks. Navigate to <strong>Content → Pages</strong> or <strong>Content → Blocks</strong>, then insert your iframe in the HTML editor.
                </p>
                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." width="100%" height="600" frameborder="0"></iframe>`} />
            </section>

            <section id="woocommerce" className="mt-10">
                <h3 className="text-lg font-semibold">WooCommerce</h3>
                <p>
                    Since WooCommerce runs on WordPress, use the same methods described above: Custom HTML block, Classic editor, or theme template.
                </p>
            </section>

            <section id="react" className="mt-10">
                <h3 className="text-lg font-semibold">React / Next.js</h3>
                <p>
                    Embed directly inside a component using JSX:
                </p>
                <CodeBlock language="jsx" code={`<iframe src="https://yourdomain.com/embed/form?id=..." style={{ width: '100%', height: '600px' }} frameBorder="0" />`} />
            </section>

            <section id="vite" className="mt-10">
                <h3 className="text-lg font-semibold">Vue / Vite</h3>
                <p>
                    Use this inside your Vue SFC:
                </p>
                <CodeBlock language="html" code={`<template>
  <iframe src="https://yourdomain.com/embed/form?id=..." style="width:100%;height:600px;" frameborder="0"></iframe>
</template>`} />
            </section>

            <section id="angular" className="mt-10">
                <h3 className="text-lg font-semibold">Angular</h3>
                <p>
                    Place the iframe directly inside any component’s template:
                </p>
                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." width="100%" height="600" frameborder="0"></iframe>`} />
            </section>

            <section id="astro" className="mt-10">
                <h3 className="text-lg font-semibold">Astro</h3>
                <p>
                    Embed inside any <code>.astro</code> file:
                </p>
                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." style="width:100%;height:600px;" frameborder="0" />`} />
            </section>

            <section id="svelte" className="mt-10">
                <h3 className="text-lg font-semibold">Svelte</h3>
                <p>
                    Place this inside your Svelte component's markup:
                </p>
                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." width="100%" height="600" frameborder="0"></iframe>`} />
            </section>

            <section id="laravel" className="mt-10">
                <h3 className="text-lg font-semibold">Laravel</h3>
                <p>
                    In a Blade template (e.g. <code>resources/views/welcome.blade.php</code>), paste this iframe:
                </p>
                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." style="width:100%;height:600px;" frameborder="0"></iframe>`} />
            </section>

            <section id="rails" className="mt-10">
                <h3 className="text-lg font-semibold">Ruby on Rails</h3>
                <p>
                    In a view file like <code>.html.erb</code>, insert:
                </p>
                <CodeBlock language="erb" code={`<iframe src="https://yourdomain.com/embed/form?id=..." width="100%" height="600" frameborder="0"></iframe>`} />
            </section>

            <section id="flask" className="mt-10">
                <h3 className="text-lg font-semibold">Flask / Django</h3>
                <p>
                    Use this in your Jinja or Django template:
                </p>
                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." width="100%" height="600" frameborder="0"></iframe>`} />
            </section>

            <section id="express" className="mt-10">
                <h3 className="text-lg font-semibold">Node / Express</h3>
                <p>
                    In your EJS or Pug view, embed the iframe normally:
                </p>
                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." width="100%" height="600" frameborder="0"></iframe>`} />
            </section>

            <section id="php" className="mt-10">
                <h3 className="text-lg font-semibold">PHP</h3>
                <p>
                    Embed directly inside any <code>.php</code> file:
                </p>
                <CodeBlock language="php" code={`<iframe src="https://yourdomain.com/embed/form?id=..." width="100%" height="600" frameborder="0"></iframe>`} />
            </section>

            <section id="dotnet" className="mt-10">
                <h3 className="text-lg font-semibold">.NET / Razor</h3>
                <p>
                    Add the iframe to your Razor component or layout:
                </p>
                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." width="100%" height="600" frameborder="0"></iframe>`} />
            </section>


            <section id="html-js" className="mt-10">
                <h3 className="text-lg font-semibold">HTML / JS</h3>
                <p>
                    Paste this anywhere in your HTML page:
                </p>
                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." width="100%" height="600" frameborder="0"></iframe>`} />
            </section>

            <section id="any-stack" className="mt-10">
                <h3 className="text-lg font-semibold">Custom / Any Stack</h3>
                <p>
                    If your stack outputs HTML (static site, CMS, app), just place this iframe wherever you want the form to render:
                </p>
                <CodeBlock language="html" code={`<iframe src="https://yourdomain.com/embed/form?id=..." style="width:100%;height:600px;" frameborder="0"></iframe>`} />
            </section>


            {/* You get the idea — one per platform */}
        </DocLayout>
    )
}
