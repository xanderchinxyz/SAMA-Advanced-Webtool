"use client"

import React, { useState } from 'react';
import { MapPin, Settings, Database, Grid, Gauge, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import GeographyEconomy from './pages/GeographyEconomy';
import SystemConfig from './pages/SystemConfig';
import ComponentInfo from './pages/ComponentInfo';
import GridInfoPage from './pages/GridInfoPage';
import OptimizationPage from './pages/OptimizationPage';
import { isHTTPMethod } from 'next/dist/server/web/http';

// Sidebar Component
const Sidebar = ({ activePage, onPageChange }: { activePage: string, onPageChange: (page: string) => void }) => {
  const navItems = [
    { id: 'geography', icon: <MapPin className="h-5 w-5" />, label: "Geography and Economy" },
    { id: 'system', icon: <Settings className="h-5 w-5" />, label: "System Configuration" },
    { id: 'component', icon: <Database className="h-5 w-5" />, label: "Component Information" },
    { id: 'grid', icon: <Grid className="h-5 w-5" />, label: "Grid Information" },
    { id: 'optimization', icon: <Gauge className="h-5 w-5" />, label: "Optimization" },
    { id: 'results', icon: <Download className="h-5 w-5" />, label: "Results" }
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-muted p-6 overflow-y-auto w-[300px]">
      <nav className="space-y-4">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer ${
              activePage === item.id
                ? 'bg-secondary/20 text-secondary' 
                : 'text-muted-foreground hover:bg-muted/50'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

const ResultsPage = () => (
  <div className="space-y-6 max-w-2xl">
    <p className="text-muted-foreground">Results and analysis will be shown here.</p>
  </div>
);

// Main App Component
const apiBaseUrl = "http://127.0.0.1:5000";

const App = () => {
  const [activePage, setActivePage] = useState('geography');
  const [formData, setFormData] = useState({
    address: '',
    n_ir_rate: 5.50,
    e_ir_rate: 2.00,
    Tax_rate: 0.00,
    RE_incentives_rate: 0.00,
    lifetime_simulations: 25,
    LPSP_max_rate: 0.099999,
    RE_min_rate: 75.00,
    hourly_dataset: "No",
    monthly_dataset: "No",
    monthly_consumption: {
      "January": 0,
      "February": 0,
      "March": 0,
      "April": 0,
      "May": 0,
      "June": 0,
      "July": 0,
      "August": 0,
      "September": 0,
      "October": 0,
      "November": 0,
      "December": 0
    },
    annual_power_consumption: "No",
    annual_total_load: 0,
    selected_systems: [],
    battery_type: "Li-ion",

    //PV systems:
    deratingFactor: 0.9,
    tempCoefficient: -0.3,
    tempSTC: 25,
    nominalCellTemp: 0.9,
    ambientTempNOCT: 20,
    solarRadiationNOCT: 800,
    pvEfficiency: 0.2182,
    referenceIrradiance: 1000,
    pvLifetime: 25,
    capitalCost: 534.54,
    replacementCost: 534.54,
    omCost: 28.88,
    
    //Inverter parameters:
    inverterEfficiency: 0.96,
    inverterLifetime: 25,
    maxDcAcRatio: 1.99,
    inverterCapitalCost: 440,
    inverterReplacementCost: 440,
    inverterOmCost: 3.4,
    
    //Diesel Generator parameters:
    dgSlope: 0.273,
    dgIntercept: 0.033,
    dgCapitalCost: 240.45,
    dgReplacementCost: 240.45,
    dgOmCost: 0.066,
    dgFuelCost: 1.428,
    dgFuelEscalationRate: 2,
    
    //Battery common parameters:
    socMin: 0.1,
    socMax: 1,
    socInitial: 0.5,
    selfDischargeRate: 0,
    batteryLifetime: 7.5,
    
    //Lead Acid Battery parameters:
    leadAcidNominalCapacity: 83.4,
    leadAcidMaxChargeRate: 1,
    leadAcidStorageCapacityRatio: 0.403,
    leadAcidStorageRateConstant: 0.827,
    leadAcidMaxChargeCurrent: 16.7,
    leadAcidNominalVoltage: 12,
    leadAcidRoundTripEfficiency: 0.8,
    leadAcidThroughout: 8000,
    
    //Li-ion Battery parameters:
    liIonMaxChargeCurrent: 167,
    liIonMaxDischargeCurrent: 500,
    liIonMaxChargeRate: 1,
    liIonNominalVoltage: 6,
    liIonNominalCapacity: 167,
    liIonRoundTripEfficiency: 0.9,
    liIonThroughout: 3000,
    
    //Battery economic parameters:
    batteryCapitalCost: 458.06,
    batteryReplacementCost: 458.06,
    batteryMaintenanceCost: 10.27,
    
    // Grid connection parameters
    gridConnected: 'Yes',
    netMetered: 'Yes',
    compareOffGridSystem: 'No',
    summerMonths: [],
    holidayDates: [],
    // Economic grid parameters
    Annual_expenses: 0,
    Grid_sale_tax_rate: 0,
    Grid_Tax_amount: 0,
    Grid_escalation_rate: 2,
    Grid_credit: 0,
    NEM_fee: 0,
    SC_flat: 10,
    // Technical grid parameters
    Pbuy_max: 6,
    Psell_max: 200,

    utilityStructure: 'Flat Rate',

    // 5: Optimization
    MaxIt: 200,        // Maximum Number of Iterations
    nPop: 50,          // Population Size (Swarm Size)
    w: 1,              // Inertia Weight
    wdamp: 0.99,       // Inertia Weight Damping Ratio
    c1: 2,             // Personal Learning Coefficient
    c2: 2              // Global Learning Coefficient
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'address') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } if(name.includes('monthly_consumption')) {
      let month = name.split('.')[1];
      setFormData(prev => ({ ...prev, 
        monthly_consumption: {
          ...prev.monthly_consumption,
          [month]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (type: string, object: string) => {
    // Check if the value is already in the list
    if(type === "system") {
      const index = formData.selected_systems.indexOf(object);
    
      let updatedSelectedSystems;
      if (index === -1) {
        // If not in the list, add it
        updatedSelectedSystems = [...formData.selected_systems, object];
      } else {
        // If already in the list, remove it
        updatedSelectedSystems = formData.selected_systems.filter((item) => item !== object);
      }

      // Update the state immutably
      setFormData({
        ...formData,
        selected_systems: updatedSelectedSystems,
      });
    } else if(type === "summer") {
      const index = formData.summerMonths.indexOf(object);

      let updatedSelectedSummerMonths;
      if (index === -1) {
        // If not in the list, add it
        updatedSelectedSummerMonths = [...formData.summerMonths, object];
      } else {
        // If already in the list, remove it
        updatedSelectedSummerMonths = formData.summerMonths.filter((item) => item !== object);
      }

      // Update the state immutably
      setFormData({
        ...formData,
        summerMonths: updatedSelectedSummerMonths,
      });
    } else if(type === "holiday") {
      const index = formData.holidayDates.indexOf(object);

      let updatedSelectedHolidayDates;
      if (index === -1) {
        // If not in the list, add it
        updatedSelectedHolidayDates = [...formData.holidayDates, object];
      } else {
        // If already in the list, remove it
        updatedSelectedHolidayDates = formData.holidayDates.filter((item) => item !== object);
      }

      // Update the state immutably
      setFormData({
        ...formData,
        holidayDates: updatedSelectedHolidayDates,
      });
    }
  };

  const pageOrder = ['geography', 'system', 'component', 'grid', 'optimization', 'results'];

  const handleSubmit = async () => {
    setActivePage('results');
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
      // After successful submission, navigate to results page
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNavigation = (direction: string) => {
    const currentIndex = pageOrder.indexOf(activePage);
    if (direction === 'next' && currentIndex < pageOrder.length - 1) {
      setActivePage(pageOrder[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActivePage(pageOrder[currentIndex - 1]);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'geography':
        return <GeographyEconomy formData={formData} handleInputChange={handleInputChange} />;
      case 'system':
        return <SystemConfig formData={formData} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange}/>;
      case 'component':
        return <ComponentInfo formData={formData} handleInputChange={handleInputChange}/>;
      case 'grid':
        return <GridInfoPage formData={formData} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange}/>;
      case 'optimization':
        return <OptimizationPage formData={formData} handleInputChange={handleInputChange}/>;
      case 'results':
        return <ResultsPage />;
      default:
        return (<div>Error</div>);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      
      <main className="min-h-screen bg-background ml-[350px]">
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-2">
            {pageOrder.indexOf(activePage) + 1}. {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          </h1>

          {renderPage()}

          <div className="flex space-x-6 pt-8">
            {activePage !== pageOrder[pageOrder.length - 1] && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => handleNavigation('prev')}
                  disabled={activePage === pageOrder[0]}
                >
                  Previous
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => {
                    activePage === 'optimization' ? handleSubmit() : handleNavigation('next')
                  }}
                >
                  {activePage === 'optimization' ? 'Submit' : 'Next'}
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;