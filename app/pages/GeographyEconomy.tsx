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

// Page Components
const GeographyEconomy = ({ formData, handleInputChange }: GeographyEconomyProps) => (
<div className="space-y-6 max-w-2xl">
    <div>
    <p className="mb-2">Get started by entering your address or pick it up on the map below:</p>
    <Input 
        type="text" 
        placeholder="Address" 
        name="address"
        value={formData.address}
        onChange={handleInputChange}
    />
    </div>

    <div className="bg-muted/20 rounded-lg h-64 mb-8">
    <img 
        src="/api/placeholder/800/300"
        alt="Map placeholder" 
        className="w-full h-full object-cover rounded-lg"
    />
    </div>

    <div className="space-y-4">
    <div>
        <label className="block text-sm mb-2">Nominal Discount Rate</label>
        <Input
        type="number"
        name="n_ir_rate"
        value={formData.n_ir_rate}
        onChange={handleInputChange}
        className="max-w-md"
        />
    </div>

    <div>
        <label className="block text-sm mb-2">Expected Inflation Rate</label>
        <Input
        type="number"
        name="e_ir_rate"
        value={formData.e_ir_rate}
        onChange={handleInputChange}
        className="max-w-md"
        />
    </div>

    <div>
        <label className="block text-sm mb-2">Equipment Sale Tax</label>
        <Input
        type="number"
        name="Tax_rate"
        value={formData.Tax_rate}
        onChange={handleInputChange}
        className="max-w-md"
        />
    </div>

    <div>
        <label className="block text-sm mb-2">Investment Tax Credit (ITC)</label>
        <Input
        type="number"
        name="RE_incentives_rate"
        value={formData.RE_incentives_rate}
        onChange={handleInputChange}
        className="max-w-md"
        />
    </div>
    </div>
</div>
);

export default GeographyEconomy;

