import React from 'react';
import { Pause, Play, Square, Clock, Zap, HardDrive } from 'lucide-react';
export const runtime = "edge";
interface RecordingStatusProps {
  duration: string;
  actions: number;
  size: string;
  onPause: () => void;
  onStop: () => void;
}

export default function RecordingStatus({
  duration,
  actions,
  size,
  onPause,
  onStop,
}: RecordingStatusProps) {
  const [isPaused, setIsPaused] = React.useState(false);

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    onPause(); 
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-orange-500/20 rounded-2xl blur" />
        <div className="relative bg-zinc-900/90 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 text-orange-500 font-semibold mb-4">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            RECORDING IN PROGRESS
          </div>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleTogglePause}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  <span>Play</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              )}
            </button>

            <button
              onClick={onStop}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Square className="w-4 h-4" />
              <span>Stop Recording</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 text-xl font-mono">
                <Clock className="w-4 h-4 text-gray-400" />
                {duration}
              </div>
              <div className="text-xs text-gray-400 mt-1">DURATION</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-xl font-mono">
                <Zap className="w-4 h-4 text-gray-400" />
                {actions}
              </div>
              <div className="text-xs text-gray-400 mt-1">ACTIONS</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-xl font-mono">
                <HardDrive className="w-4 h-4 text-gray-400" />
                {size} {/* Ensure size is displayed as KB */}
              </div>
              <div className="text-xs text-gray-400 mt-1">SIZE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}