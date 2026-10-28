import { Mic, Radio, Calendar, Sparkles, Clock } from 'lucide-react';

export default function PresenterCard({ presenter, onSelect }) {
  return (
    <div
      onClick={() => onSelect && onSelect(presenter)}
      className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:border-[#0842b8] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col group"
    >
      {/* High-Resolution Presenter Portrait with Overlay */}
      <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
        <img
          src={presenter.photo}
          alt={presenter.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            if (e.target.dataset.triedFallback !== 'true') {
              e.target.dataset.triedFallback = 'true';
              if (e.target.src.includes('/images/')) {
                e.target.src = e.target.src.replace('/images/', '/');
              } else {
                const filename = e.target.src.split('/').pop();
                e.target.src = '/images/' + filename;
              }
              return;
            }
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML = `
              <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-slate-200 text-[#0842b8]">
                <span class="text-6xl">${presenter.fallbackIcon || '🎙️'}</span>
                <span class="text-sm font-bold mt-2 font-brand">${presenter.name}</span>
              </div>`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="bg-[#0842b8] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow flex items-center gap-1">
            <Radio size={11} /> 88.5 FM & TV
          </span>
          {presenter.alias && (
            <span className="bg-[#e51919] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
              "{presenter.alias}"
            </span>
          )}
        </div>

        {/* Bottom Overlay Text */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-lg font-black leading-tight drop-shadow-sm group-hover:text-blue-200 transition">
            {presenter.name}
          </h3>
          <p className="text-xs text-blue-100 font-medium drop-shadow-sm line-clamp-1">
            {presenter.title}
          </p>
        </div>
      </div>

      {/* Card Body & Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
          {presenter.bio}
        </p>

        <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px]">
            <Mic size={13} className="text-[#e51919] shrink-0" />
            <span className="truncate">
              {Array.isArray(presenter.shows) ? presenter.shows.join(' • ') : presenter.shows}
            </span>
          </div>
          <div className="text-[11px] text-[#0842b8] flex items-center gap-1.5 font-mono font-medium">
            <Clock size={12} className="shrink-0" />
            <span className="truncate">{presenter.schedule}</span>
          </div>
        </div>

        <button className="w-full mt-2 bg-blue-50 hover:bg-[#0842b8] text-[#0842b8] hover:text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1">
          <span>View Host Profile & Audio</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
