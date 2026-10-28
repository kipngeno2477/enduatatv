import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, Play, Youtube, Flame, Sparkles, Filter, Search, Layers } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';
import { featuredVideos, popularVideos, shortsList } from '../data/videos';
import { STATION } from '../config/streams';
import vincentImg from '../assets/vincent-kipelian.jpg';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const filterTabs = [
  { id: 'all', label: 'All Videos' },
  { id: 'interviews', label: 'Exclusive Interviews (Sankok & Leaders)' },
  { id: 'popular', label: 'Popular Hits (50K+ Views)' },
  { id: 'shorts', label: 'YouTube Shorts' },
  { id: 'playlists', label: 'Curated Playlists' }
];

export default function Videos() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVideo, setModalVideo] = useState(null);

  const filteredFeatured = useMemo(() => {
    return featuredVideos.filter((v) =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.speaker && v.speaker.toLowerCase().includes(searchQuery.toLowerCase())) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredPopular = useMemo(() => {
    return popularVideos.filter((v) =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredShorts = useMemo(() => {
    return shortsList.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-12 bg-[#f4f7fb]">
      {/* Page Header */}
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
        <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <Youtube size={14} />
          <span>OFFICIAL VIDEO REPOSITORY &bull; @ENDUATA033</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans tracking-tight">
          VIDEO GALLERY & BROADCASTS
        </h1>
        <p className="text-sm md:text-base text-[#0842b8] font-bold mt-2">
          OVER 938 VIDEOS &bull; 7.76K SUBSCRIBERS
        </p>
        <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
          Watch exclusive leadership interviews, cultural anthems, county government debates, live testing transmissions, and viral Maa moments directly in high definition.
        </p>
      </motion.div>

      {/* Filter Tabs & Search Bar */}
      <motion.div {...fadeIn} className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-[#0842b8] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:text-[#0842b8] hover:bg-blue-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Sankok, Caro, Ntutu, Lolonuku, interviews..."
            className="w-full bg-slate-50 text-xs text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
          />
        </div>
      </motion.div>

      {/* SECTION: EXCLUSIVE INTERVIEWS */}
      {(activeTab === 'all' || activeTab === 'interviews') && (
        <motion.section {...fadeIn} className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#e51919]">🎙️</span>
                <span>Exclusive Interviews & Dialogue</span>
              </h2>
              <p className="text-xs text-slate-500">Hon. David Ole Sankok, MCAs & Community Elders</p>
            </div>
            <span className="text-xs text-[#0842b8] font-bold bg-blue-50 px-2.5 py-0.5 rounded-full">{filteredFeatured.length} Videos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatured.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={(v) => setModalVideo(v)}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* SECTION: YOUTUBE SHORTS */}
      {(activeTab === 'all' || activeTab === 'shorts') && (
        <motion.section {...fadeIn} className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-amber-500">⚡</span>
                <span>Enduata YouTube Shorts</span>
              </h2>
              <p className="text-xs text-slate-500">Vertical format snippets, studio banter & highlights</p>
            </div>
            <a
              href="https://www.youtube.com/@Enduata033/shorts"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#e51919] hover:text-red-700 font-bold"
            >
              View on YouTube &rarr;
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredShorts.map((short) => (
              <div
                key={short.id}
                onClick={() => setModalVideo({ ...short, duration: 'Short' })}
                className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden cursor-pointer hover:border-[#0842b8] transition shadow-sm flex flex-col"
              >
                <div className="relative aspect-[9/16] bg-slate-100 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
                    alt={short.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 bg-[#e51919] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                    SHORTS
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p className="text-xs font-bold line-clamp-2 leading-tight">{short.title}</p>
                    <p className="text-[10px] text-amber-300 mt-0.5">{short.views}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* SECTION: POPULAR BROADCASTS */}
      {(activeTab === 'all' || activeTab === 'popular') && (
        <motion.section {...fadeIn} className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-amber-500">🏆</span>
                <span>Most Popular Broadcasts</span>
              </h2>
              <p className="text-xs text-slate-500">Viral hits, cultural anthems, and leadership addresses</p>
            </div>
            <span className="text-xs text-[#0842b8] font-bold bg-blue-50 px-2.5 py-0.5 rounded-full">{filteredPopular.length} Videos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPopular.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={(v) => setModalVideo(v)}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* SECTION: PLAYLISTS */}
      {(activeTab === 'all' || activeTab === 'playlists') && (
        <motion.section {...fadeIn} className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#0842b8] shadow-md shrink-0 bg-slate-100">
                <img
                  src={vincentImg}
                  alt="Vincent Ole Kipelian - CEO"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.src = '/images/vincent-kipelian.jpg';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#e51919] uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded">
                    CURATED BY CEO
                  </span>
                  <span className="text-[10px] font-bold text-[#0842b8] bg-blue-50 px-2 py-0.5 rounded">
                    "The Smiling Machine"
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-900 mt-1">Vincent Ole Kipelian Collection</h2>
                <p className="text-xs text-slate-500">Signature highlights, cultural events, and high-profile leadership dialogues</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/about#ceo"
                className="text-xs font-bold text-[#0842b8] bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition border border-blue-200"
              >
                CEO Profile &rarr;
              </Link>
              <a
                href="https://www.youtube.com/playlist?list=PLWgxbecJO5odjo4dPwR9Uv7emY0pRZw1m"
                target="_blank"
                rel="noreferrer"
                className="bg-[#0842b8] hover:bg-[#063391] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow"
              >
                Play All on YouTube &rarr;
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {[
              { id: 'S6DMoxNyk50', title: 'Ibraah ft. Harmonize - One Night Stand', artist: 'Harmonize', views: '25M views', duration: '4:45' },
              { id: 'tg5hw8K6UoQ', title: 'Mbosso - Tamba (Official Music Video)', artist: 'Mbosso', views: '40M views', duration: '3:59' },
              { id: 'l8JauBRgtf0', title: 'Pst Samuel Sere - Papa Kinarikino', artist: 'Pst Samuel Sere', views: '38K views', duration: '5:25' },
              { id: 'gGj_9joGVNY', title: 'MC THE SMILLING MACHINE $ MC NTANGENOI', artist: 'NTANGENOI WORLDWIDE', views: '1.7K views', duration: '1:04' },
              { id: 'UJmGFHMVuH8', title: 'Director ole mututa ceremony', artist: 'Enduata TV', views: '1.5K views', duration: '23:26' },
            ].map((track, i) => (
              <div
                key={track.id}
                onClick={() => setModalVideo(track)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400 font-bold w-4">{i + 1}</span>
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                    <img src={`https://img.youtube.com/vi/${track.id}/hqdefault.jpg`} alt={track.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 line-clamp-1">{track.title}</h4>
                    <span className="text-[11px] text-slate-500">{track.artist}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <span className="text-[#0842b8] font-bold block">{track.views}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{track.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Video Modal Cinema */}
      <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />
    </div>
  );
}
