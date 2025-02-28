import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";

// Define the types for the props
interface GeographyEconomyProps {
    formData: {
        address: string;
        n_ir_rate: number;
        e_ir_rate: number;
        Tax_rate: number;
        RE_incentives_rate: number;
    };
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Component for Google Maps
const GoogleMap: React.FC<{ address: string }> = ({ address }) => {
    const [mapUrl, setMapUrl] = useState("");
    
    useEffect(() => {
        // Replace YOUR_API_KEY with actual key
        const API_KEY = "AIzaSyAR83uVji4REEK7ODSsRD8MNrmf69jQ8zQ";
        const encodedAddress = encodeURIComponent(address || "United States");
        const url = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodedAddress}&zoom=15`;
        setMapUrl(url);
    }, [address]);

    return (
        <iframe
            className="w-full h-full rounded-lg"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
        />
    );
};

// Main Component
const GeographyEconomy: React.FC<GeographyEconomyProps> = ({ formData, handleInputChange }) => {
    return (
        <div className="space-y-6 max-w-3xl">
            <p className="text-sm text-muted-foreground mb-8">
                Default values are provided for some questions, but please review and adjust as necessary for more accurate results.
            </p>
            <div>
                <p className="block mb-2 text-sm">Get started by entering your address or pick it up on the map below:</p>
                <Input 
                    type="text" 
                    placeholder="Address" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full"
                />
            </div>

            <div className="bg-muted/20 rounded-lg h-96">
                <GoogleMap address={formData.address} />
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm">Nominal Discount Rate (%)</label>
                    <Input
                        type="number"
                        name="n_ir_rate"
                        value={formData.n_ir_rate}
                        onChange={handleInputChange}
                        className="max-w-md"
                        placeholder='%'
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm">Expected Inflation Rate (%)</label>
                    <Input
                        type="number"
                        name="e_ir_rate"
                        value={formData.e_ir_rate}
                        onChange={handleInputChange}
                        className="max-w-md"
                        placeholder='%'
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm">Equipment Sale Tax (%)</label>
                    <Input
                        type="number"
                        name="Tax_rate"
                        value={formData.Tax_rate}
                        onChange={handleInputChange}
                        className="max-w-md"
                        placeholder='%'
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm">Investment Tax Credit (%)</label>
                    <Input
                        type="number"
                        name="RE_incentives_rate"
                        value={formData.RE_incentives_rate}
                        onChange={handleInputChange}
                        className="max-w-md"
                        placeholder='%'
                    />
                </div>
            </div>
        </div>
    );
};

export default GeographyEconomy;