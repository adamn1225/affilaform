'use client';
import React from 'react';
import FormBuilderImage from '@/public/Affil-Form-Builder.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

export default function ShowCaseDash() {
    const router = useRouter()

    const handlePreviewClick = () => {
        router.push('/form-builder-demo')
    }
    return (
        <section className="bg-white flex justify-center items-center w-full px-20 py-12">

            <div className="flex flex-col gap-16 justify-start items-center w-2/3 py-16 px-12">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        What is AffilaForm?
                    </h2>
                    <p className="mt-4 text-gray-600 font-semibold">
                        AffilaForm is a white-label affiliate form builder platform designed to help businesses (referred to as vendors) easily create embeddable lead capture forms that affiliates can promote and drive traffic to. It supports multi-role access (admin, vendor, affiliate) and includes robust tracking of affiliate-driven leads and payouts.
                        The system streamlines the generation and attribution of leads through custom forms. Each vendor can customize their form title, fields, and styling, then share a unique form link or iframe to affiliates. Affiliates, in turn, promote these forms and receive tracked leads, commissions, and payouts.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Manage Your Affilate Forms with Ease
                    </h2>
                    <p className="mt-4 text-gray-600 font-semibold">
                        Our intuitive dashboard allows you to create, manage, and track your affiliate forms effortlessly. With just a few clicks, you can streamline your affiliate management process and focus on growing your business.
                    </p>
                </div>

            </div>


            <div className="flex justify-center items-start h-full px-12 -mt-12">
                <Image
                    src={FormBuilderImage}
                    alt="Vendor Dashboard"
                    className="w-full max-w-xl rounded-lg shadow-lg"
                    width={0}
                    height={0}
                />
            </div>

        </section>
    );
}