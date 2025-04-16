import React from 'react';


export function IntegrationCard({ status, title, description, icon, action }: { title: string, description: string, icon?: React.ReactNode, action?: React.ReactNode, status?: string }) {
    return (
        <div className="bg-gray-800 rounded-lg shadow px-3 py-2 flex flex-col">
            {icon}
            <h3 className="text-lg font-bold text-gray-50">{title}</h3>
            <p className="text-sm font-semibold  text-gray-100">{description}</p>
            <p>{action}</p>
        </div>
    );
}