import React from 'react';
import { MousePointer, Code, Settings, Zap } from 'lucide-react';
import FeatureIcon from '../icons/FeatureIcon';
export const runtime = "edge";
const features = [
  {
    icon: MousePointer,
    title: 'Pixel-Perfect Control',
    description: 'Precise cursor movements and actions with sub-pixel accuracy'
  },
  {
    icon: Code,
    title: 'Code Generation',
    description: 'Automatically generate clean, maintainable automation scripts'
  },
  {
    icon: Settings,
    title: 'Smart Configuration',
    description: 'Intelligent settings that adapt to your workflow'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Blazing fast execution with minimal resource usage'
  }
];

export default function FeatureList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <div key={index} className="text-center">
          <FeatureIcon Icon={feature.icon} />
          <h3 className="mt-4 font-semibold text-lg">{feature.title}</h3>
          <p className="mt-2 text-gray-400 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}