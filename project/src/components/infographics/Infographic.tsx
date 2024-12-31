import React from 'react';
import { MousePointer2, Cpu, Zap, Network } from 'lucide-react';
export const runtime = "edge";
const features = [
  {
    icon: MousePointer2,
    title: 'Pixel-Perfect Control',
    description: 'Sub-pixel accuracy for precise automation',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Cpu,
    title: 'AI-Powered',
    description: 'Smart recognition & adaptive workflows',
    color: 'from-blue-500 to-purple-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Blazing fast execution speed',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Network,
    title: 'Cross-Platform',
    description: 'Works everywhere, seamlessly',
    color: 'from-green-500 to-emerald-500'
  }
];

export default function Infographic() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
              <feature.icon className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-orange-500 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}