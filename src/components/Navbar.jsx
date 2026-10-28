import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Radio, Tv, Home as HomeIcon, Search, Facebook, Youtube, Globe, Music2 } from 'lucide-react';
import { STATION } from '../config/streams';

const navLinks = [
  { to: '/live-tv', label: 'Live TV' },
  { to: '/live-radio', label: 'Live Radio' },
  { to: '/news', label: 'News' },
  { to: '/programs', label: 'Radio Presenters & Programmes' },
  { to: '/about#ceo', label: 'CEO' },
  { to: '/videos', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ radioProps }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const location = useLocation();
  const { isPlaying, toggleRadio } = radioProps;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const datePart = now.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const timePart = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setFormattedTime(`${datePart} | ${timePart}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Header: White Background with Logo, Date/Time, Social Icons, Search */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/enduata-logo.png"
              alt="ENDUATA TV - Naboishe olosho le maa"
              className="h-12 md:h-14 w-auto object-contain drop-shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span class="text-2xl font-black text-[#002b9e]">ENDUATA <span class="text-[#e51919]">TV</span></span>';
              }}
            />
          </Link>

          {/* Right Section: Date & Time, Social Icons, Search Bar */}
          <div className="flex items-center gap-3 md:gap-5 ml-auto flex-wrap justify-end">
            {/* Live Date and Time */}
            <div className="hidden lg:block text-slate-600 text-xs md:text-sm font-medium">
              {formattedTime || 'Mon, 07 Sep 2026 | 11:35 AM'}
            </div>

            {/* Circular Social Buttons in Royal Blue */}
            <div className="flex items-center gap-1.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#0842b8] hover:bg-[#063391] text-white flex items-center justify-center transition shadow-sm"
                title="Facebook"
              >
                <Facebook size={14} fill="currentColor" />
              </a>
              <a
                href={STATION.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#0842b8] hover:bg-[#063391] text-white flex items-center justify-center transition shadow-sm"
                title="YouTube"
              >
                <Youtube size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#0842b8] hover:bg-[#063391] text-white flex items-center justify-center transition text-xs font-bold shadow-sm"
                title="X"
              >
                𝕏
              </a>
              <a
                href="https://enduata.co.ke"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#0842b8] hover:bg-[#063391] text-white flex items-center justify-center transition shadow-sm"
                title="Website / Information"
              >
                <Globe size={14} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#0842b8] hover:bg-[#063391] text-white flex items-center justify-center transition shadow-sm"
                title="TikTok"
              >
                <Music2 size={14} />
              </a>
            </div>

            {/* Search Input Bar with Blue Button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/news?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="flex items-center"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-slate-300 bg-white text-slate-800 text-xs md:text-sm px-3 py-1.5 rounded-l focus:outline-none focus:border-[#0842b8] w-28 sm:w-40 md:w-52"
              />
              <button
                type="submit"
                className="bg-[#0842b8] hover:bg-[#063391] text-white px-3 py-2 rounded-r transition flex items-center justify-center"
                title="Search"
              >
                <Search size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar: Solid Royal Blue Background (#0842b8) */}
      <nav className="bg-[#0842b8] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-stretch justify-between">
          <div className="flex items-stretch overflow-x-auto no-scrollbar">
            {/* Home Icon in Darker Blue Box (#063391) */}
            <Link
              to="/"
              className={`px-4 py-3 flex items-center justify-center transition ${
                location.pathname === '/' ? 'bg-[#063391]' : 'bg-[#063391]/80 hover:bg-[#063391]'
              }`}
              title="Home"
            >
              <HomeIcon size={16} className="text-white" />
            </Link>

            {/* Nav Menu Items in Bold White Text */}
            <div className="hidden md:flex items-stretch">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to + link.label}
                    to={link.to}
                    className={`px-3.5 py-3 text-xs md:text-sm font-bold tracking-wide transition flex items-center whitespace-nowrap ${
                      isActive ? 'bg-[#063391] text-white' : 'text-white hover:bg-[#063391]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Action Broadcast Buttons & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 pr-3">
            <button
              onClick={toggleRadio}
              className={`px-3 py-1.5 rounded text-xs font-bold transition flex items-center gap-1.5 ${
                isPlaying
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-[#063391] hover:bg-[#052878] text-white'
              }`}
            >
              <Radio size={14} />
              <span className="hidden sm:inline">{isPlaying ? '88.5 FM LIVE' : 'LISTEN RADIO'}</span>
            </button>

            <Link
              to="/live-tv"
              className="bg-[#e51919] hover:bg-[#c41414] text-white px-3 py-1.5 rounded text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Tv size={14} />
              <span className="hidden sm:inline">LIVE TV</span>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1.5 rounded text-white hover:bg-[#063391] transition"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-[#063391] border-t border-[#0842b8] px-4 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded text-sm font-bold text-white hover:bg-[#0842b8]"
            >
              <HomeIcon size={16} /> Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded text-sm font-bold transition ${
                  location.pathname === link.to
                    ? 'bg-[#0842b8] text-white'
                    : 'text-white hover:bg-[#0842b8]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
