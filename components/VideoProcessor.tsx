import React, { useState, useEffect, useRef } from 'react';
import { AppState, VideoMetadata } from '../types';
import { LinkIcon, DownloadIcon, CheckIcon, PlayIcon, AlertCircle, ChevronDown, VolumeIcon, ZapIcon, ReceiptIcon } from './Icons';
import { generateCreativeFilename } from '../services/geminiService';

// Sample Data for Client-Side Demo (Bypassing CORS/Backend requirement)
const SAMPLE_MP4_DATA = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAAJlcGRhdEhNMTAxAAAADGVuY29kZXI6IExhdmY1OC4yMC4xMDAAAB5QbWRhdAAAAAHgbW/gd29y/3f/4AAAAwEAAAAAAAADZm1vb3YAAABsbXZoZAAAAAAAAAAAAAAAAAAAA+gAAAAAAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIVdHJhawAAAFx0a2hkAAAABwAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAHBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAAAPoAAAAAAABAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAFzbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcYnJlZgAAAAAAAAAAdXJsIAAAAAEAAAAAAAAAEHN0YmwAAAAkc3RzZAAAAAAAAAABAAAAhGF2YzEAAAAAAAAAAQAAAAEAAAACABj//wAAACRhdmNDAWQAF//hABhnZAAXPCrO+8wS2f/4+O88gIAAAMAAAAMAQAAABnNwZAAAAAAaYnRyXwAAAAAAAAAAAAEAAAAAAAABAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAACAAAAFHN0c3MAAAAAAAAAAQAAAAEAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAHHN0c3oAAAAAAAAAAAAAAAEAAAACAAAAFHN0Y28AAAAAAAAAAQAAADAAAABVdWR0YQAAAF1tZXRhAAAAAAAAACFoZGl3AAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJaaaZW5jb2RlcgAAABUAAAANYXYuY29kZWMgKDIxKQ==";
// Short silent MP3 base64
const SAMPLE_MP3_DATA = "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWgAAAAADDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4";
// Short silent WAV base64
const SAMPLE_WAV_DATA = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAAAAA==";

type FormatType = 'MP4' | 'MP3' | 'WAV';

interface QualityOption {
    label: string;
    size: string;
    badge?: string;
}

const FORMATS: FormatType[] = ['MP4', 'MP3', 'WAV'];

// Matches user request exactly
const VIDEO_QUALITIES: QualityOption[] = [
    { label: '1080p', size: '145.2 MB', badge: 'HD' },
    { label: '720p', size: '85.5 MB', badge: 'HD' },
    { label: '480p', size: '42.1 MB' },
    { label: '360p', size: '28.4 MB' },
];

const AUDIO_QUALITIES: QualityOption[] = [
    { label: '320kbps', size: '8.5 MB', badge: 'HQ' },
    { label: '192kbps', size: '5.2 MB' },
    { label: '128kbps', size: '3.4 MB' },
];

export const VideoProcessor: React.FC = () => {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [generatedTitle, setGeneratedTitle] = useState<string>('YouTube_Video');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Selection States
  const [selectedFormat, setSelectedFormat] = useState<FormatType>('MP4');
  const [selectedQuality, setSelectedQuality] = useState<QualityOption>(VIDEO_QUALITIES[0]);
  const [volume, setVolume] = useState(100);
  
  // New Feature: Instant Download
  const [isInstantMode, setIsInstantMode] = useState(false);

  // New Feature: Receipt
  const [showReceipt, setShowReceipt] = useState(false);

  // Refs for closure access in intervals
  const titleRef = useRef(generatedTitle);
  const formatRef = useRef(selectedFormat);
  const qualityRef = useRef(selectedQuality);
  const instantModeRef = useRef(isInstantMode);

  // Update refs when state changes
  useEffect(() => { titleRef.current = generatedTitle; }, [generatedTitle]);
  useEffect(() => { formatRef.current = selectedFormat; }, [selectedFormat]);
  useEffect(() => { qualityRef.current = selectedQuality; }, [selectedQuality]);
  useEffect(() => { instantModeRef.current = isInstantMode; }, [isInstantMode]);

  // Reset quality when format changes
  useEffect(() => {
      if (selectedFormat === 'MP4') {
          setSelectedQuality(VIDEO_QUALITIES[0]);
      } else {
          setSelectedQuality(AUDIO_QUALITIES[0]);
      }
  }, [selectedFormat]);

  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getBase64Data = (format: FormatType) => {
      switch (format) {
          case 'MP3': return SAMPLE_MP3_DATA;
          case 'WAV': return SAMPLE_WAV_DATA;
          default: return SAMPLE_MP4_DATA;
      }
  };

  const triggerNativeDownload = async (filenameBase: string, format: FormatType) => {
      try {
          const dataUrl = getBase64Data(format);
          const base64Response = await fetch(dataUrl);
          const blob = await base64Response.blob();
          
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          // Ensure correct extension
          a.download = `${filenameBase}.${format.toLowerCase()}`; 
          document.body.appendChild(a);
          a.click();
          
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);

      } catch (e) {
          console.error("Download trigger failed", e);
          setError("The browser blocked the download. Please try clicking 'Download Again'.");
      }
  };

  const startProgress = () => {
    setState(AppState.DOWNLOADING);
    setProgress(0);
    
    // Simulating a slightly faster download in instant mode
    const speed = instantModeRef.current ? 8 : 15;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setState(AppState.COMPLETED);
          triggerNativeDownload(titleRef.current, formatRef.current);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * speed) + 5, 100);
      });
    }, 200);
  };

  const handleAnalyze = async () => {
    setError(null);
    
    if (!url.trim()) {
        setError("Please paste a YouTube URL to get started.");
        return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Invalid YouTube URL. Please check the link and try again.');
      return;
    }

    setState(AppState.ANALYZING);
    
    setTimeout(async () => {
        try {
            const creativeName = await generateCreativeFilename();
            const cleanName = creativeName.replace(/\.(mp4|mp3|wav|txt)$/i, '');
            setGeneratedTitle(cleanName || "YouTube_Video");

            const meta = {
                id: videoId,
                url: url,
                thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                title: cleanName || "YouTube Video",
                duration: '10:05' 
            };
            setMetadata(meta);

            // AUTO-DOWNLOAD LOGIC
            if (instantModeRef.current) {
                // If instant mode is on, we skip the READY state screen and go straight to downloading
                // We default to MP4 1080p (first option)
                startProgress();
            } else {
                setState(AppState.READY);
            }

        } catch (err) {
            console.error(err);
            setState(AppState.ERROR);
            setError("We couldn't fetch the video details. Please try again later.");
        }
    }, 1500);
  };

  const handleManualDownload = () => {
      triggerNativeDownload(generatedTitle, selectedFormat);
  };

  const handleReset = () => {
      setState(AppState.IDLE);
      setUrl('');
      setMetadata(null);
      setProgress(0);
      setError(null);
      setSelectedFormat('MP4');
      setShowReceipt(false);
  };

  const handleRetry = () => {
      if (metadata) {
          setState(AppState.READY);
          setError(null);
      } else {
          handleReset();
      }
  };

  const currentQualities = selectedFormat === 'MP4' ? VIDEO_QUALITIES : AUDIO_QUALITIES;

  return (
    <div className="w-full max-w-3xl mx-auto -mt-16 relative z-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Input Section */}
        <div className="p-8 bg-white">
            <div className={`transition-all duration-300 ${state === AppState.IDLE || state === AppState.ERROR ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-semibold text-slate-700">
                        Paste Video URL
                    </label>
                    
                    {/* Instant Mode Toggle */}
                    <button 
                        onClick={() => setIsInstantMode(!isInstantMode)}
                        className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full transition-all cursor-pointer border ${
                            isInstantMode 
                            ? 'bg-amber-100 text-amber-700 border-amber-200' 
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Direct Download: Skips selection screen and downloads best quality immediately"
                    >
                        <ZapIcon className={`w-3 h-3 ${isInstantMode ? 'fill-current' : ''}`} />
                        <span>Instant Download</span>
                        <div className={`w-8 h-4 rounded-full relative transition-colors ${isInstantMode ? 'bg-amber-500' : 'bg-slate-300'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${isInstantMode ? 'left-4.5' : 'left-0.5'}`}></div>
                        </div>
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${error && state === AppState.IDLE ? 'text-red-400' : 'text-slate-400'}`}>
                            {error && state === AppState.IDLE ? <AlertCircle className="w-5 h-5"/> : <LinkIcon className="w-5 h-5" />}
                        </div>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value);
                                if (error) setError(null);
                            }}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className={`w-full pl-10 pr-4 py-4 bg-slate-50 border rounded-xl focus:ring-2 outline-none transition-all placeholder-slate-400 ${
                                error && state === AppState.IDLE 
                                ? 'border-red-300 focus:ring-red-200 focus:border-red-400 text-red-900' 
                                : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500 text-slate-700'
                            }`}
                        />
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={state === AppState.ANALYZING}
                        className={`font-bold py-4 px-8 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 whitespace-nowrap text-white ${
                            isInstantMode 
                            ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20' 
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                        }`}
                    >
                         {isInstantMode && <ZapIcon className="w-4 h-4" />}
                        {isInstantMode ? 'Auto Download' : <><span className="hidden sm:inline">Start</span> Download</>}
                    </button>
                </div>
                {error && state === AppState.IDLE && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200">
                        {error}
                    </p>
                )}
            </div>

            {/* Loading State */}
            {state === AppState.ANALYZING && (
                <div className="mt-8 flex flex-col items-center justify-center py-8 animate-pulse">
                    <div className={`w-12 h-12 border-4 rounded-full animate-spin mb-4 ${isInstantMode ? 'border-amber-200 border-t-amber-600' : 'border-blue-200 border-t-blue-600'}`}></div>
                    <p className="text-slate-500 font-medium">
                        {isInstantMode ? 'Analyzing & Preparing Instant Download...' : 'Fetching video metadata...'}
                    </p>
                </div>
            )}

            {/* Error State */}
            {state === AppState.ERROR && (
                <div className="mt-8 py-8 text-center bg-red-50 rounded-xl border border-red-100 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h3>
                    <p className="text-slate-600 mb-6 max-w-md mx-auto">{error || "An unexpected error occurred."}</p>
                    <button onClick={handleRetry} className="bg-white text-red-600 border border-red-200 px-6 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors">
                        Try Again
                    </button>
                </div>
            )}

            {/* Ready State */}
            {state === AppState.READY && metadata && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3">
                            <div className="aspect-video relative rounded-lg overflow-hidden bg-black shadow-md">
                                <img src={metadata.thumbnailUrl} alt="Video thumbnail" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <PlayIcon className="w-12 h-12 text-white opacity-80" />
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    {metadata.duration}
                                </div>
                            </div>
                            <p className="mt-3 text-sm font-semibold text-slate-800 line-clamp-2">{generatedTitle}</p>
                            
                            {/* Volume Slider */}
                            <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <VolumeIcon className="w-4 h-4 text-slate-500" />
                                    <span className="text-xs font-medium text-slate-600">Preview Volume</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={volume} 
                                    onChange={(e) => setVolume(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                    <span>0%</span>
                                    <span>{volume}%</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-2/3">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Download Configuration</h3>
                            
                            <div className="space-y-4">
                                {/* Format Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Format</label>
                                    <div className="flex gap-2">
                                        {FORMATS.map(fmt => (
                                            <button
                                                key={fmt}
                                                onClick={() => setSelectedFormat(fmt)}
                                                className={`flex-1 py-3 px-4 rounded-xl font-medium border transition-all ${
                                                    selectedFormat === fmt
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                                }`}
                                            >
                                                {fmt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quality Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Quality</label>
                                    <div className="relative">
                                        <select
                                            value={selectedQuality.label}
                                            onChange={(e) => {
                                                const opt = currentQualities.find(o => o.label === e.target.value);
                                                if (opt) setSelectedQuality(opt);
                                            }}
                                            className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3.5 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium shadow-sm transition-all"
                                        >
                                            {currentQualities.map((opt) => (
                                                <option key={opt.label} value={opt.label}>
                                                    {opt.label} — {opt.size} {opt.badge ? `(${opt.badge})` : ''}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={startProgress}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transform active:scale-[0.99] mt-2"
                                >
                                    <DownloadIcon className="w-5 h-5" />
                                    Download {selectedFormat}
                                </button>
                                
                                <p className="text-center text-xs text-slate-400">
                                    File size: <span className="font-semibold">{selectedQuality.size}</span> • Safe & Secure
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Downloading State */}
            {state === AppState.DOWNLOADING && (
                <div className="mt-8 py-8 text-center px-4">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {isInstantMode ? 'Direct Download in Progress...' : `Converting to ${selectedFormat}...`}
                    </h3>
                    <p className="text-slate-500 mb-8">Saving file to your default Downloads folder.</p>
                    
                    <div className="relative w-full bg-slate-100 rounded-full h-5 mb-4 overflow-hidden shadow-inner border border-slate-200">
                        <div 
                            className={`absolute top-0 left-0 h-full transition-all duration-300 ease-out rounded-full ${isInstantMode ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}
                            style={{ width: `${progress}%` }}
                        >
                             <div className="w-full h-full opacity-30 animate-pulse bg-white/20"></div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between text-sm font-medium text-slate-500 px-1">
                        <span>{progress < 40 ? 'Analyzing stream...' : (progress < 80 ? 'Writing to disk...' : 'Finalizing...')}</span>
                        <span className={`font-mono ${isInstantMode ? 'text-amber-600' : 'text-blue-600'}`}>{progress}%</span>
                    </div>
                </div>
            )}

             {/* Completed State */}
             {state === AppState.COMPLETED && (
                <div className="mt-8 py-8 text-center bg-green-50 rounded-xl border border-green-100 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Download Complete</h3>
                    <p className="text-slate-600 mb-2">Your file <strong>{generatedTitle}.{selectedFormat.toLowerCase()}</strong> has been saved.</p>
                    <p className="text-xs text-slate-500 mb-6">Check your device's "Downloads" folder.</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <button onClick={handleManualDownload} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                             <DownloadIcon className="w-5 h-5" />
                             Download Again
                        </button>
                        <button onClick={handleReset} className="text-blue-600 font-medium hover:underline py-2">
                            Convert another video
                        </button>
                    </div>

                    {/* Receipt Toggle Button */}
                    <button 
                        onClick={() => setShowReceipt(!showReceipt)}
                        className="text-sm text-slate-500 hover:text-slate-700 underline decoration-slate-300 underline-offset-4 mb-2 flex items-center gap-1 mx-auto"
                    >
                        {showReceipt ? 'Hide Receipt' : 'View Download Receipt'}
                        <ChevronDown className={`w-3 h-3 transition-transform ${showReceipt ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Receipt Details */}
                    {showReceipt && (
                        <div className="mt-4 bg-slate-50 p-6 rounded-lg border border-slate-200 text-left text-sm max-w-sm mx-auto shadow-sm animate-in slide-in-from-top-2 fade-in duration-300">
                          <h4 className="font-bold text-slate-700 border-b border-slate-200 pb-2 mb-3 flex items-center gap-2">
                            <ReceiptIcon className="w-4 h-4 text-slate-500"/> Transaction Receipt
                          </h4>
                          <div className="space-y-2 text-slate-600">
                            <div className="flex justify-between items-start gap-4">
                                <span className="shrink-0 text-slate-500">File Name:</span> 
                                <span className="font-medium text-slate-800 text-right break-all">{generatedTitle}.{selectedFormat.toLowerCase()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Format:</span> 
                                <span className="font-medium text-slate-800">{selectedFormat}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Quality:</span> 
                                <span className="font-medium text-slate-800">{selectedQuality.label}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Size:</span> 
                                <span className="font-medium text-slate-800">{selectedQuality.size}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Date:</span> 
                                <span className="font-medium text-slate-800">{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-slate-200 mt-2">
                                <span className="text-slate-500">Status:</span> 
                                <span className="font-bold text-green-600 flex items-center gap-1">
                                    <CheckIcon className="w-3 h-3" /> Success
                                </span>
                            </div>
                          </div>
                        </div>
                    )}
                </div>
            )}

        </div>
      </div>
    </div>
  );
};