import React, { useState, useEffect, useRef } from 'react';
import { Play, MousePointer2, Cpu, Zap, Network, ListVideo, Repeat } from 'lucide-react';
import Container from './layout/Container';
import RecordingStatus from './recording/RecordingStatus';
import RecordingsList from './recording/RecordingsList';
import Infographic from './infographics/Infographic';
export const runtime = "edge";

export default function Hero() {
  const [isRecording, setIsRecording] = useState(false);
  const [showRecordings, setShowRecordings] = useState(false);
  const [recordings, setRecordings] = useState([
    {
      id: '1',
      name: 'Login Automation',
      date: new Date().toLocaleString(),
      duration: '00:45',
      size: '1.2 MB'
    }
  ]);
  const [duration, setDuration] = useState(0);
  const [actions, setActions] = useState(0);
  const [size, setSize] = useState(0);

  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null); // Add this state

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
        setActions(Math.floor(Math.random() * 52) + 1);
        // Increase size by 0.1 KB per second
        setSize(prevSize => prevSize + 0.1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setShowRecordings(false);
    setDuration(0);
    setActions(0);
    setSize(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    const newRecording = {
      id: Date.now().toString(),
      name: `Recording ${recordings.length + 1}`,
      date: new Date().toLocaleString(),
      duration: new Date(duration * 1000).toISOString().substr(11, 8),
      // Always display size in KB
      size: `${size.toFixed(2)} KB`
    };
    setRecordings([...recordings, newRecording]);
  };

  const handleDeleteRecording = (id: string) => {
    setRecordings(recordings.filter(rec => rec.id !== id));
    // If the deleted recording was playing, reset currentlyPlayingId
    if (currentlyPlayingId === id) {
      setCurrentlyPlayingId(null);
    }
  };

  const handleLoopClick = (id: string) => {
    setRecordings(recordings.map(rec =>
      rec.id === id
        ? { ...rec, loopCount: (rec.loopCount || 0) + 1 }
        : rec
    ));
  };

  const handleResetLoop = (id: string) => {
    setRecordings(recordings.map(rec =>
      rec.id === id
        ? { ...rec, loopCount: undefined }
        : rec
    ));
  };

  const handleRename = (id: string, newName: string) => {
    setRecordings(recordings.map(rec =>
      rec.id === id
        ? { ...rec, name: newName }
        : rec
    ));
  };

  const handlePlayRecording = (id: string) => {
    if (currentlyPlayingId === id) {
      // If already playing, pause it
      setCurrentlyPlayingId(null);
      // Add logic to pause the recording if necessary
      console.log('Paused', id);
    } else {
      // Start playing new recording
      setCurrentlyPlayingId(id);
      // Add logic to play the recording if necessary
      console.log('Playing', id);
    }
  };

  const handlePauseRecording = (id: string) => {
    if (currentlyPlayingId === id) {
      setCurrentlyPlayingId(null);
      // Add logic to pause the recording if necessary
      console.log('Paused', id);
    }
  };

  // New state for typewriter effect
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'AI-powered intelligence';
  const typingSpeed = 150; // milliseconds
  const deletingSpeed = 100; // milliseconds
  const pauseBetween = 1500; // milliseconds
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % 2;
      const updatedText = isDeleting
        ? fullText.substring(0, displayedText.length - 1)
        : fullText.substring(0, displayedText.length + 1);

      setDisplayedText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseBetween);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum]);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,77,0,0.08),transparent_50%)]" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-float-slow opacity-60">
          <MousePointer2 className="w-16 h-16 text-orange-500/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed opacity-40">
          <Cpu className="w-24 h-24 text-orange-500/10" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float opacity-50">
          <Zap className="w-20 h-20 text-orange-500/15" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 animate-float-delayed opacity-30">
          <Network className="w-28 h-28 text-orange-500/10" />
        </div>
      </div>

      {/* Main Content */}
      <Container className="relative pt-32 pb-20 flex flex-col items-center justify-center flex-grow">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-7xl sm:text-8xl font-bold tracking-tight animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">
              Web Automation
            </span>
            <br />
            <span className="relative inline-block mt-2">
              <span className="animate-gradient-x text-6xl sm:text-7xl bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
                Reimagined
              </span>
              <div className="absolute -inset-x-6 -inset-y-4 bg-orange-500/20 blur-2xl -z-10" />
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto animate-fade-in">
            Automate your web workflows with pixel-perfect precision and
            <span className="text-orange-500">
              <span className="ml-1 inline-block">
                {displayedText}
                <span className="border-r-2 border-white animate-pulse ml-1"></span>
              </span>
            </span>
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            <button
              onClick={handleStartRecording}
              className="group relative inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 border border-transparent hover:border-slate-300 w-full sm:w-auto sm:px-14"
            >
              <Play className="w-5 h-5" />
              <span className="font-medium">Start Recording</span>
            </button>

            <button
              onClick={() => setShowRecordings(true)}
              className="group relative inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 border border-transparent hover:border-slate-300 w-full sm:w-auto sm:px-14"
            >
              <ListVideo className="w-5 h-5" />
              <span className="font-medium">View Recordings</span>
            </button>
          </div>
        </div>

        {/* Recordings List or Infographic */}
        <div className="mt-32 w-full flex-grow">
          {showRecordings ? (
            <RecordingsList
              recordings={recordings}
              onPlay={handlePlayRecording}
              onPause={handlePauseRecording} // Pass onPause prop
              onDelete={handleDeleteRecording}
              onLoop={handleLoopClick}
              onResetLoop={handleResetLoop}
              onRename={handleRename}
              currentlyPlayingId={currentlyPlayingId} // Pass currentlyPlayingId prop
            />
          ) : (
            <Infographic />
          )}
        </div>
      </Container>

      {/* Recording Status */}
      {isRecording && (
        <RecordingStatus
          duration={new Date(duration * 1000).toISOString().substr(11, 8)}
          actions={actions}
          size={`${size.toFixed(2)} KB`}
          onPause={() => console.log('Paused')}
          onStop={handleStopRecording}
        />
      )}
    </main>
  );
}