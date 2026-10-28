import { Link } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, Tv, Radio } from 'lucide-react';

export default function MiniPlayer({ radioProps }) {
  const { isPlaying, toggleRadio, volume, handleVolumeChange, isMuted, toggleMute } = radioProps;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#051c50]/95 backdrop-blur-md border-t border-blue-900/60 z-50 px-4 py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Play Button & Station Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={toggleRadio}
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shrink-0 transition ${
              isPlaying
                ? 'bg-amber-400 text-slate-950 shadow-amber-400/30 animate-pulse'
                : 'bg-[#e51919] hover:bg-[#c41414] text-white shadow'
            }`}
            aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white truncate">ENDUATA FM 88.5 NAROK</span>
              <span className={`text-[10px] font-bold px-1.5 rounded ${isPlaying ? 'bg-[#e51919] text-white' : 'bg-blue-950 text-blue-300'}`}>
                {isPlaying ? 'ON AIR' : 'STANDBY'}
              </span>
            </div>
            <div className="text-[11px] text-amber-300 truncate">
              ILARANYAK TE NDUATA FM/TV &bull; Vincent Ole Kipelian
            </div>
          </div>
        </div>

        {/* Equalizer Bars */}
        <div className={`hidden md:flex items-end justify-center gap-1 h-6 ${!isPlaying ? 'equalizer-paused' : ''}`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="equalizer-bar" />
          ))}
        </div>

        {/* Volume & Actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={toggleMute} className="text-slate-300 hover:text-white transition" aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-20 accent-amber-400 cursor-pointer h-1.5 bg-blue-950 rounded"
              aria-label="Volume"
            />
          </div>
          <Link
            to="/live-tv"
            className="bg-[#e51919] hover:bg-[#c41414] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow flex items-center gap-1.5 transition"
          >
            <Tv size={14} />
            Watch TV
          </Link>
        </div>
      </div>
    </div>
  );
}
