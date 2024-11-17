"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"

// Change this when in production
const apiBaseUrl: string = "http://127.0.0.1:5000"

interface FormData {
  n_ir_rate: number;
  e_ir_rate: number;
  Tax_rate: number;
  RE_incentives_rate: number;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    n_ir_rate: 5.5,
    e_ir_rate: 2.0,
    Tax_rate: 0,
    RE_incentives_rate: 0
  });

  const handleInputChange = (e: any) => {   // Every time a number changes on the 
    const { name, value } = e.target;
    let tempValue = parseFloat(value)
    setFormData(prev => ({
      ...prev,
      [name]: tempValue >= 100.0 ? 100.0 : tempValue
    }));
  };

  const handleSubmit = async () => {
    console.log(formData)
    try {
      const response = await fetch(`${apiBaseUrl}/submit/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="dark text-foreground bg-background min-h-screen p-24">
      <h1>Step 1: Geography and Economy</h1>

      <h2>Nominal Discount Rate %</h2>
      <Input type="number" name="n_ir_rate" value={formData.n_ir_rate} onChange={handleInputChange}/>
      <h2>Expected Inflation Rate %</h2>
      <Input type="number" name="e_ir_rate" value={formData.e_ir_rate} onChange={handleInputChange} />
      <h2>Equipment Sale Tax %</h2>
      <Input type="number" name="Tax_rate" value={formData.Tax_rate} onChange={handleInputChange} />
      <h2>Investment Tax Credit (ITC) %</h2>
      <Input type="number" name="RE_incentives_rate" value={formData.RE_incentives_rate} onChange={handleInputChange} />
      <Button variant="secondary" onClick={handleSubmit}>Submit</Button>
    </main>
  )
}
