import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Headphones, Volume2, MessageSquare, Phone, Send, Sparkles, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import RadioPlayer from '../components/RadioPlayer';
import { STATION } from '../config/streams';
import { programs } from '../data/programs';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function LiveRadio({ radioProps }) {
  const { isPlaying, toggleRadio, showToast } = radioProps;

  // Interactive Song Request & Shoutout State
  const [requests, setRequests] = useState([
    { id: 1, name: 'Lemayian Ole Sopia', song: 'Ashe Enkai by Timothy Opoti', message: 'Big shout out to all morans in Mara and Ololulung’a!', time: '5m ago' },
    { id: 2, name: 'Faith Naisula', song: 'Irenchai Lolonuku - Loonguesi', message: 'Tuning in live from Narok Town. Loving the broadcast!', time: '12m ago' },
    { id: 3, name: 'Elders Council Mara', song: 'Enkiguana Olosho Theme', message: 'Greetings to Vincent Ole Kipelian and Hon. Sankok.', time: '25m ago' }
  ]);

  const [form, setForm] = useState({ name: '', song: '', phone: '', message: '' });

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.song.trim()) return;

    const newReq = {
      id: Date.now(),
      name: form.name.trim(),
      song: form.song.trim(),
      message: form.message.trim() || 'Live greetings to the Enduata FM studio!',
      time: 'Just now'
    };

    setRequests([newReq, ...requests]);
    setForm({ name: '', song: '', phone: '', message: '' });
    if (showToast) showToast('🎉 Shoutout & song request sent to on-air presenter!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-12 bg-[#f4f7fb]">
      {/* Header Banner */}
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
        <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <Radio size={13} />
          <span>88.5 FM NAROK &bull; ON-AIR STUDIO</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans tracking-tight">
          ENDUATA FM LIVE RADIO
        </h1>
        <p className="text-sm md:text-base text-[#0842b8] font-bold mt-2">
          {STATION.tagline} &bull; FREQUENCY 88.5 FM
        </p>
        <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
          Broadcasting from the heart of Narok County across the Great Rift Valley. Experience crystal-clear audio, Maa cultural programming, agricultural updates, and inspiring community dialogue.
        </p>
      </motion.div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Studio Console & Player (7 cols) */}
        <motion.div {...fadeIn} className="lg:col-span-7 space-y-6">
          <RadioPlayer radioProps={radioProps} expanded={true} />

          {/* Quick Info Strip */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Frequency</span>
              <span className="text-base font-black text-[#0842b8]">88.5 FM</span>
            </div>
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Coverage</span>
              <span className="text-base font-black text-slate-900">Narok & Worldwide</span>
            </div>
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Audio Stream</span>
              <span className="text-base font-black text-emerald-600">128 kbps HD</span>
            </div>
          </div>

          {/* Direct Studio Call / WhatsApp Hotline */}
          <div className="bg-gradient-to-r from-[#0842b8] to-[#052878] text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl shrink-0 text-white border border-white/20">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Studio Call-In Hotline</h4>
                <p className="text-xs text-blue-100">Call the presenter live on air: <strong className="text-amber-300 font-mono text-sm">{STATION.phone}</strong></p>
              </div>
            </div>
            <a
              href="https://wa.me/254795502587?text=Hello%20Enduata%20FM,%20I%20am%20listening%20live!"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition shrink-0 flex items-center gap-1.5"
            >
              <MessageSquare size={14} />
              <span>WhatsApp Studio</span>
            </a>
          </div>
        </motion.div>

        {/* Live Song Request & Shoutout Board (5 cols) */}
        <motion.div {...fadeIn} className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Sparkles size={18} className="text-[#0842b8]" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Request a Song & Shoutout</h3>
                <p className="text-xs text-slate-500">Send greetings to family, friends, and the studio host</p>
              </div>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ole Kipelian"
                  className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Song / Track Dedicated *</label>
                <input
                  type="text"
                  required
                  value={form.song}
                  onChange={(e) => setForm({ ...form, song: e.target.value })}
                  placeholder="e.g. Papa Kinarikino by Pst Samuel Sere"
                  className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Shoutout Message</label>
                <textarea
                  rows="2"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Greetings to Ololulung'a, Narok Town, Mara..."
                  className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0842b8] hover:bg-[#063391] text-white text-xs font-bold py-3 rounded-xl transition shadow flex items-center justify-center gap-1.5"
              >
                <Send size={14} />
                <span>Submit Shoutout to Studio</span>
              </button>
            </form>

            {/* Live Feed of Recent Shoutouts */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Recent Live Shoutouts</span>
                <span className="text-[10px] text-[#0842b8] font-bold bg-blue-50 px-2 py-0.5 rounded">LIVE FEED</span>
              </h4>
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {requests.map((r) => (
                  <div key={r.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{r.name}</span>
                      <span className="text-[10px] text-slate-400">{r.time}</span>
                    </div>
                    <div className="text-[#0842b8] text-[11px] font-bold">🎵 {r.song}</div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">"{r.message}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Today's Full Radio Lineup */}
      <motion.section {...fadeIn} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock size={18} className="text-[#0842b8]" />
              <span>Full Radio Daily Lineup (88.5 FM)</span>
            </h3>
            <p className="text-xs text-slate-500">Daily programs connecting community, culture, news, and inspiration</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((p) => (
            <div key={p.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between hover:border-[#0842b8]/40 transition">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-mono text-[#0842b8] font-bold">{p.time}</span>
                  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-slate-700">{p.category}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                <p className="text-xs text-[#e51919] font-bold mt-0.5">Host: {p.host}</p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">{p.description}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 font-medium">
                {p.days}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
