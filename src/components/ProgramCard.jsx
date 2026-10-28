import { Clock, Calendar, User, Radio } from 'lucide-react';

export default function ProgramCard({ program, onTuneIn }) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:border-[#0842b8] hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0842b8] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
            {program.category || 'Radio Show'}
          </span>
          <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
            <Clock size={12} className="text-[#0842b8]" />
            {program.time}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0842b8] transition mb-1">
          {program.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold mb-3">
          <User size={13} className="text-[#e51919]" />
          <span>{program.host}</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
          {program.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 flex items-center gap-1 text-[11px]">
          <Calendar size={12} className="text-[#0842b8]" />
          {program.days}
        </span>
        {onTuneIn && (
          <button
            onClick={() => onTuneIn(program)}
            className="text-[#0842b8] hover:text-[#063391] font-bold flex items-center gap-1 group-hover:underline text-xs"
          >
            <Radio size={12} />
            <span>Tune In Live</span>
          </button>
        )}
      </div>
    </div>
  );
}
