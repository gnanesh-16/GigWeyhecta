import React, { useState } from 'react';
import { Play, Pause, Trash2, Clock, HardDrive, Repeat, X, Edit3 } from 'lucide-react'; // Add Edit3 icon
export const runtime = "edge";

interface Recording {
  id: string;
  name: string;
  date: string;
  duration: string;
  size: string;
  loopCount?: number; // Add this new property
}

interface RecordingsListProps {
  recordings: Recording[];
  onPlay: (id: string) => void;
  onPause: (id: string) => void; // Add onPause prop
  onDelete: (id: string) => void;
  onLoop: (id: string) => void; // Make onLoop required
  onResetLoop: (id: string) => void; // Add new prop
  onRename: (id: string, newName: string) => void; // Add new prop
  currentlyPlayingId: string | null; // Add currentlyPlayingId prop
  duration?: string; // Add
  actions?: number;  // Add
  size?: string;     // Add
}

export default function RecordingsList({ recordings, onPlay, onPause, onDelete, onLoop, onResetLoop, onRename, currentlyPlayingId, duration, actions, size }: RecordingsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>('');

  const handleRename = (id: string) => {
    onRename(id, newName);
    setEditingId(null);
    setNewName('');
  };

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center"></h2>
      <div className="space-y-3">
        {recordings.map((recording) => (
          <div key={recording.id} className="relative mt-6"> {/* Increased top margin */}
            <div 
              className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {editingId === recording.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="bg-zinc-800 text-white rounded-lg px-2 py-1 border border-gray-300"
                      />
                      <button
                        onClick={() => handleRename(recording.id)}
                        className="text-green-500 hover:text-green-700 transition-colors text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-red-500 hover:text-red-700 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white group-hover:text-orange-500 transition-colors">
                        {recording.name}
                      </h3>
                      <button
                        onClick={() => {
                          setEditingId(recording.id);
                          setNewName(recording.name);
                        }}
                        className="text-blue-500 hover:text-blue-300 transition-colors"
                        title="Edit name"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recording.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <HardDrive className="w-4 h-4" />
                      {recording.size}
                    </div>
                    <div className="text-gray-500">{recording.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 relative">
                  {/* Toggle between Play and Pause with Enhanced Animation */}
                  <button
                    onClick={() => {
                      currentlyPlayingId === recording.id ? onPause(recording.id) : onPlay(recording.id);
                    }}
                    className={`relative p-2 rounded-full transition-transform duration-300 ${
                      currentlyPlayingId === recording.id
                        ? 'text-red-500 transform rotate-90'
                        : 'hover:bg-white/10 text-orange-500'
                    }`}
                    title={currentlyPlayingId === recording.id ? 'Pause recording' : 'Play recording'}
                  >
                    {currentlyPlayingId === recording.id ? (
                      <>
                        {/* Glowing Background */}
                        <span className="absolute inset-0 bg-red-500/20 rounded-full blur-lg animate-pulse"></span>
                        <Pause className="w-4 h-4 relative z-10" />
                      </>
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => onLoop(recording.id)}
                    className="p-2 rounded-full hover:bg-white/10 text-blue-500 transition-colors"
                    title="Loop recording"
                  >
                    <Repeat className="w-4 h-4" />
                  </button>
                  {recording.loopCount && recording.loopCount > 0 && (
                    <div className="absolute -top-6 right-4 bg-black/80 px-2 py-1 rounded-full border border-gray-500/30 flex items-center gap-1 backdrop-blur-sm">
                      <span className="text-gray-300 text-xs font-medium">Loop: {recording.loopCount}</span>
                      <button
                        onClick={() => onResetLoop(recording.id)}
                        className="hover:text-red-500 transition-colors border border-red-500 rounded-full p-0.5"
                        title="Reset loop count"
                      >
                        <X className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => onDelete(recording.id)}
                    className="p-2 rounded-full hover:bg-white/10 text-red-500 transition-colors"
                    title="Delete recording"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}