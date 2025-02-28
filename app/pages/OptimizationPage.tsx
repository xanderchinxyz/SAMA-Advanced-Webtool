import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OptimizationPageProps {
    formData: {
        MaxIt: number;
        nPop: number;
        w: number;
        wdamp: number;
        c1: number;
        c2: number;
    };
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const OptimizationPage: React.FC<OptimizationPageProps> = ({ 
    formData,
    handleInputChange
}) => {
    return (
        <div className="space-y-6 max-w-3xl">
            <p className="text-sm text-muted-foreground mb-8">
                Default values are provided for some questions, but please review and adjust as necessary for more accurate results.
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm mb-2">Maximum Number of Iterations</label>
                    <Input
                        type="number"
                        name="MaxIt"
                        value={formData.MaxIt}
                        onChange={handleInputChange}
                        placeholder="Enter maximum iterations"
                        className="max-w-md"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Population Size (Swarm Size)</label>
                    <Input
                        type="number"
                        name="nPop"
                        value={formData.nPop}
                        onChange={handleInputChange}
                        placeholder="Enter population size"
                        className="max-w-md"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Inertia Weight</label>
                    <Input
                        type="number"
                        name="w"
                        value={formData.w}
                        onChange={handleInputChange}
                        placeholder="Enter inertia weight"
                        className="max-w-md"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Inertia Weight Damping Ratio</label>
                    <Input
                        type="number"
                        name="wdamp"
                        value={formData.wdamp}
                        onChange={handleInputChange}
                        placeholder="Enter damping ratio"
                        className="max-w-md"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Personal Learning Coefficient</label>
                    <Input
                        type="number"                   
                        name="c1"
                        value={formData.c1}
                        onChange={handleInputChange}
                        placeholder="Enter personal learning coefficient"
                        className="max-w-md"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Global Learning Coefficient</label>
                    <Input
                        type="number"
                        name="c2"
                        value={formData.c2}
                        onChange={handleInputChange}
                        placeholder="Enter global learning coefficient"
                        className="max-w-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default OptimizationPage;