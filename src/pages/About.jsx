import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info, Heart, Award, ShieldCheck, Target, Sparkles, MapPin, Users } from 'lucide-react';
import { STATION } from '../config/streams';
import CEOSection from '../components/CEOSection';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const galleryImages = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Kenya_Masaai_tribe_dress.jpg', title: 'Maa Traditional Dress', caption: 'Maasai cultural identity, ceremonial beadwork and attire' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Maasai_People_Clothing.jpg', title: 'Maa Community Life', caption: 'Unity, generational wisdom and community cohesion' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Maasai_Girls.jpg', title: 'Maa Women & Beadwork', caption: 'Celebrating the intricate artisanal heritage of Maa women' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Maasai_Moran.jpg', title: 'Maa Moran Pastoral Life', caption: 'Heritage, pastoralist resilience and cultural values' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Lion_in_masai_mara.jpg', title: 'Maasai Mara Wildlife', caption: 'Coexistence with wildlife in the world-famous reserve' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Masai_Mara_Giraffe.jpg/1280px-Masai_Mara_Giraffe.jpg', title: 'Mara Ecosystem', caption: 'Preserving biodiversity in Narok County' }
];

export default function About() {
  useEffect(() => {
    if (window.location.hash === '#ceo') {
      const el = document.getElementById('ceo');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-12 bg-[#f4f7fb]">
      {/* Page Header */}
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
        <span className="bg-[#0842b8] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 shadow-sm">
          <Info size={13} />
          <span>ABOUT ENDUATA MEDIA SERVICES (EMS)</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans tracking-tight">
          OUR STORY & MISSION
        </h1>
        <p className="text-sm md:text-base text-[#0842b8] font-bold mt-2">
          {STATION.tagline} &bull; NAROK COUNTY, KENYA
        </p>
        <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
          {STATION.mission}
        </p>
      </motion.div>

      {/* Core Mission, Vision & Values Cards */}
      <motion.div {...fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#e51919]">
            <Target size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To provide timely, accurate, and uplifting broadcasting that advocates for peace, mentors young leaders, preserves Maa cultural heritage, and empowers communities with vital news and information.
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0842b8]">
            <Award size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To be the premier television and radio broadcasting network across the Great Rift Valley, renowned for journalistic integrity, community impact, and the celebration of African cultural excellence.
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Values</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Integrity, Community Empowerment, Inclusivity, Cultural Preservation, Professionalism, and Dedicated Service to the Pastoralist & Maa People.
          </p>
        </div>
      </motion.div>

      {/* CEO Profile & Leadership Achievements Section */}
      <CEOSection variant="full" id="ceo" />

      {/* Cultural Heritage & Wildlife Gallery */}
      <motion.section {...fadeIn} className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={18} className="text-[#0842b8]" />
              <span>Maa Culture & Maasai Mara Gallery</span>
            </h2>
            <p className="text-xs text-slate-500">A visual celebration of traditional dress, community life, and natural heritage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, i) => (
            <div key={i} className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:border-[#0842b8] hover:shadow-md transition">
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0842b8] transition">{img.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
