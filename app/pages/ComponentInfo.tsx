import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ComponentInfoProps {
    formData: {
        selected_systems: string[];
        battery_type: string;
        deratingFactor: number;
        tempCoefficient: number;
        tempSTC: number;
        nominalCellTemp: number;
        ambientTempNOCT: number;
        solarRadiationNOCT: number;
        pvEfficiency: number;
        referenceIrradiance: number;
        pvLifetime: number;
        capitalCost: number;
        replacementCost: number;
        omCost: number;
        inverterEfficiency: number;
        inverterLifetime: number;
        maxDcAcRatio: number;
        inverterCapitalCost: number;
        inverterReplacementCost: number;
        inverterOmCost: number;
    };
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ComponentInfo: React.FC<ComponentInfoProps> = ({ formData, handleInputChange }) => {
    return (
        <div className="space-y-6 max-w-3xl">
            <p className="text-sm text-muted-foreground">
                Default values are provided for some questions, but please review and adjust as necessary for more accurate results.
            </p>

            {formData.selected_systems.includes("PV") && (
            <div>
            {/* PV Module Parameters */}
            <div className="mb-16">
                <h2 className="text-lg font-semibold">PV Parameters</h2>
                <div className="space-y-4 mb-6">
                    <h3 className="font-medium">Technical</h3>
                    {[
                        { label: "PV derating factor (%)", name: "deratingFactor", placeholder: "%" },
                        { label: "Temperature Coefficient (%/°C)", name: "tempCoefficient", placeholder: "%/°C" },
                        { label: "Temperature at Standard Test Condition (°C)", name: "tempSTC", placeholder: "°C" },
                        { label: "Nominal operating cell temperature (°C)", name: "nominalCellTemp", placeholder: "°C" },
                        { label: "Ambient temperature at which the NOCT is defined (°C)", name: "ambientTempNOCT", placeholder: "°C" },
                        { label: "Solar radiation at which the NOCT is defined (W/m²)", name: "solarRadiationNOCT", placeholder: "W/m²" },
                        { label: "Efficiency of PV module (%/100)", name: "pvEfficiency", placeholder: "%/100" },
                        { label: "Reference irradiance (W/m²)", name: "referenceIrradiance", placeholder: "W/m²" },
                        { label: "PV modules' life time (years).", name: "pvLifetime", placeholder: "years" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm mb-2">{field.label}</label>
                            <Input
                                type="number"
                                name={field.name}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                className="max-w-md"
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium">Economic</h3>
                    
                    {[
                        { label: "Capital Cost ($/kW)", name: "capitalCost", placeholder: "$/kW" },
                        { label: "PV replacement cost ($/kW)", name: "replacementCost", placeholder: "$/kW" },
                        { label: "O&M cost ($)", name: "omCost", placeholder: "$" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm mb-2">{field.label}</label>
                            <Input
                                name={field.name}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                className="max-w-md"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Inverter Parameters */}
            <div className="mb-16">
                <h2 className="text-lg font-semibold mb-6">Inverter Parameters</h2>
                
                <div className="space-y-4 mb-8">
                    <h3 className="font-medium">Technical</h3>
                    
                    {[
                        { label: "Inverter Efficiency (%)", name: "inverterEfficiency", placeholder: "%" },
                        { label: "Inverter lifetime (years)", name: "inverterLifetime", placeholder: "years" },
                        { label: "Maximum acceptable DC to AC ratio", name: "maxDcAcRatio", placeholder: "" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm mb-2">{field.label}</label>
                            <Input
                                type="number"
                                name={field.name}
                                value={formData[field.name as keyof typeof formData] || ""}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                className="max-w-md"
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium">Economic</h3>
                    
                    {[
                        { label: "Capital cost ($/kW)", name: "inverterCapitalCost", placeholder: "$/kW" },
                        { label: "Replacement cost ($/kW)", name: "inverterReplacementCost", placeholder: "$/kW" },
                        { label: "O&M cost ($/kW/year)", name: "inverterOmCost", placeholder: "$/kW/year" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm mb-2">{field.label}</label>
                            <Input
                                type="number"
                                name={field.name}
                                value={formData[field.name as keyof typeof formData] || ""}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                className="max-w-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
            </div>
            )}

            {formData.selected_systems.includes("DG") && (
            <div className="mb-16">
                <h2 className="text-lg font-semibold mb-6">Diesel Generator Fuel Curve</h2>
                
                <div className="space-y-4 mb-8">
                    <h3 className="font-medium">Technical</h3>        
                    {[
                        { label: "Slope (Liter/hr/kW output)", name: "dgSlope", placeholder: "Liter/hr/kW output" },
                        { label: "Intercept coefficient (Liter/hr/kW rate)", name: "dgIntercept", placeholder: "Liter/hr/kW rate" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm mb-2">{field.label}</label>
                            <Input
                                type="number"
                                name={field.name}
                                value={formData[field.name as keyof typeof formData] || ""}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                className="max-w-md"
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium">Economic</h3>
                    
                    {[
                        { label: "Capital Cost ($/kW)", name: "dgCapitalCost", placeholder: "$/kW" },
                        { label: "Replacement Cost ($/kW)", name: "dgReplacementCost", placeholder: "$/kW" },
                        { label: "O&M cost / Running cost ($/op.h)", name: "dgOmCost", placeholder: "$/op.h" },
                        { label: "Fuel Cost ($/L)", name: "dgFuelCost", placeholder: "1.428 $/L" },
                        { label: "DG fuel cost yearly escalation/reduction rate (%)", name: "dgFuelEscalationRate", placeholder: "%" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm mb-2">{field.label}</label>
                            <Input
                                type="number"
                                name={field.name}
                                value={formData[field.name as keyof typeof formData] || ""}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                className="max-w-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
            )}

            {formData.selected_systems.includes("Battery") && (
            <div className="mb-16">
                <h2 className="text-lg font-semibold mb-6">Battery Parameters</h2>

                <div className="space-y-4 mb-8">
                    <h3 className="font-medium">Technical</h3>
                    
                    {[
                        { label: "Minimum state of charge (%/100)", name: "socMin", placeholder: "%/100" },
                        { label: "Maximum state of charge (%/100)", name: "socMax", placeholder: "%/100" },
                        { label: "Initial state of charge (%/100)", name: "socInitial", placeholder: "%/100" },
                        { label: "Hourly self-discharge rate (%/100)", name: "selfDischargeRate", placeholder: "%/100" },
                        { label: "Battery lifetime (years)", name: "batteryLifetime", placeholder: "years" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm mb-2">{field.label}</label>
                            <Input
                                type="number"
                                name={field.name}
                                value={formData[field.name as keyof typeof formData] || ""}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                className="max-w-md"
                            />
                        </div>
                    ))}
                </div>
                
                {formData.battery_type === "Lead-acid" && (
                    <div className="space-y-4 mb-8 rounded-md">
                        <h3 className="font-medium">Lead Acid Battery</h3>
                        
                        {[
                            { label: "Lead Acid nominal capacity (Ah)", name: "leadAcidNominalCapacity", placeholder: "Ah" },
                            { label: "Storage's maximum charge rate (A/Ah)", name: "leadAcidMaxChargeRate", placeholder: "A/Ah" },
                            { label: "Storage capacity ratio", name: "leadAcidStorageCapacityRatio", placeholder: "" },
                            { label: "Storage rate constant (1/h)", name: "leadAcidStorageRateConstant", placeholder: "1/h" },
                            { label: "Storage's maximum charge current (A)", name: "leadAcidMaxChargeCurrent", placeholder: "A" },
                            { label: "Storage's nominal voltage (V)", name: "leadAcidNominalVoltage", placeholder: "V" },
                            { label: "Round trip efficiency (%/100)", name: "leadAcidRoundTripEfficiency", placeholder: "%/100" },
                            { label: "Throughout (kWh)", name: "leadAcidThroughout", placeholder: "8000 kWh" },
                        ].map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm mb-2">{field.label}</label>
                                <Input
                                    type="number"
                                    name={field.name}
                                    value={formData[field.name as keyof typeof formData] || ""}
                                    onChange={handleInputChange}
                                    placeholder={field.placeholder}
                                    className="max-w-md"
                                />
                            </div>
                        ))}
                    </div>
                )}
                
                {formData.battery_type === "Li-ion" && (
                    <div className="space-y-4 mb-8 rounded-md">
                        <h3 className="font-medium">Li-ion Battery</h3>
                        
                        {[
                            { label: "Storage's maximum charge current (A)", name: "liIonMaxChargeCurrent", placeholder: "A" },
                            { label: "Storage's maximum discharge current (A)", name: "liIonMaxDischargeCurrent", placeholder: "A" },
                            { label: "Storage's maximum charge rate (A/Ah)", name: "liIonMaxChargeRate", placeholder: "A/Ah" },
                            { label: "Storage's nominal voltage (V)", name: "liIonNominalVoltage", placeholder: "V" },
                            { label: "Li-ion nominal capacity [Ah]", name: "liIonNominalCapacity", placeholder: "Ah" },
                            { label: "Round trip efficiency (%/100)", name: "liIonRoundTripEfficiency", placeholder: "%/100" },
                            { label: "Throughout (kWh)", name: "liIonThroughout", placeholder: "kWh" },
                        ].map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm mb-2">{field.label}</label>
                                <Input
                                    type="number"
                                    name={field.name}
                                    value={formData[field.name as keyof typeof formData] || ""}
                                    onChange={handleInputChange}
                                    placeholder={field.placeholder}
                                    className="max-w-md"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-4">
                    <h3 className="font-medium">Economic</h3>
                    
                    {[
                        { label: "Capital cost ($/kWh)", name: "batteryCapitalCost", placeholder: "$/kWh" },
                        { label: "Replacement Cost ($/kWh)", name: "batteryReplacementCost", placeholder: "$/kWh" },
                        { label: "Maintenance Cost ($/kw.year)", name: "batteryMaintenanceCost", placeholder: "$/kw.year" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm mb-2">{field.label}</label>
                            <Input
                                type="number"
                                name={field.name}
                                value={formData[field.name as keyof typeof formData] || ""}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                className="max-w-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    );
};

export default ComponentInfo;