import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Tv, Youtube, Radio, Settings } from 'lucide-react';
import Hls from 'hls.js';
import { STREAMS } from '../config/streams';

export default function TVPlayer({ showToast, initialVideoId = null }) {
  const [sourceMode, setSourceMode] = useState(STREAMS.tv.hlsUrl ? 'hls' : 'youtube'); // 'youtube' or 'hls'
  const [currentVideoId, setCurrentVideoId] = useState(initialVideoId || STREAMS.tv.youtubeVideoId);
  const [hlsStreamUrl, setHlsStreamUrl] = useState(STREAMS.tv.hlsUrl || '');
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [customHlsInput, setCustomHlsInput] = useState('');

  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const hlsRef = useRef(null);

  // Initialize HLS.js when sourceMode is 'hls'
  useEffect(() => {
    if (sourceMode !== 'hls') {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      return;
    }

    const video = videoRef.current;
    if (!video || !hlsStreamUrl) {
      if (!hlsStreamUrl) {
        setHasError(true);
        setErrorMessage('No HLS stream URL is configured yet. Switch to YouTube Live or enter a stream URL below.');
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);
    setHasError(false);

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;

      hls.loadSource(hlsStreamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().catch(() => setIsPlaying(false));
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setHasError(true);
              setErrorMessage('Network connection lost to HLS broadcast.');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              setHasError(true);
              setErrorMessage('Failed to decode HLS stream.');
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari HLS
      video.src = hlsStreamUrl;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        video.play().catch(() => setIsPlaying(false));
      });
      video.addEventListener('error', () => {
        setHasError(true);
        setErrorMessage('Cannot play HLS stream on this browser.');
        setIsLoading(false);
      });
    } else {
      setHasError(true);
      setErrorMessage('Your browser does not support HLS streaming.');
      setIsLoading(false);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [sourceMode, hlsStreamUrl]);

  // Video element play/pause
  const togglePlay = () => {
    if (sourceMode === 'hls' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : val;
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (videoRef.current) {
      videoRef.current.volume = next ? 0 : volume;
    }
  };

  const handleFullscreen = () => {
    const el = containerRef.current;
    if (el) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    if (sourceMode === 'youtube') {
      setCurrentVideoId(initialVideoId || STREAMS.tv.youtubeVideoId);
    } else if (hlsRef.current && hlsStreamUrl) {
      hlsRef.current.loadSource(hlsStreamUrl);
      hlsRef.current.attachMedia(videoRef.current);
    }
    if (showToast) showToast('🔄 Retrying TV broadcast connection...');
  };

  const saveCustomHls = (e) => {
    e.preventDefault();
    if (customHlsInput.trim()) {
      setHlsStreamUrl(customHlsInput.trim());
      setSourceMode('hls');
      setShowConfig(false);
      if (showToast) showToast('HLS stream URL updated!');
    }
  };

  return (
    <div ref={containerRef} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Status & Controls Bar */}
      <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold text-white tracking-wide uppercase">
            ENDUATA TV &bull; LIVE BROADCAST
          </span>
          <span className="hidden sm:inline text-xs text-slate-400">
            {sourceMode === 'youtube' ? '(Channel @Enduata033)' : '(Direct HLS Feed)'}
          </span>
        </div>

        {/* Source Mode Switcher & Fullscreen */}
        <div className="flex items-center gap-2 text-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-0.5 flex">
            <button
              onClick={() => {
                setSourceMode('youtube');
                setHasError(false);
                setIsLoading(true);
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition ${
                sourceMode === 'youtube' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Youtube size={12} />
              <span>YouTube Live</span>
            </button>
            <button
              onClick={() => {
                setSourceMode('hls');
                setHasError(false);
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition ${
                sourceMode === 'hls' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tv size={12} />
              <span>HLS Stream</span>
            </button>
          </div>

          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-slate-400 hover:text-amber-400 p-1.5 rounded transition"
            title="Configure Stream URL"
            aria-label="Stream Settings"
          >
            <Settings size={14} />
          </button>

          <button
            onClick={handleFullscreen}
            className="text-slate-400 hover:text-white p-1.5 rounded transition"
            title="Fullscreen"
            aria-label="Fullscreen"
          >
            <Maximize size={14} />
          </button>
        </div>
      </div>

      {/* Video Display Area */}
      <div className="video-responsive bg-black relative">
        {/* Loading Indicator */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 z-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-300">Connecting to Enduata TV Feed...</p>
              <p className="text-xs text-slate-500 mt-1">Live from Narok County</p>
            </div>
          </div>
        )}

        {/* Error Overlay with Retry */}
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-20">
            <div className="text-center p-6 max-w-md">
              <Tv size={44} className="text-red-500/80 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Live Broadcast Unavailable</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {errorMessage || 'The stream could not connect. You can switch to our YouTube Live player or check back during scheduled broadcasting.'}
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleRetry}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <RotateCcw size={13} />
                  <span>Retry Connection</span>
                </button>
                <button
                  onClick={() => {
                    setSourceMode('youtube');
                    setHasError(false);
                    setIsLoading(true);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Youtube size={13} />
                  <span>Switch to YouTube Live</span>
                </button>
              </div>
            </div>
          </div>
        ) : sourceMode === 'youtube' ? (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=0&rel=0&modestbranding=1&enablejsapi=1`}
            title="Enduata TV Live Broadcast"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setErrorMessage('Unable to embed YouTube broadcast.');
              setIsLoading(false);
            }}
            className="w-full h-full absolute inset-0"
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full absolute inset-0 object-contain bg-black"
            playsInline
            controls={false}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
          />
        )}
      </div>

      {/* HLS Player Controls Bar (Only when in HLS mode) */}
      {sourceMode === 'hls' && !hasError && (
        <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between border-t border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-slate-400 hover:text-white" aria-label="Mute">
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-red-500 h-1 bg-slate-800 rounded"
              />
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 green-pulse" />
            LIVE FEED ACTIVE
          </span>
        </div>
      )}

      {/* Stream Configuration Panel */}
      {showConfig && (
        <div className="bg-slate-950/90 border-t border-slate-800 p-4">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Settings size={13} />
            <span>TV Stream Source Settings</span>
          </h4>
          <p className="text-[11px] text-slate-400 mb-3">
            Configure direct HLS (.m3u8) video stream or custom YouTube video broadcast ID.
          </p>
          <form onSubmit={saveCustomHls} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="url"
                value={customHlsInput}
                onChange={(e) => setCustomHlsInput(e.target.value)}
                placeholder="https://example.com/live/stream.m3u8"
                className="flex-1 bg-slate-900 text-xs text-white px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-500 font-mono"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-2 rounded-lg text-xs font-bold transition"
              >
                Apply HLS
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Footer Details */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-900 to-slate-950">
        <h2 className="text-base sm:text-lg font-bold text-white">
          Enduata TV Live Broadcast — Narok County
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Advocating peace, mentorship, leadership dialogues, and cultural preservation across the Maa Nation.
        </p>
      </div>
    </div>
  );
}
