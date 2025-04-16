import AffiliateTrackingTile from '@/components/dashboard/AffiliateTrackingTile'
import ZapierCard from '@/components/dashboard/ZapierCard';

export default function AffiliateTrackingPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto mt-8">
            <h1 className="text-2xl font-bold">Tracking & Integrations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AffiliateTrackingTile />
                <ZapierCard />
            </div>
        </div>
    );
}