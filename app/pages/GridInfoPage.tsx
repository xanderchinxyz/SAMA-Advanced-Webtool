import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface GridInfoProps {
    formData: {
        gridConnected: string;
        netMetered: string;
        compareOffGridSystem: string;
        summerMonths: string[];
        holidayDates: string[]; // Changed from holidayMonths to holidayDates
        utilityStructure: string;
    };
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleCheckboxChange: (type: 'summer' | 'holiday', month: string) => void;
}

const GridInfoPage: React.FC<GridInfoProps> = ({ 
    formData,
    handleInputChange,
    handleCheckboxChange,
}) => {
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    // Month to number of days mapping
    const daysInMonth = {
        'January': 31, 'February': 29, 'March': 31, 'April': 30,
        'May': 31, 'June': 30, 'July': 31, 'August': 31,
        'September': 30, 'October': 31, 'November': 30, 'December': 31
    };

    // State to track which months to display in the date picker
    const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({});

    // Toggle month expansion
    const toggleMonth = (month: string) => {
        setExpandedMonths(prev => ({
            ...prev,
            [month]: !prev[month]
        }));
    };

    // Generate date string in MM/DD format
    const getDateString = (month: string, day: number) => {
        const monthIndex = months.indexOf(month) + 1;
        return `${monthIndex.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6 max-w-3xl">
            <p className="text-sm text-muted-foreground mb-8">
                Default values are provided for some questions, but please review and adjust as necessary for more accurate results.
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm mb-2">Is your energy system grid connected or not?</label>
                    <select
                        name="gridConnected"
                        value={formData.gridConnected}
                        onChange={handleInputChange}
                        className="flex h-10 w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm mb-2">Is your energy system net metered?</label>
                    <select
                        name="netMetered"
                        value={formData.netMetered}
                        onChange={handleInputChange}
                        className="flex h-10 w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                {formData.gridConnected === "No" && (
                <div className="pb-6">
                    <label className="block text-sm mb-2">Do you want to compare your off-grid system with the time you only buy electricity from grid?</label>
                    <select
                        name="compareOffGridSystem"
                        value={formData.compareOffGridSystem}
                        onChange={handleInputChange}
                        className="flex h-10 w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                )}

                {formData.gridConnected === "No" && formData.compareOffGridSystem === "Yes" && (
                <div>

                {/* Economic Grid Information */}
                <div className="">
                    <h2 className="text-lg font-semibold mb-6">Economic Grid Information</h2>
                    <div className="space-y-4">
                        {[
                            { label: "Annual expenses for Grid interconnection ($)", name: "Annual_expenses", placeholder: "$" },
                            { label: "Sale tax percentage of grid electricity (%)", name: "Grid_sale_tax_rate", placeholder: "%" },
                            { label: "Grid adjustments in kWh", name: "Grid_Tax_amount", placeholder: "kWh" },
                            { label: "Yearly escalation rate in grid electricity prices (%)", name: "Grid_escalation_rate", placeholder: "%" },
                            { label: "Annual Credits offered by utility grid to users ($)", name: "Grid_credit", placeholder: "$" },
                            ...(formData.netMetered === "Yes" ? [{ label: "Net metering one time setup fee ($)", name: "NEM_fee", placeholder: "$" }] : []),
                            { label: "Grid monthly fixed charge ($/kWh)", name: "SC_flat", placeholder: "$/kWh" },
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
                </div>

                {/* Technical Grid Information */}
                <div className="mb-16">
                    <h2 className="text-lg font-semibold mb-6">Technical Grid Information</h2>
                    <div className="space-y-4">
                        {[
                            { label: "Purchase Capacity (kW)", name: "Pbuy_max", placeholder: "kW" },
                            { label: "Sell Capacity (kW)", name: "Psell_max", placeholder: "kW" },
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

                <div>
                    <label className="block text-sm mb-4">Which months are considered summer by your utility?</label>
                    <div className="grid grid-cols-2 gap-4">
                        {months.map((month) => (
                            <div key={month} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.summerMonths.includes(month)}
                                    onChange={() => handleCheckboxChange('summer', month)}
                                    className="h-4 w-4"
                                />
                                <label className="text-sm">{month}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pb-6">
                    <label className="block text-sm mb-4">Which dates of the year are considered holidays by your utility company?</label>
                    
                    {/* Month dropdown accordion for date selection */}
                    <div className="border rounded-md">
                        {months.map((month) => (
                            <div key={month} className="border-b last:border-b-0">
                                <button
                                    type="button"
                                    onClick={() => toggleMonth(month)}
                                    className="flex justify-between items-center w-full p-3 text-left text-sm font-medium hover:bg-gray-50"
                                >
                                    <span>{month}</span>
                                    <span>{expandedMonths[month] ? '−' : '+'}</span>
                                </button>
                                
                                {expandedMonths[month] && (
                                    <div className="p-3 bg-gray-50">
                                        <div className="grid grid-cols-7 gap-2">
                                            {Array.from({ length: daysInMonth[month as keyof typeof daysInMonth] }, (_, i) => i + 1).map((day) => {
                                                const dateString = getDateString(month, day);
                                                return (
                                                    <div key={dateString} className="flex items-center gap-1">
                                                        <input
                                                            type="checkbox"
                                                            id={`holiday-${dateString}`}
                                                            checked={formData.holidayDates.includes(dateString)}
                                                            onChange={(e) => handleCheckboxChange("holiday", dateString)}
                                                            className="h-4 w-4"
                                                        />
                                                        <label htmlFor={`holiday-${dateString}`} className="text-xs">{day}</label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-2">Select a Utility Structure</label>
                    <div className="flex gap-4">
                        <select
                            name="utilityStructure"
                            value={formData.utilityStructure}
                            onChange={handleInputChange}
                            className="flex h-10 w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="Flat Rate">Flat Rate</option>
                            <option value="Seasonal Rate">Seasonal Rate</option>
                            <option value="Monthly Rate">Monthly Rate</option>
                            <option value="Tiered Rate">Tiered Rate</option>
                            <option value="Seasonal Tiered Rate">Seasonal Tiered Rate</option>
                            <option value="Monthly Tiered Rate">Monthly Tiered Rate</option>
                            <option value="Time of Use Rate">Time of Use Rate</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GridInfoPage;