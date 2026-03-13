import { Metadata } from "next";
import { use } from "react";

export const metadata: Metadata = {
    title: "Country",
    description: "Information about the country",
    robots: {
        index: false,
        follow: false,
    },
};

export default function Country({ params }: { params: Promise<{ country: string }> }) {
    const { country } = use(params);
    return {
        
    }
}
