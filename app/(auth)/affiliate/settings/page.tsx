import AffiliateSettingsPanel from "@/app/components/affiliates/AffiliateSettingsPanel";

export default function IntegrationSettingsPage() {
    return (
        <div className="flex flex-col w-full">
            <h1 className="text-2xl font-bold mb-4">Integration Settings</h1>
            <AffiliateSettingsPanel />
        </div>
    );
}