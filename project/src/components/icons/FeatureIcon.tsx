import React from 'react';
import { LucideIcon } from 'lucide-react';
export const runtime = "edge";
interface FeatureIconProps {
  Icon: LucideIcon;
}

export default function FeatureIcon({ Icon }: FeatureIconProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-4 rounded-full border border-orange-500/20 bg-orange-500/5">
        <Icon className="w-6 h-6 text-orange-500" />
      </div>
    </div>
  );
}