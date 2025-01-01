"use client"

import React from 'react';
import { MapPin, Settings, Database, Grid, Gauge, Download } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const navItems: NavItem[] = [
  { icon: <MapPin className="h-5 w-5" />, label: "Geography and Economy", isActive: true },
  { icon: <Settings className="h-5 w-5" />, label: "System Configuration" },
  { icon: <Database className="h-5 w-5" />, label: "Component Information" },
  { icon: <Grid className="h-5 w-5" />, label: "Grid Information" },
  { icon: <Gauge className="h-5 w-5" />, label: "Optimization" },
  { icon: <Download className="h-5 w-5" />, label: "Results" }
];

export default function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-muted p-6 overflow-y-auto w-[300px]">
      <nav className="space-y-4">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-4 rounded-lg ${
              item.isActive 
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
}