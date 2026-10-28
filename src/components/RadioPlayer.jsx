import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Settings, Radio, Headphones, RotateCcw, AlertTriangle, ExternalLink } from 'lucide-react';
import { STREAMS, STATION } from '../config/streams';

export default function RadioPlayer({ radioProps, expanded = false }) {
  const {
    isPlaying,
    toggleRadio,
    volume,
    handleVolumeChange,
    isMuted,
    toggleMute,
    streamUrl,
    setStreamUrl,
    radioError,
    showToast,
  } = radioProps;

  const [listenerCount, setListenerCount] = useState(1482);
  const [showSettings, setShowSettings] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [quality, setQuality] = useState('128k');

  useEffect(() => {
    const interval = setInterval(() => {
      setListenerCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleApplyCustomUrl = (e) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      setStreamUrl(customUrlInput.trim());
      setShowSettings(false);
      if (showToast) showToast('Radio stream URL updated!');
    }
  };

  const handleResetDefault = () => {
    setStreamUrl(STREAMS.radio.url);
    setShowSettings(false);
    if (showToast) showToast('Reset to default Enduata FM stream.');
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center font-brand font-black text-white text-base shadow">
            E
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
              LIVE RADIO STUDIO
            </span>
            <h3 className="text-sm font-extrabold text-white mt-0.5">ENDUATA FM 88.5 NAROK</h3>
          </div>
        </div>

        <div className="text-right flex items-center gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 justify-end">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 green-pulse' : 'bg-slate-500'}`} />
              {isPlaying ? 'ON AIR' : 'STANDBY'}
            </span>
            <span className="text-[10px] text-slate-400">{listenerCount.toLocaleString()} Listeners</span>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-slate-400 hover:text-amber-400 p-1.5 rounded-lg border border-slate-800 bg-slate-950 transition"
            title="Configure Stream URL"
            aria-label="Radio Stream Settings"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>

      {/* Now Playing & Equalizer */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center text-center">
        <div className="text-xs text-slate-400 font-medium mb-1">NOW PLAYING ON AIR</div>
        <div className="text-sm font-bold text-amber-300">ILARANYAK TE NDUATA FM/TV</div>
        <div className="text-xs text-slate-400 mt-0.5">Host: Vincent Ole Kipelian ("The Smiling Machine")</div>

        {/* Dynamic Equalizer Bars */}
        <div className={`flex items-end justify-center gap-1.5 h-10 my-4 ${!isPlaying ? 'equalizer-paused' : ''}`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="equalizer-bar" />
          ))}
        </div>

        {/* Big Listen Live / Pause Button */}
        <button
          onClick={toggleRadio}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-xl transition-all transform hover:scale-105 ${
            isPlaying
              ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/40 animate-pulse'
              : 'bg-gradient-to-tr from-red-600 to-amber-600 text-white shadow-red-600/40'
          }`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <div className="text-[11px] text-slate-400 mt-2 font-medium">
          {isPlaying ? 'Tuned In • Click to Pause' : 'Click to Listen Live (88.5 FM)'}
        </div>

        {radioError && (
          <div className="mt-3 text-xs text-red-400 bg-red-600/10 border border-red-500/30 px-3 py-2 rounded-xl flex items-center gap-2">
            <AlertTriangle size={14} className="shrink-0" />
            <span>{radioError}</span>
          </div>
        )}
      </div>

      {/* Volume Controls & Quality */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <button onClick={toggleMute} className="hover:text-white transition" aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <span>Volume</span>
          </div>
          <span className="font-mono">{isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          aria-label="Volume control"
        />

        <div className="pt-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            {['64k', '128k', '320k HD'].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setQuality(q);
                  if (showToast) showToast(`Audio quality: ${q}`);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  quality === q
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            Source: {streamUrl.includes('zeno.fm') ? 'Zeno.fm (Live)' : 'Custom Stream'}
          </span>
        </div>
      </div>

      {/* Stream URL Config Panel */}
      {showSettings && (
        <div className="mt-4 pt-4 border-t border-slate-800 bg-slate-950 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase">Radio Stream Configuration</span>
            <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Enter your station's custom Icecast / Shoutcast / Zeno.fm direct audio stream URL:
          </p>
          <form onSubmit={handleApplyCustomUrl} className="space-y-2">
            <input
              type="url"
              required
              value={customUrlInput}
              onChange={(e) => setCustomUrlInput(e.target.value)}
              placeholder="https://stream.zeno.fm/f3wvbbqmdg8uv"
              className="w-full bg-slate-900 text-xs text-white px-3 py-2 rounded-lg border border-slate-700 font-mono focus:outline-none focus:border-amber-500"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResetDefault}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 rounded-lg transition"
              >
                Reset Default
              </button>
              <button
                type="submit"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 rounded-lg transition"
              >
                Apply Stream
              </button>
            </div>
          </form>
        </div>
      )}

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2">
            <Headphones size={14} className="text-amber-400" />
            <span>Audio Stream Quality: {quality} AAC Broadcast</span>
          </div>
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-emerald-400" />
            <span>Transmitting on 88.5 FM across Narok County (033)</span>
          </div>
        </div>
      )}
    </div>
  );
}
