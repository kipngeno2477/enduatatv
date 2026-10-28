import { X, ExternalLink } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl modal-enter" onClick={(e) => e.stopPropagation()}>
        <div className="bg-slate-950 p-3.5 flex items-center justify-between border-b border-slate-800">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            {video.badge || 'Enduata Broadcast Theater'}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="video-responsive bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold text-white">{video.title}</h3>
          {video.speaker && (
            <p className="text-xs text-amber-400 font-semibold mt-1">Speaker: {video.speaker}</p>
          )}
          {video.description && (
            <p className="text-xs text-slate-300 mt-2">{video.description}</p>
          )}

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span>{video.views}</span>
              <span>&bull;</span>
              <span>{video.duration}</span>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition"
            >
              Open on YouTube <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
