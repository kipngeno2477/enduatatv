import { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Radio, Tv, Globe, TrendingUp, CheckCircle, Send, Users, ShieldCheck } from 'lucide-react';
import { STATION } from '../config/streams';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const packages = [
  {
    name: 'Radio Prime Spotlight',
    badge: 'Popular',
    icon: Radio,
    color: 'bg-[#0842b8]',
    description: '30-second commercial spots during high-listenership morning & evening drive shows on Enduata FM 88.5.',
    features: [
      '6 Spots Daily (Peak Hours: 7-9AM & 5-7PM)',
      'Live Presenter Endorsements by Top Hosts',
      'Weekend Enkiguran & Cultural Show Placements',
      'Direct Broadcast to Pastoralist & Urban Markets',
      'Monthly Audience Analytics Report'
    ]
  },
  {
    name: 'Television Live Banner & Mentions',
    badge: 'High Impact',
    icon: Tv,
    color: 'bg-[#e51919]',
    description: 'Prominent on-screen lower third banners and verbal sponsor recognitions during live television broadcasts on YouTube.',
    features: [
      'Visual Lower-Third Banner in Live Broadcasts',
      'Sponsor Mentions in High-Profile Interviews (Sankok/MCAs)',
      'Video Ad Placements in Replay Archives',
      'Reach 7.76K+ YouTube Subscribers & Global Viewers',
      'Social Media Shoutouts on Community Wall'
    ]
  },
  {
    name: 'Complete 360° Multimedia Campaign',
    badge: 'Best Value',
    icon: Globe,
    color: 'bg-gradient-to-r from-[#0842b8] to-[#e51919]',
    description: 'Integrated multi-platform sponsorship across Radio 88.5 FM, Live TV, Video Gallery, News Portal, and Event Coverage.',
    features: [
      'Unlimited Radio & TV Rotations across the month',
      'Dedicated Sponsored Interview Episode on Nduat Show',
      'Website Banner Ads on Home & News Pages',
      'Live Outside Broadcasting (OB) Van Event Coverage',
      'Custom Audio & Video Advert Production Included'
    ]
  }
];

export default function Advertise({ showToast }) {
  const [form, setForm] = useState({ company: '', contactName: '', email: '', phone: '', packageInterest: 'Radio Prime Spotlight', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.company || !form.email) return;

    setSubmitted(true);
    if (showToast) showToast('📊 Advertising inquiry submitted! Our commercial desk will contact you.');
    setForm({ company: '', contactName: '', email: '', phone: '', packageInterest: 'Radio Prime Spotlight', notes: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-12 bg-[#f4f7fb]">
      {/* Page Header */}
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
        <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <Megaphone size={13} />
          <span>COMMERCIAL DESK & SPONSORSHIPS</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans tracking-tight">
          ADVERTISE WITH ENDUATA MEDIA
        </h1>
        <p className="text-sm md:text-base text-[#0842b8] font-bold mt-2">
          GROW YOUR BRAND ACROSS NAROK COUNTY & THE MAA REGION
        </p>
        <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
          Position your business, NGO, county initiative, or corporate campaign in front of thousands of dedicated daily listeners and engaged television viewers.
        </p>
      </motion.div>

      {/* Audience Demographics Metrics */}
      <motion.div {...fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm">
          <span className="text-2xl md:text-3xl font-black text-[#0842b8]">7.76K+</span>
          <span className="text-xs text-slate-700 font-bold block mt-1">YouTube Subscribers</span>
          <span className="text-[10px] text-slate-400">Channel @Enduata033</span>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm">
          <span className="text-2xl md:text-3xl font-black text-[#e51919]">938+</span>
          <span className="text-xs text-slate-700 font-bold block mt-1">Broadcast Videos</span>
          <span className="text-[10px] text-slate-400">Rich Digital Footprint</span>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm">
          <span className="text-2xl md:text-3xl font-black text-emerald-600">88.5 FM</span>
          <span className="text-xs text-slate-700 font-bold block mt-1">Narok County 033</span>
          <span className="text-[10px] text-slate-400">County-Wide Coverage</span>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm">
          <span className="text-2xl md:text-3xl font-black text-slate-900">100K+</span>
          <span className="text-xs text-slate-700 font-bold block mt-1">Monthly Engagements</span>
          <span className="text-[10px] text-slate-400">High Trust Audience</span>
        </div>
      </motion.div>

      {/* Advertising Packages Grid */}
      <motion.div {...fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, idx) => {
          const Icon = pkg.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-[#0842b8] hover:shadow-md transition relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${pkg.color} flex items-center justify-center text-white shadow`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0842b8] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {pkg.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{pkg.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">{pkg.description}</p>

                <div className="space-y-2.5 border-t border-slate-100 pt-4 mb-6">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#inquiry"
                onClick={() => setForm({ ...form, packageInterest: pkg.name })}
                className="w-full bg-blue-50 hover:bg-[#0842b8] text-[#0842b8] hover:text-white font-bold py-2.5 rounded-xl transition text-xs text-center block"
              >
                Book This Package
              </a>
            </div>
          );
        })}
      </motion.div>

      {/* Inquiry Form Section */}
      <motion.div {...fadeIn} id="inquiry" className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">Request Rate Card & Custom Quote</h3>
            <p className="text-xs text-slate-500 mt-1">Our commercial specialists will customize a sponsorship package for your marketing goals.</p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle size={36} className="text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">Inquiry Received</h4>
              <p className="text-xs text-slate-600">Our Commercial Director will respond with our official rate card within 24 business hours.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#0842b8] text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Mara Safari Lodge"
                    className="w-full bg-slate-50 text-xs text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    placeholder="e.g. Mary Naisula"
                    className="w-full bg-slate-50 text-xs text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. marketing@yourbrand.co.ke"
                    className="w-full bg-slate-50 text-xs text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. +254 700 000 000"
                    className="w-full bg-slate-50 text-xs text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Selected Package</label>
                <select
                  value={form.packageInterest}
                  onChange={(e) => setForm({ ...form, packageInterest: e.target.value })}
                  className="w-full bg-slate-50 text-xs text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
                >
                  <option value="Radio Prime Spotlight">Radio Prime Spotlight (88.5 FM)</option>
                  <option value="Television Live Banner & Mentions">Television Live Banner & Mentions (YouTube Live)</option>
                  <option value="Complete 360° Multimedia Campaign">Complete 360° Multimedia Campaign</option>
                  <option value="Event Sponsorship / Outside Broadcast">Event Sponsorship / Outside Broadcast</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Campaign Objectives / Timeline</label>
                <textarea
                  rows="3"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Tell us about your campaign goals, target dates, or specific program interests..."
                  className="w-full bg-slate-50 text-xs text-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0842b8] hover:bg-[#063391] text-white font-bold py-3.5 rounded-xl transition shadow text-xs flex items-center justify-center gap-2"
              >
                <Send size={14} />
                <span>Submit Rate Card Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
