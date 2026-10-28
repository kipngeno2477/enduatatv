import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tv, Youtube, MessageSquare, Send, Sparkles, Clock, Users, Play, Heart, Flame } from 'lucide-react';
import TVPlayer from '../components/TVPlayer';
import { STATION } from '../config/streams';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const pastStreams = [
  { id: '7K_FN1Ym4gw', title: 'TESTING SERVICES - Transmission 1', duration: '58:12', views: '111 views', date: 'Streamed 8mo ago' },
  { id: 'w1C9gW7MBBc', title: 'TESTING SERVICES - Extended Studio Live', duration: '1:57:31', views: '107 views', date: 'Streamed 8mo ago' },
  { id: 'l8EObcyWKM4', title: 'TESTING SERVICES - Radio & TV Simulcast', duration: '21:29', views: '55 views', date: 'Streamed 8mo ago' },
  { id: 'nVRUWRml6ic', title: 'TESTING SERVICES - Evening Broadcast Narok', duration: '49:28', views: '55 views', date: 'Streamed 8mo ago' },
  { id: 'tZHOvFp2UOA', title: 'TESTING SERVICES - Community Discourse', duration: '1:05:55', views: '79 views', date: 'Streamed 8mo ago' },
  { id: 'x8RYqAZxAx4', title: 'TESTING SERVICES - Live Transmission & Sound Check', duration: '1:17:37', views: '51 views', date: 'Streamed 9mo ago' },
];

export default function LiveTV({ showToast }) {
  const [activeVideoId, setActiveVideoId] = useState('7K_FN1Ym4gw');
  const [reactions, setReactions] = useState({ fire: 184, heart: 320, clap: 112, flag: 260 });
  const [chatList, setChatList] = useState([
    { id: 1, user: 'Hon. David K.', text: 'Watching live from Narok North! Picture quality is superb.', time: 'Just now' },
    { id: 2, user: 'Priscilla Sian', text: 'Enduata TV is truly advocating peace for our pastoralist families.', time: '2m ago' },
    { id: 3, user: 'Mara Conservancies Desk', text: 'Great interview on wildlife conservation and land rights.', time: '5m ago' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatList([
      ...chatList,
      { id: Date.now(), user: 'You (Viewer)', text: chatInput.trim(), time: 'Just now' }
    ]);
    setChatInput('');
    if (showToast) showToast('💬 Message posted to live stream chat!');
  };

  const handleReaction = (type) => {
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    if (showToast) showToast('Reaction sent!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-36 space-y-12">
      {/* Header Banner */}
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
        <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <Tv size={13} className="text-white" />
          <span>BROADCAST THEATER &bull; YOUTUBE & HLS</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans tracking-tight">
          ENDUATA <span className="text-[#0842b8]">TV</span> <span className="text-[#e51919]">LIVE</span>
        </h1>
        <p className="text-sm md:text-base text-[#0842b8] font-bold mt-2">
          NABOISHO OLOSHO LE MAA &bull; CHANNEL @ENDUATA033
        </p>
        <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
          Watch high-definition live television broadcasts, breaking news conferences, cultural documentaries, and high-level leadership interviews right from Narok County.
        </p>
      </motion.div>

      {/* Main Broadcast Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main TV Player (8 cols) */}
        <motion.div {...fadeIn} className="lg:col-span-8 space-y-6">
          <TVPlayer showToast={showToast} initialVideoId={activeVideoId} />

          {/* Interactive Reactions & Social Actions */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Live Reactions:</span>
              <button
                onClick={() => handleReaction('fire')}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 transition flex items-center gap-1.5 border border-slate-200"
              >
                <span>🔥</span>
                <span>{reactions.fire}</span>
              </button>
              <button
                onClick={() => handleReaction('heart')}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 transition flex items-center gap-1.5 border border-slate-200"
              >
                <span>❤️</span>
                <span>{reactions.heart}</span>
              </button>
              <button
                onClick={() => handleReaction('clap')}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 transition flex items-center gap-1.5 border border-slate-200"
              >
                <span>👏</span>
                <span>{reactions.clap}</span>
              </button>
              <button
                onClick={() => handleReaction('flag')}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-[#0842b8] transition flex items-center gap-1.5 border border-slate-200"
              >
                <span>🇰🇪 Maa</span>
                <span>{reactions.flag}</span>
              </button>
            </div>

            <a
              href={STATION.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="bg-[#e51919] hover:bg-[#c41414] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5"
            >
              <Youtube size={14} />
              <span>Subscribe on YouTube ({STATION.youtube?.subscribers || '7.76K'})</span>
            </a>
          </div>

          {/* Past Live Broadcasts Switcher */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={14} className="text-[#0842b8]" />
                <span>Archived Live Transmissions</span>
              </h3>
              <span className="text-[11px] text-[#0842b8] font-bold">{pastStreams.length} Broadcasts Recorded</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {pastStreams.map((stream) => (
                <button
                  key={stream.id}
                  onClick={() => {
                    setActiveVideoId(stream.id);
                    if (showToast) showToast(`Switched to broadcast: ${stream.duration}`);
                  }}
                  className={`p-3 rounded-xl text-left transition border text-xs flex flex-col justify-between ${
                    activeVideoId === stream.id
                      ? 'bg-blue-50 border-[#0842b8] text-[#0842b8] shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="font-semibold truncate w-full">{stream.title.replace('TESTING SERVICES - ', '')}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                    <span className="bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono text-[#e51919] font-bold">{stream.duration}</span>
                    <span>{stream.views}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Live Audience Chat & TV Lineup (4 cols) */}
        <motion.div {...fadeIn} className="lg:col-span-4 space-y-6">
          {/* Live Chat Box */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex flex-col h-[420px]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Audience Feed</span>
              </h3>
              <span className="text-[10px] text-slate-400">Narok Live</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {chatList.map((c) => (
                <div key={c.id} className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-[#0842b8]">{c.user}</span>
                    <span className="text-[10px] text-slate-400">{c.time}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Say something to the studio..."
                className="flex-1 bg-slate-50 text-xs text-slate-800 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
              />
              <button
                type="submit"
                className="bg-[#0842b8] hover:bg-[#063391] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm"
              >
                <Send size={13} />
              </button>
            </form>
          </div>

          {/* Today's TV Schedule */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm text-xs space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <Clock size={13} className="text-[#0842b8]" />
              <span>Today's Television Guide</span>
            </h4>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                <div>
                  <div className="font-bold text-white">EMS Morning News Hour</div>
                  <div className="text-[11px] text-slate-400">Narok & National Headlines</div>
                </div>
                <span className="font-mono text-amber-400">07:00 – 08:00</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                <div>
                  <div className="font-bold text-white">Maasai Mara Wildlife & Heritage</div>
                  <div className="text-[11px] text-slate-400">Conservation Documentary</div>
                </div>
                <span className="font-mono text-amber-400">14:00 – 15:30</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                <div>
                  <div className="font-bold text-red-400 font-extrabold">ENDUATA PRIME NEWS</div>
                  <div className="text-[11px] text-slate-400">Hosted by Vincent Kipelian</div>
                </div>
                <span className="font-mono text-red-400 font-bold">19:00 – 20:00</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-amber-300 font-extrabold">NDUAT SPECIAL INTERVIEW</div>
                  <div className="text-[11px] text-slate-400">Exclusive with Esila Letiet</div>
                </div>
                <span className="font-mono text-amber-300 font-bold">20:00 – 21:30</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
