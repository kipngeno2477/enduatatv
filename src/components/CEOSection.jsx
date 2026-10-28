import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Award, Trophy, Radio, Mic, Users, HeartHandshake, 
  Sparkles, ChevronRight, CheckCircle2, ShieldCheck, 
  TrendingUp, Play, Flame, ExternalLink
} from 'lucide-react';
import vincentImg from '../assets/vincent-kipelian.jpg';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const achievements = [
  {
    icon: Trophy,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    title: 'Founder & Media Pioneer',
    description: 'Founded Enduata Media Services (EMS), establishing Enduata TV and Enduata FM 88.5 Narok as trusted regional platforms delivering 24/7 bilingual broadcasts in Maa and Swahili.'
  },
  {
    icon: Mic,
    color: 'text-[#0842b8]',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    title: 'Prime-Time Anchor & National Dialogues',
    description: 'Host of the flagship Nduat Show, conducting landmark televised interviews with high-ranking government officials, MPs, Narok County leaders, and community elders.'
  },
  {
    icon: HeartHandshake,
    color: 'text-[#e51919]',
    bg: 'bg-red-50',
    border: 'border-red-200',
    title: 'Peace Ambassador & Grassroots Unity',
    description: 'Utilizing media airwaves to advocate for inter-clan reconciliation, peacebuilding, and harmonious coexistence across Narok County and the Greater Rift Valley.'
  },
  {
    icon: Users,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    title: 'Youth Mentorship & Community Empowerment',
    description: 'Championing educational advancement, economic empowerment, and professional broadcasting mentorship for pastoralist youth and aspiring Maa journalists.'
  },
  {
    icon: ShieldCheck,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    title: 'Cultural Heritage Preservation',
    description: 'Documenting Maasai oral traditions, cultural ceremonies, and indigenous language on mainstream digital channels in collaboration with respected community elders.'
  },
  {
    icon: TrendingUp,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    title: 'Digital Milestones & Global Reach',
    description: 'Expanded Enduata TV to 938+ broadcasts and 7.76K+ dedicated YouTube subscribers, connecting pastoralist communities across Kenya with the worldwide Maa diaspora.'
  }
];

const keyStats = [
  { label: 'Broadcasts Delivered', value: '938+' },
  { label: 'YouTube Subscribers', value: '7.76K+' },
  { label: 'Combined Views', value: '150K+' },
  { label: 'Radio Frequency', value: '88.5 FM' },
];

export default function CEOSection({ variant = 'full', id = 'ceo' }) {
  return (
    <motion.section
      {...fadeIn}
      id={id}
      className="bg-white border-2 border-blue-200/90 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden space-y-8"
    >
      {/* Decorative gradient glow background */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-bl from-blue-100/70 via-blue-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-red-50/50 via-slate-50 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Profile Header Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* CEO Portrait & Moniker */}
        <div className="lg:col-span-4 flex flex-col items-center text-center">
          <div className="relative group">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden border-4 border-[#0842b8] shadow-2xl bg-slate-100 transition-transform duration-300 group-hover:scale-[1.02]">
              <img
                src={vincentImg}
                alt="Vincent Kipelian - Enduata CEO"
                className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
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
            {/* Top Verified/CEO Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#0842b8] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md border-2 border-white whitespace-nowrap">
              <CheckCircle2 size={13} className="text-amber-300" />
              <span>CEO & FOUNDER</span>
            </div>
          </div>

          <div className="mt-6 space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Vincent Ole Kipelian
            </h3>
            <div className="text-xs sm:text-sm text-[#0842b8] font-bold">
              Chief Executive Officer, Enduata Media Services
            </div>
            <div className="inline-block bg-red-50 text-[#e51919] font-black text-xs px-3 py-0.5 rounded-full border border-red-100 mt-1">
              "The Smiling Machine"
            </div>
          </div>

          {/* Quick Contact & Office Pill */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap justify-center gap-2 text-[11px] text-slate-600 font-semibold">
            <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <Radio size={12} className="text-[#0842b8]" /> Enduata FM 88.5 Narok
            </span>
            <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <Award size={12} className="text-[#e51919]" /> Nduat Show Host
            </span>
          </div>
        </div>

        {/* Executive Statement & Narrative */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0842b8] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#0842b8]" />
              EXECUTIVE LEADERSHIP & VISION
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              NABOISHO OLOSHO LE MAA
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            “Building a Media Platform with Purpose, Truth & Community Pride”
          </h2>

          <div className="bg-gradient-to-r from-blue-50/70 to-slate-50 p-4 sm:p-5 rounded-2xl border-l-4 border-[#0842b8] shadow-sm space-y-2">
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
              “Enduata is more than a media platform. It is a home where stories, people, culture, and transformative ideas come together. Our steadfast goal is to inform, engage, and create a stronger future for the communities we serve in Narok County and beyond.”
            </p>
            <div className="text-right text-[11px] font-bold text-[#0842b8]">
              — Vincent Kipelian, CEO Enduata Media Services
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Under Vincent Ole Kipelian’s transformative leadership, Enduata Media Services has grown into a premier regional broadcaster with over 938 broadcasts and an engaged digital audience across Kenya and the globe. Celebrated as <strong className="text-slate-800">"The Smiling Machine"</strong> for his warmth, resilience, and magnetic screen presence, Vincent has bridged generational divides through exclusive, high-impact dialogues with senior government ministers, governors, youth morans, and revered Maa community elders.
          </p>

          {/* Key Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {keyStats.map((stat, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
                <div className="text-lg sm:text-xl font-black text-[#0842b8]">{stat.value}</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/videos"
              className="bg-[#0842b8] hover:bg-[#063391] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2"
            >
              <Play size={14} fill="currentColor" />
              <span>Watch Nduat Show Interviews</span>
            </Link>
            {variant === 'home' ? (
              <Link
                to="/about#ceo"
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <span>Read Full Leadership Story</span>
                <ChevronRight size={14} />
              </Link>
            ) : (
              <Link
                to="/programs"
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <span>Explore Broadcast Schedule</span>
                <ChevronRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* DEDICATED LEADERSHIP ACHIEVEMENTS SECTION */}
      <div className="pt-6 border-t border-slate-200/80 space-y-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-600">
                <Trophy size={18} />
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Leadership Achievements & Community Impact
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Key milestones, advocacy pillars, and developmental impact delivered under CEO Vincent Kipelian
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#0842b8] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 self-start sm:self-auto">
            Verified EMS Milestones
          </span>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-50/70 hover:bg-white border border-slate-200 rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:border-[#0842b8] flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${item.bg} ${item.border} border flex items-center justify-center ${item.color} shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#0842b8] transition">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#0842b8] uppercase tracking-wider pt-2 border-t border-slate-200/60">
                  <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                  <span>Strategic Achievement</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

