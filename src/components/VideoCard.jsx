import { Play } from 'lucide-react';

export default function VideoCard({ video, onClick }) {
  return (
    <div
      onClick={() => onClick && onClick(video)}
      className="group bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-sm hover:border-[#0842b8] hover:shadow-md transition-all cursor-pointer flex flex-col"
    >
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {video.badge && (
          <div className="absolute top-2.5 left-2.5 bg-[#e51919] text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
            {video.badge}
          </div>
        )}
        <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white font-mono text-[11px] px-2 py-0.5 rounded font-bold">
          {video.duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/30">
          <span className="w-12 h-12 rounded-full bg-[#e51919] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
            <Play size={20} fill="currentColor" />
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#0842b8] transition line-clamp-2 leading-snug">
            {video.title}
          </h3>
          {video.speaker && (
            <p className="text-xs text-[#0842b8] font-semibold mt-1.5 flex items-center gap-1">
              👤 {video.speaker}
            </p>
          )}
          {video.description && (
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>{video.views}</span>
          <span>&bull;</span>
          <span>{video.published}</span>
          <span className="text-[#0842b8] font-semibold ml-auto group-hover:underline">Watch Now →</span>
        </div>
      </div>
    </div>
  );
}
