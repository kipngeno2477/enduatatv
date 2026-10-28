import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Globe, Youtube, CheckCircle2 } from 'lucide-react';
import { STATION } from '../config/streams';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function Contact({ showToast }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitted(true);
    if (showToast) showToast('✉️ Message sent successfully to Enduata Media!');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-12 bg-[#f4f7fb]">
      {/* Header */}
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
        <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <Phone size={13} />
          <span>CONTACT & STUDIO HOTLINE</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans tracking-tight">
          GET IN TOUCH WITH US
        </h1>
        <p className="text-sm md:text-base text-[#0842b8] font-bold mt-2">
          WE ARE HERE TO LISTEN AND SERVE THE COMMUNITY
        </p>
        <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
          Reach our studio team in Narok for breaking news tips, program feedback, on-air interview requests, or general community inquiries.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information & Channels (5 cols) */}
        <motion.div {...fadeIn} className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
              Studio & Executive Desk
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#e51919] shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-bold">Studio Phone</span>
                  <a href={`tel:${STATION.phone}`} className="text-slate-900 hover:text-[#0842b8] font-bold transition">
                    {STATION.phone}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Live call-ins & SMS hotline</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0842b8] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-bold">Email Address</span>
                  <a href={`mailto:${STATION.email}`} className="text-slate-900 hover:text-[#0842b8] font-bold transition">
                    {STATION.email}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Editorial, press releases & advertising</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-bold">Location</span>
                  <span className="text-slate-900 font-bold">{STATION.location}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Broadcasting across Narok & Rift Valley</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#e51919] shrink-0">
                  <Youtube size={18} />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-bold">YouTube Broadcast</span>
                  <a href={STATION.socials.youtube} target="_blank" rel="noreferrer" className="text-slate-900 hover:text-[#e51919] font-bold transition">
                    @Enduata033 (7.76K Subs)
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-4 border-t border-slate-100">
              <a
                href="https://wa.me/254795502587?text=Hello%20Enduata%20Media,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition shadow flex items-center justify-center gap-2 text-xs"
              >
                <MessageSquare size={16} />
                <span>Chat via WhatsApp Business</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form (7 cols) */}
        <motion.div {...fadeIn} className="lg:col-span-7">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Send Us a Direct Message</h3>
            <p className="text-xs text-slate-500 mb-6">Fill in the form below and our team will get back to you promptly.</p>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Thank You for Reaching Out!</h4>
                <p className="text-xs text-slate-600">Your message has been safely received by the Enduata Media Services team.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[#0842b8] hover:bg-[#063391] text-white text-xs font-bold px-4 py-2 rounded-xl transition mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. John Ole Sankok"
                      className="w-full bg-slate-50 text-xs text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full bg-slate-50 text-xs text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. +254 700 000 000"
                      className="w-full bg-slate-50 text-xs text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. Song Request, News Tip, Interview"
                      className="w-full bg-slate-50 text-xs text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Your Message *</label>
                  <textarea
                    required
                    rows="4"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full bg-slate-50 text-xs text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0842b8] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0842b8] hover:bg-[#063391] text-white font-bold py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2 text-xs"
                >
                  <Send size={14} />
                  <span>Send Message to Enduata Media</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
