import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Radio, Tv, Users, Newspaper, ChevronRight } from 'lucide-react';
import RadioPlayer from '../components/RadioPlayer';
import TVPlayer from '../components/TVPlayer';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';
import PresenterCard from '../components/PresenterCard';
import CEOSection from '../components/CEOSection';
import { featuredVideos, popularVideos, shortsList } from '../data/videos';
import { newsArticles } from '../data/news';
import { presenters } from '../data/presenters';
import { programs } from '../data/programs';
import { STATION } from '../config/streams';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function Home({ radioProps }) {
  const [modalVideo, setModalVideo] = useState(null);

  return (
    <div className="pb-24 bg-[#f4f7fb] text-slate-900">
      {/* Hero Banner Section Matching the Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <motion.div
          {...fadeIn}
          className="rounded-2xl overflow-hidden shadow-md border border-slate-200/80 relative"
          style={{
            background: 'linear-gradient(100deg, #084cdb 0%, #084cdb 50%, #ffffff 75%, #ffffff 100%)',
          }}
        >
          <div className="px-6 py-8 md:px-12 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading, Subtitle, Motto, Description, Buttons */}
            <div className="lg:col-span-7 text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white drop-shadow-sm font-sans">
                ENDUATA MEDIA
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-2">
                Your TV and Radio Station
              </h2>
              <p className="text-sm md:text-base italic text-blue-100 font-medium mt-1">
                Naboisholo olose lo mea
              </p>
              <p className="text-white/95 text-xs sm:text-sm md:text-base mt-4 max-w-lg leading-relaxed">
                Bringing you trusted news, quality entertainment, culture and community voices.
              </p>

              {/* Action Buttons: Red "Watch Live TV" + Dark Blue "Listen Live Radio" */}
              <div className="flex flex-wrap items-center gap-3.5 mt-7">
                <Link
                  to="/live-tv"
                  className="bg-[#e51919] hover:bg-[#c41414] text-white px-5 py-2.5 rounded-lg font-bold text-sm md:text-base shadow transition flex items-center gap-2"
                >
                  <Play size={18} fill="currentColor" />
                  <span>Watch Live TV</span>
                </Link>
                <button
                  onClick={radioProps.toggleRadio}
                  className={`bg-[#063391] hover:bg-[#052878] text-white px-5 py-2.5 rounded-lg font-bold text-sm md:text-base shadow transition flex items-center gap-2 ${
                    radioProps.isPlaying ? 'ring-2 ring-amber-400' : ''
                  }`}
                >
                  <Radio size={18} />
                  <span>{radioProps.isPlaying ? 'Listening 88.5 FM' : 'Listen Live Radio'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: 3D embossed ENDUATA MEDIA + Enduata TV Logo */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-2">
              <div className="text-right w-full pr-6 mb-1 hidden sm:block">
                <span className="text-xl md:text-2xl lg:text-3xl font-black tracking-wider text-slate-300 drop-shadow">
                  ENDUATA{' '}
                </span>
                <span className="text-xl md:text-2xl lg:text-3xl font-black tracking-wider text-[#e51919] drop-shadow">
                  MEDIA
                </span>
              </div>
              <img
                src="/images/enduata-logo.png"
                alt="Enduata TV Logo"
                className="w-full max-w-[320px] md:max-w-[420px] object-contain drop-shadow-md"
              />
            </div>
          </div>
        </motion.div>

        {/* Breaking News Ticker Bar Matching Image (Red Badge + Royal Blue Bar) */}
        <div className="mt-3 rounded-lg overflow-hidden shadow-sm flex items-stretch">
          <div className="bg-[#e51919] text-white text-xs md:text-sm font-black px-4 py-2.5 flex items-center gap-2 shrink-0 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
            BREAKING NEWS
          </div>
          <div className="bg-[#0842b8] text-white text-xs md:text-sm font-medium py-2.5 px-4 flex-1 overflow-hidden flex items-center">
            <div className="animate-marquee whitespace-nowrap inline-block">
              County government launches new development projects &nbsp;&bull;&nbsp; Local sports team wins regional championship &nbsp;&bull;&nbsp; Community calls for more health services &nbsp;&bull;&nbsp; Enduata FM 88.5 Narok On Air &bull; NABOISHO OLOSHO LE MAA!
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        {/* Dual Broadcast Section: Live TV & Radio Lineup Cards */}
        <motion.section {...fadeIn} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Live TV Section */}
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 uppercase tracking-wide">
                <Tv size={14} /> Live TV
              </span>
              <Link to="/live-tv" className="text-xs text-[#0842b8] hover:text-[#063391] font-bold flex items-center gap-1">
                Full Player <ChevronRight size={14} />
              </Link>
            </div>
            <TVPlayer showToast={radioProps.showToast} />
          </div>

          {/* Today's Radio Lineup Card */}
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 uppercase tracking-wide">
                  <Radio size={14} /> Today&apos;s Radio Lineup
                </span>
                <Link to="/programs" className="text-xs text-[#0842b8] hover:text-[#063391] font-bold flex items-center gap-1">
                  Full Schedule <ChevronRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {programs.slice(0, 5).map((prog) => (
                  <div key={prog.id} className="flex justify-between items-center pb-2.5 border-b border-slate-100 last:border-0">
                    <div>
                      <div className="text-sm font-bold text-slate-800">{prog.name}</div>
                      <div className="text-xs text-slate-500">{prog.host}</div>
                    </div>
                    <span className="text-xs text-[#0842b8] font-bold bg-blue-50 px-2 py-0.5 rounded font-mono shrink-0">
                      {prog.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <RadioPlayer radioProps={radioProps} />
            </div>
          </div>
        </motion.section>

        {/* Latest News Section with Blue Section Badge Matching Image */}
        <motion.section {...fadeIn}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
            <span className="bg-[#0842b8] text-white text-sm font-bold px-3.5 py-1.5 rounded flex items-center gap-2 uppercase tracking-wide">
              <Newspaper size={16} /> Latest News
            </span>
            <Link to="/news" className="text-xs text-[#0842b8] hover:text-[#063391] font-bold flex items-center gap-1">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {newsArticles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group cursor-pointer"
                onClick={() =>
                  article.videoId &&
                  setModalVideo({
                    id: article.videoId,
                    title: article.title,
                    description: article.excerpt,
                    views: '',
                    duration: '',
                  })
                }
              >
                <div className="aspect-video bg-slate-100 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase text-[#0842b8] bg-blue-50 px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 mt-2 group-hover:text-[#0842b8] transition line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="text-[11px] text-slate-400 mt-3 font-medium">
                    {article.date} &bull; {article.author}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Featured Video Broadcasts */}
        <motion.section {...fadeIn}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
            <span className="bg-[#0842b8] text-white text-sm font-bold px-3.5 py-1.5 rounded flex items-center gap-2 uppercase tracking-wide">
              🎙️ Exclusive Interviews
            </span>
            <Link to="/videos" className="text-xs text-[#0842b8] hover:text-[#063391] font-bold flex items-center gap-1">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredVideos.slice(0, 6).map((video) => (
              <VideoCard key={video.id} video={video} onClick={setModalVideo} />
            ))}
          </div>
        </motion.section>

        {/* Popular Broadcasts */}
        <motion.section {...fadeIn}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
            <span className="bg-[#0842b8] text-white text-sm font-bold px-3.5 py-1.5 rounded flex items-center gap-2 uppercase tracking-wide">
              🏆 Popular Broadcasts
            </span>
            <span className="text-xs text-[#0842b8] font-bold">150K+ Combined Views</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularVideos.slice(0, 3).map((video) => (
              <VideoCard key={video.id} video={video} onClick={setModalVideo} />
            ))}
          </div>
        </motion.section>

        {/* CEO Executive Spotlight & Leadership Achievements */}
        <CEOSection variant="home" id="ceo" />

        {/* Our Presenters */}
        <motion.section {...fadeIn}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
            <span className="bg-[#0842b8] text-white text-sm font-bold px-3.5 py-1.5 rounded flex items-center gap-2 uppercase tracking-wide">
              <Users size={16} /> Our Presenters
            </span>
            <Link to="/presenters" className="text-xs text-[#0842b8] hover:text-[#063391] font-bold flex items-center gap-1">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {presenters.slice(0, 4).map((p) => (
              <PresenterCard
                key={p.id}
                presenter={p}
                onSelect={() => (window.location.href = '/presenters')}
              />
            ))}
          </div>
        </motion.section>

        {/* Enduata Shorts */}
        <motion.section {...fadeIn}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
            <span className="bg-[#0842b8] text-white text-sm font-bold px-3.5 py-1.5 rounded flex items-center gap-2 uppercase tracking-wide">
              ⚡ Enduata Shorts
            </span>
            <a
              href="https://www.youtube.com/@Enduata033/shorts"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#0842b8] hover:text-[#063391] font-bold"
            >
              View on YouTube &rarr;
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {shortsList.map((short) => (
              <div
                key={short.id}
                onClick={() => setModalVideo({ ...short, duration: 'Short' })}
                className="group bg-white border border-slate-200/90 rounded-xl overflow-hidden cursor-pointer hover:border-[#0842b8] transition shadow-sm"
              >
                <div className="relative aspect-[9/16] bg-slate-100 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
                    alt={short.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 bg-[#e51919] text-white text-[9px] font-black px-1.5 py-0.5 rounded">
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
      </div>

      {/* Video Modal */}
      <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />
    </div>
  );
}
