'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useState } from 'react'
import { Copy } from 'lucide-react'

export default function CodeBlock({
    language = 'html',
    code,
}: {
    language?: string
    code: string
}) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <div className="relative group">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 z-10 bg-white border px-2 py-1 text-xs rounded shadow hover:bg-gray-100 transition"
            >
                {copied ? 'Copied!' : <Copy size={14} />}
            </button>
            <SyntaxHighlighter language={language} style={oneDark} customStyle={{ borderRadius: '8px', fontSize: '0.875rem' }}>
                {code}
            </SyntaxHighlighter>
        </div>
    )
}
