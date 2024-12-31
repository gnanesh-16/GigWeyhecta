import React from 'react';
import { CircleDot } from 'lucide-react';

export const runtime = "edge";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <CircleDot className="w-12 h-12 text-orange-500 animate-spin" />
    </div>
  );
}
