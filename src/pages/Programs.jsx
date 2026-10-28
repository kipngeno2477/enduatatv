import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search, Filter, Radio, Sparkles, CheckCircle2 } from 'lucide-react';
import ProgramCard from '../components/ProgramCard';
import { programs } from '../data/programs';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const daysOfWeek = ['All Shows', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Programs() {
  const [selectedDay, setSelectedDay] = useState('All Shows');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProgram, setActiveModalProgram] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(programs.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;

      const matchDay =
        selectedDay === 'All Shows' ||
        p.days.toLowerCase().includes(selectedDay.toLowerCase()) ||
        (selectedDay !== 'Saturday' && selectedDay !== 'Sunday' && p.days.toLowerCase().includes('monday – friday')) ||
        (selectedDay !== 'Saturday' && selectedDay !== 'Sunday' && p.days.toLowerCase().includes('weekdays'));

      return matchSearch && matchCategory && matchDay;
    });
  }, [searchQuery, selectedCategory, selectedDay]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-10 bg-[#f4f7fb]">
      {/* Page Header */}
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
        <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <Calendar size={13} />
          <span>BROADCAST PROGRAMMES & SCHEDULE</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans tracking-tight">
          PROGRAMMES & SCHEDULES
        </h1>
        <p className="text-sm md:text-base text-[#0842b8] font-bold mt-2">
          NABOISHO OLOSHO LE MAA &bull; 88.5 FM & TV
        </p>
        <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
          Explore our weekly programming schedule across culture, governance, agriculture, youth leadership, news, and entertainment.
        </p>
      </motion.div>

      {/* Filter and Search Bar */}
      <motion.div {...fadeIn} className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        {/* Day of Week Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 no-scrollbar">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedDay === day
                  ? 'bg-[#0842b8] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:text-[#0842b8] hover:bg-blue-50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by show title, presenter or keyword..."
              className="w-full bg-slate-50 text-xs text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            <span className="text-xs text-slate-500 font-semibold shrink-0">Genre:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#e51919] text-white font-bold shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Program Cards Grid */}
      <motion.div {...fadeIn}>
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((prog) => (
              <ProgramCard
                key={prog.id}
                program={prog}
                onTuneIn={(p) => setActiveModalProgram(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center shadow-sm">
            <Calendar size={40} className="text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Programs Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting your search query or day filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDay('All Shows');
                setSelectedCategory('All');
              }}
              className="mt-4 bg-[#0842b8] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow"
            >
              Reset Filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Program Detail Popup Modal */}
      {activeModalProgram && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModalProgram(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0842b8] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                {activeModalProgram.category}
              </span>
              <button
                onClick={() => setActiveModalProgram(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold transition"
              >
                ✕
              </button>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">{activeModalProgram.name}</h3>
            <p className="text-xs text-[#e51919] font-bold mb-4">Host: {activeModalProgram.host}</p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Broadcast Hours:</span>
                <span className="text-slate-900 font-mono font-bold">{activeModalProgram.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Air Days:</span>
                <span className="text-slate-900 font-semibold">{activeModalProgram.days}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Frequency:</span>
                <span className="text-[#0842b8] font-bold">Enduata FM 88.5 Narok</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {activeModalProgram.description}
            </p>

            <button
              onClick={() => setActiveModalProgram(null)}
              className="w-full bg-[#0842b8] hover:bg-[#063391] text-white text-xs font-bold py-3 rounded-xl transition shadow"
            >
              Close Program Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
