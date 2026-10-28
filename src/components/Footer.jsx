import { Link } from 'react-router-dom';
import { Radio, Tv, Youtube, Mail, Phone, MapPin, Facebook, Globe, Music2 } from 'lucide-react';
import { STATION, STREAMS } from '../config/streams';

export default function Footer() {
  return (
    <footer className="bg-[#051c50] text-slate-300 border-t border-blue-900/60 mt-16 py-12 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div className="space-y-3.5">
          <div className="bg-white p-2 rounded-lg inline-block shadow-sm">
            <img
              src="/images/enduata-logo.png"
              alt="Enduata TV & Radio"
              className="h-9 w-auto object-contain"
            />
          </div>
          <p className="text-[12px] leading-relaxed text-slate-300">
            {STATION.tagline}. Broadcasting from {STATION.location}. {STATION.mission}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-full bg-[#0842b8] hover:bg-blue-600 text-white flex items-center justify-center transition"
              title="Facebook"
            >
              <Facebook size={14} fill="currentColor" />
            </a>
            <a
              href={STATION.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-full bg-[#e51919] hover:bg-red-700 text-white flex items-center justify-center transition"
              title="YouTube"
            >
              <Youtube size={14} />
            </a>
            <a
              href="https://enduata.co.ke"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-full bg-[#0842b8] hover:bg-blue-600 text-white flex items-center justify-center transition"
              title="Website"
            >
              <Globe size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-3.5 text-xs">Explore</h4>
          <ul className="space-y-2 text-[12px]">
            <li>
              <Link to="/live-radio" className="hover:text-amber-300 transition flex items-center gap-1.5">
                <Radio size={12} /> Live Radio 88.5 FM
              </Link>
            </li>
            <li>
              <Link to="/live-tv" className="hover:text-red-400 transition flex items-center gap-1.5">
                <Tv size={12} /> Live TV Broadcast
              </Link>
            </li>
            <li>
              <Link to="/programs" className="hover:text-white transition">Programs & Schedule</Link>
            </li>
            <li>
              <Link to="/presenters" className="hover:text-white transition">Presenters & DJs</Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-white transition">News & Articles</Link>
            </li>
            <li>
              <Link to="/videos" className="hover:text-white transition">Video Gallery</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-3.5 text-xs">Contact & Studios</h4>
          <ul className="space-y-2.5 text-[12px]">
            <li className="flex items-center gap-2"><MapPin size={13} className="text-[#e51919] shrink-0" /> {STATION.location}</li>
            <li className="flex items-center gap-2"><Phone size={13} className="text-[#0842b8] shrink-0" /> {STATION.phone}</li>
            <li className="flex items-center gap-2"><Mail size={13} className="text-amber-400 shrink-0" /> {STATION.email}</li>
            <li className="flex items-center gap-2"><Youtube size={13} className="text-[#e51919] shrink-0" /> {STREAMS.youtube.handle}</li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-3.5 text-xs">Stay Connected</h4>
          <p className="text-[12px] mb-3 text-slate-300">
            Subscribe to our official YouTube channel for live broadcasts, news notifications and cultural programs.
          </p>
          <a
            href={STATION.socials.youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#e51919] hover:bg-[#c41414] text-white font-bold px-4 py-2 rounded-lg text-xs transition shadow"
          >
            <Youtube size={14} />
            Subscribe ({STREAMS.youtube.subscribers})
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
        <div>&copy; {new Date().getFullYear()} {STATION.name}. All rights reserved. &bull; {STATION.tagline}</div>
        <div className="text-amber-300 font-semibold">Serving the Maa Community and the World</div>
      </div>
    </footer>
  );
}
