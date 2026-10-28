import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Mic, Radio, Award, Sparkles, Calendar, Clock, Phone, Heart, Trophy, CheckCircle2, ChevronRight } from 'lucide-react';
import PresenterCard from '../components/PresenterCard';
import { presenters } from '../data/presenters';
import { STATION } from '../config/streams';
import vincentImg from '../assets/vincent-kipelian.jpg';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function Presenters() {
  const [selectedPresenter, setSelectedPresenter] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-12 bg-[#f4f7fb]">
      {/* Page Header */}
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
        <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <Users size={13} />
          <span>ENDUATA MEDIA SERVICES &bull; ON-AIR TALENT</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans tracking-tight">
          OUR PRESENTERS & DJS
        </h1>
        <p className="text-sm md:text-base text-[#0842b8] font-bold mt-2">
          THE TRUSTED VOICES OF NABOISHO OLOSHO LE MAA
        </p>
        <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
          Meet the experienced broadcasters, journalists, cultural hosts, and producers connecting Narok County and the global Maa community through verified news, cultural wisdom, and live entertainment.
        </p>
      </motion.div>

      {/* CEO Executive Spotlight Card */}
      <motion.div
        {...fadeIn}
        className="bg-white border-2 border-blue-200/80 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-[#0842b8] shadow-lg relative bg-slate-100">
              <img
                src={vincentImg}
                alt="Vincent Kipelian - Enduata CEO"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  if (e.target.src !== '/images/vincent-kipelian.jpg') {
                    e.target.src = '/images/vincent-kipelian.jpg';
                  } else if (e.target.src !== '/vincent-kipelian.jpg') {
                    e.target.src = '/vincent-kipelian.jpg';
                  } else {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<span class="text-7xl flex items-center justify-center h-full">🎙️</span>';
                  }
                }}
              />
            </div>
            <div className="mt-3.5 flex items-center gap-2">
              <span className="bg-[#e51919] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                CEO & FOUNDER
              </span>
              <span className="bg-[#0842b8] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                ON AIR
              </span>
            </div>
          </div>

          <div className="md:col-span-8 space-y-3.5">
            <span className="text-xs font-black text-[#0842b8] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block">
              EXECUTIVE LEADERSHIP & PRIME ANCHOR
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Vincent Kipelian
            </h2>
            <p className="text-sm font-bold text-[#e51919]">
              Chief Executive Officer • Host of Nduat Show • News Anchor • "The Smiling Machine"
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Vincent Kipelian leads Enduata Media Services with an uncompromising dedication to peace advocacy, mentorship for pastoralist youth, cultural heritage preservation, and high-impact journalism. As host of the flagship <em>Nduat Show</em> and prime executive interviews with national and county leaders, Vincent is celebrated for his courageous, welcoming, and principled presence on both radio and television.
            </p>

            {/* Leadership Achievements Highlights */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                <Trophy size={15} className="text-amber-500" />
                <span>Key Leadership Achievements</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>938+ Broadcasts:</strong> Built EMS into a regional powerhouse on 88.5 FM & TV</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Nduat Show Host:</strong> Conducted executive interviews with national leaders</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Peace Ambassador:</strong> Spearheaded inter-clan peace & unity in Rift Valley</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Cultural Archive:</strong> Preserved Maa heritage with community elders</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <Link
                  to="/about#ceo"
                  className="text-xs text-[#0842b8] hover:text-[#063391] font-bold flex items-center gap-1"
                >
                  <span>View Full CEO Profile & All Achievements</span>
                  <ChevronRight size={13} />
                </Link>
                <span className="text-[10px] text-slate-500 font-medium">EMS Executive Office Narok</span>
              </div>
            </div>

            <div className="pt-1 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <Radio size={14} className="text-[#e51919]" />
                <span>Nduat Show (Thurs & Sun 8:00 PM – 10:00 PM)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <Award size={14} className="text-[#0842b8]" />
                <span>EMS Executive Office Narok</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Presenters Grid */}
      <motion.section {...fadeIn} className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Mic size={20} className="text-[#0842b8]" />
            <span>All Radio & TV Broadcasters</span>
          </h2>
          <span className="text-xs text-[#0842b8] font-bold bg-blue-50 px-3 py-1 rounded-full">
            {presenters.length} Active Voices
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {presenters.map((pres) => (
            <PresenterCard
              key={pres.id}
              presenter={pres}
              onSelect={(p) => setSelectedPresenter(p)}
            />
          ))}
        </div>
      </motion.section>

      {/* Presenter Detail Modal */}
      {selectedPresenter && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPresenter(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <span className="text-xs font-black uppercase tracking-wider text-[#0842b8] bg-blue-50 px-3 py-1 rounded-full">
                Broadcaster Profile
              </span>
              <button
                onClick={() => setSelectedPresenter(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold transition"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 mb-5 text-center sm:text-left">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#0842b8] shadow-md shrink-0 bg-slate-100">
                <img
                  src={selectedPresenter.photo}
                  alt={selectedPresenter.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<span class="text-4xl flex items-center justify-center h-full">🎙️</span>';
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">{selectedPresenter.name}</h3>
                {selectedPresenter.alias && (
                  <p className="text-xs text-[#e51919] font-bold mt-0.5">"{selectedPresenter.alias}"</p>
                )}
                <p className="text-xs text-slate-500 mt-1">{selectedPresenter.title}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-5 space-y-2.5 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Programs Hosted:</span>
                <span className="text-slate-900 font-bold text-sm">
                  {Array.isArray(selectedPresenter.shows) ? selectedPresenter.shows.join(', ') : selectedPresenter.shows}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Broadcast Schedule:</span>
                <span className="text-[#0842b8] font-mono font-bold">{selectedPresenter.schedule}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {selectedPresenter.bio}
            </p>

            <button
              onClick={() => setSelectedPresenter(null)}
              className="w-full bg-[#0842b8] hover:bg-[#063391] text-white text-xs font-bold py-3 rounded-xl transition shadow"
            >
              Close Broadcaster Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
