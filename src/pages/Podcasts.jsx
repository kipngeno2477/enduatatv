import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Play, Pause, Download, Share2, Clock, Calendar, Volume2, Headphones, Search } from 'lucide-react';
import { podcasts } from '../data/podcasts';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function Podcasts() {
  const [activePodcast, setActivePodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const audioPlayerRef = useRef(null);

  const categories = ['All', 'Leadership & Politics', 'Culture & Governance', 'Maa Culture & Heritage', 'Conservation & Wildlife', 'Youth Leadership'];

  const filteredPodcasts = podcasts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const handlePlayPodcast = (item) => {
    if (activePodcast?.id === item.id) {
      if (isPlaying) {
        audioPlayerRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioPlayerRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setActivePodcast(item);
      setIsPlaying(true);
      setTimeout(() => {
        audioPlayerRef.current?.play();
      }, 100);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-10 bg-[#f4f7fb]">
      {/* Hidden Audio Player for Podcasts */}
      {activePodcast && (
        <audio
          ref={audioPlayerRef}
          src={activePodcast.audioUrl}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Header */}
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
        <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <Mic size={13} />
          <span>ON-DEMAND AUDIO ARCHIVES</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans tracking-tight">
          PODCASTS & RECORDED SHOWS
        </h1>
        <p className="text-sm md:text-base text-[#0842b8] font-bold mt-2">
          LISTEN TO RECENT BROADCASTS ANYTIME, ANYWHERE
        </p>
        <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
          Missed a live show on Enduata FM? Catch up on full recorded editions of <em>Nduat Show</em>, <em>Enkiguana Olosho</em>, and cultural dialogue series.
        </p>
      </motion.div>

      {/* Sticky Active Episode Floating Bar if playing */}
      {activePodcast && (
        <div className="bg-[#0842b8] text-white border border-blue-400/40 rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4 sticky top-24 z-30">
          <div className="flex items-center gap-3.5 min-w-0">
            <button
              onClick={() => handlePlayPodcast(activePodcast)}
              className="w-11 h-11 rounded-xl bg-white text-[#0842b8] flex items-center justify-center font-bold shrink-0 shadow"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>
            <div className="min-w-0">
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                {isPlaying ? 'NOW PLAYING PODCAST' : 'PODCAST PAUSED'}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">{activePodcast.title}</h4>
              <p className="text-[11px] text-blue-100 truncate">Host: {activePodcast.host} &bull; {activePodcast.duration}</p>
            </div>
          </div>
          <button
            onClick={() => {
              audioPlayerRef.current?.pause();
              setActivePodcast(null);
              setIsPlaying(false);
            }}
            className="text-blue-100 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/10"
          >
            ✕ Close
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <motion.div {...fadeIn} className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search podcast episodes by keyword or host..."
            className="w-full bg-slate-50 text-xs text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#0842b8] text-white font-bold shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Podcasts Episodes Grid */}
      <motion.div {...fadeIn} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPodcasts.map((pod) => {
            const isThisPlaying = activePodcast?.id === pod.id && isPlaying;

            return (
              <div
                key={pod.id}
                className={`bg-white border rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between ${
                  activePodcast?.id === pod.id
                    ? 'border-[#0842b8] ring-2 ring-[#0842b8]/20 shadow-md'
                    : 'border-slate-200/90 hover:border-[#0842b8]'
                }`}
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <img src={pod.image} alt={pod.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handlePlayPodcast(pod)}
                        className={`absolute inset-0 flex items-center justify-center transition ${
                          isThisPlaying
                            ? 'bg-[#0842b8]/90 text-white'
                            : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                        aria-label="Play podcast"
                      >
                        {isThisPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                      </button>
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0842b8] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {pod.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 line-clamp-2 leading-snug">
                        {pod.title}
                      </h3>
                      <p className="text-xs text-[#e51919] font-semibold mt-0.5">Host: {pod.host}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {pod.description}
                  </p>
                </div>

                <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-mono text-[#0842b8] font-bold">
                      <Clock size={12} />
                      {pod.duration}
                    </span>
                    <span>&bull;</span>
                    <span>{pod.date}</span>
                  </div>

                  <button
                    onClick={() => handlePlayPodcast(pod)}
                    className="bg-[#0842b8] hover:bg-[#063391] text-white font-bold px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1 shadow-sm"
                  >
                    {isThisPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                    <span>{isThisPlaying ? 'Pause' : 'Listen Now'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
