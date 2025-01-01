"use client"

import React, { useState } from 'react';
import { MapPin, Settings, Database, Grid, Gauge, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import GeographyEconomy from './pages/GeographyEconomy';
import SystemConfig from './pages/SystemConfig';
import ComponentInfo from './pages/ComponentInfo';

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

const GridInfoPage = () => (
  <div className="space-y-6 max-w-2xl">
    <p className="text-muted-foreground">Grid information will be displayed here.</p>
  </div>
);

const OptimizationPage = () => (
  <div className="space-y-6 max-w-2xl">
    <p className="text-muted-foreground">Optimization settings and controls will be available here.</p>
  </div>
);

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
    RE_incentives_rate: 0.00
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'address') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      let tempValue = parseFloat(value);
      setFormData(prev => ({
        ...prev,
        [name]: tempValue >= 100.0 ? 100.0 : tempValue
      }));
    }
  };

  const pageOrder = ['geography', 'system', 'component', 'grid', 'optimization', 'results'];

  const handleSubmit = async () => {
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
      setActivePage('results');
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
        return <SystemConfig />;
      case 'component':
        return <ComponentInfo />;
      case 'grid':
        return <GridInfoPage />;
      case 'optimization':
        return <OptimizationPage />;
      case 'results':
        return <ResultsPage />;
      default:
        return (<div>Error</div>);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      
      <main className="min-h-screen bg-background ml-[300px]">
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-2">
            {pageOrder.indexOf(activePage) + 1}. {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {activePage === 'geography' ? 
              'Default values are provided for some questions, but please review and adjust as necessary for more accurate results.' :
              'Please fill in the required information below.'}
          </p>

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
                  onClick={() => activePage === 'optimization' ? handleSubmit() : handleNavigation('next')}
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