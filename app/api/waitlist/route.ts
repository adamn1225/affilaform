import { NextResponse } from 'next/server';
import { apiFetch } from '@/lib/api/apiFetch';

export const POST = async (req: Request) => {
    try {
        // Parse the request body
        const body = await req.json();

        // Validate required fields
        if (!body.email || !body.role) {
            return NextResponse.json(
                { error: 'Email and role are required' },
                { status: 400 }
            );
        }

        // Forward the request to the backend API
        const response = await apiFetch('/api/waitlist', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });

        // Handle backend errors
        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(
                { error: error.error || 'Failed to add to waitlist' },
                { status: response.status }
            );
        }

        // Return success response
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[POST /api/waitlist] Error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
};