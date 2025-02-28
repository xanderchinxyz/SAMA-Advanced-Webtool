import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SystemConfigProps {
    formData: {
        lifetime_simulations: number;
        LPSP_max_rate: number;
        RE_min_rate: number;
        hourly_dataset: string;
        monthly_dataset: string;
        monthly_consumption: { [key: string]: number };
        annual_power_consumption: string;
        annual_total_load: number;
        selected_systems: string[];
        battery_type: string;
    };
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleCheckboxChange: (type: "system", object: string) => void;
}

const SystemConfig: React.FC<SystemConfigProps> = ({ 
    formData, 
    handleInputChange,
    handleCheckboxChange
}) => {
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    return (
        <div className="space-y-6 max-w-3xl">
            <p className="text-sm text-muted-foreground mb-8">
                Default values are provided for some questions, but please review and adjust as necessary for more accurate results.
            </p>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm mb-2">Enter the lifetime of system in simulations (years)</label>
                    <Input
                        type="number"
                        name="lifetime_simulations"
                        value={formData.lifetime_simulations}
                        onChange={handleInputChange}
                        className="max-w-md"
                        placeholder="years"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Enter the maximum loss of power supply probability (%)</label>
                    <Input
                        type="number"
                        name="LPSP_max_rate"
                        value={formData.LPSP_max_rate}
                        onChange={handleInputChange}
                        className="max-w-md"
                        placeholder="%"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Enter the minimum renewable energy capacity (%)</label>
                    <Input
                        type="number"
                        name="RE_min_rate"
                        value={formData.RE_min_rate}
                        onChange={handleInputChange}
                        placeholder="%"
                        className="max-w-md"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-medium">Electrical Load Information</h3>
                <div>
                    <label className="block text-sm mb-2">Do you have an hourly power consumption dataset of your property for one year?</label>
                    <select
                        name="hourly_dataset"
                        value={formData.hourly_dataset}
                        onChange={handleInputChange}
                        className="flex h-10 w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                
                <div>
                    <label className="block text-sm mb-2">Do you have monthly average power consumption for your building?</label>
                    <select
                        name="monthly_dataset"
                        value={formData.monthly_dataset}
                        onChange={handleInputChange}
                        className="flex h-10 w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                
                {formData.monthly_dataset === "Yes" && (
                <div className="grid grid-cols-2 gap-4">
                    {months.map(month => (
                        <div key={month}>
                            <label className="block text-sm mb-2">{month} (kWh)</label>
                            <Input
                                type="number"
                                name={`monthly_consumption.${month}`}
                                value={formData.monthly_consumption[month] || ''}
                                onChange={handleInputChange}
                                placeholder="kWh"
                            />
                        </div>
                    ))}
                </div>
                )}

                <div>
                    <label className="block text-sm mb-2">Do you know your property's annual power consumption?</label>
                    <select
                        name="annual_power_consumption"
                        value={formData.annual_power_consumption}
                        onChange={handleInputChange}
                        className="flex h-10 w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                {formData.annual_power_consumption === "Yes" && (
                <div>
                    <label className="block text-sm mb-2">Enter your property's annual power consumption (kWh)</label>
                    <Input
                        type="number"
                        name="annual_total_load"
                        value={formData.annual_total_load || ''}
                        onChange={handleInputChange}
                        className="max-w-md"
                        placeholder="kWh"
                    />
                </div>
                )}
            </div>

            <div className="space-y-4">
                <h3 className="font-medium">Energy System Selection</h3>
                <div className="flex gap-4">
                    {['PV', 'WT', 'DG', 'Battery'].map(system => (
                        <div key={system} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.selected_systems.includes(system)}
                                onChange={() => handleCheckboxChange("system", system)}
                                className="h-4 w-4"
                            />
                            <label className="text-sm">{system}</label>
                        </div>
                    ))}
                </div>
                
                {formData.selected_systems.includes("Battery") && (
                <div>
                    <label className="block text-sm mb-2">Battery Type</label>
                    <select
                        name="battery_type"
                        value={formData.battery_type}
                        onChange={handleInputChange}
                        className="flex h-10 w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="Li-ion">Li-ion</option>
                        <option value="Lead-acid">Lead-acid</option>
                    </select>
                </div>
                )}
            </div>
        </div>
    );
};

export default SystemConfig;