import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Search, Calendar, User, ArrowRight, Play } from 'lucide-react';
import { newsArticles } from '../data/news';
import VideoModal from '../components/VideoModal';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalVideo, setModalVideo] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(newsArticles.map((a) => a.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredNews = useMemo(() => {
    return newsArticles.filter((article) => {
      const matchSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.author && article.author.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = selectedCategory === 'All' || article.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-12 bg-[#f4f7fb]">
      {/* Header */}
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
        <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <Newspaper size={13} />
          <span>ENDUATA NEWSROOM &bull; VERIFIED REPORTING</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans tracking-tight">
          NEWS & COMMUNITY STORIES
        </h1>
        <p className="text-sm md:text-base text-[#0842b8] font-bold mt-2">
          TIMELY, ACCURATE & COMMUNITY-FOCUSED JOURNALISM
        </p>
        <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
          Get verified updates on governance, agriculture, Maasai Mara conservation, education, healthcare, and cultural preservation across Narok County and Kenya.
        </p>
      </motion.div>

      {/* Search and Category Filter */}
      <motion.div {...fadeIn} className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news by topic, leader or keyword..."
            className="w-full bg-slate-50 text-xs text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#0842b8] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:text-[#0842b8] hover:bg-blue-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured News Hero (First item) */}
      {filteredNews.length > 0 && (
        <motion.div
          {...fadeIn}
          className="group bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:border-[#0842b8] hover:shadow-md transition cursor-pointer grid grid-cols-1 md:grid-cols-12"
          onClick={() => setSelectedArticle(filteredNews[0])}
        >
          <div className="md:col-span-7 relative aspect-video md:aspect-auto overflow-hidden bg-slate-100 min-h-[280px]">
            <img
              src={filteredNews[0].image}
              alt={filteredNews[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <span className="absolute top-4 left-4 bg-[#e51919] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
              FEATURED STORY
            </span>
          </div>

          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#0842b8] font-bold mb-2">
                <span className="bg-blue-50 px-2 py-0.5 rounded">{filteredNews[0].category}</span>
                <span>&bull;</span>
                <span className="text-slate-400 font-normal">{filteredNews[0].date}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#0842b8] transition leading-snug">
                {filteredNews[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed line-clamp-3">
                {filteredNews[0].excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <User size={13} className="text-[#e51919]" />
                {filteredNews[0].author || 'Enduata Desk'}
              </span>
              <span className="text-[#0842b8] font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                <span>Read Full Story</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* News Grid (Remaining items) */}
      <motion.section {...fadeIn} className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>Recent News Bulletins</span>
          <span className="text-xs text-[#0842b8] font-bold bg-blue-50 px-2.5 py-0.5 rounded-full">
            {filteredNews.length} Stories
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.slice(1).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:border-[#0842b8] hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#0842b8] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  {item.category}
                </span>
                {item.videoId && (
                  <span className="absolute bottom-2.5 right-2.5 bg-[#e51919] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow">
                    <Play size={10} fill="currentColor" />
                    <span>Watch Video</span>
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0842b8] transition line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{item.date}</span>
                  <span className="text-[#0842b8] font-bold group-hover:underline">Read Story &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0842b8] bg-blue-50 px-3 py-0.5 rounded-full border border-blue-100">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold transition"
              >
                ✕
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-snug">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-400 mb-5 pb-3 border-b border-slate-100">
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-[#0842b8]" />
                {selectedArticle.date}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <User size={13} className="text-[#e51919]" />
                {selectedArticle.author || 'Enduata Media Services'}
              </span>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-5">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-slate-700 leading-relaxed space-y-4 mb-6">
              {selectedArticle.excerpt}
            </p>

            {selectedArticle.videoId && (
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mb-6 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Watch Attached Video Broadcast</h4>
                  <p className="text-[11px] text-slate-500">Streamed on Enduata TV Narok</p>
                </div>
                <button
                  onClick={() => {
                    setModalVideo({ id: selectedArticle.videoId, title: selectedArticle.title });
                  }}
                  className="bg-[#e51919] hover:bg-[#c41414] text-white text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <Play size={13} fill="currentColor" />
                  <span>Play Broadcast</span>
                </button>
              </div>
            )}

            <button
              onClick={() => setSelectedArticle(null)}
              className="w-full bg-[#0842b8] hover:bg-[#063391] text-white text-xs font-bold py-3 rounded-xl transition shadow"
            >
              Close Article
            </button>
          </div>
        </div>
      )}

      {/* Video Modal if user clicks Play Broadcast */}
      <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />
    </div>
  );
}
