interface MetaRowProps {
  label: string;
  value: string | undefined;
  highlight?: boolean;
  darkMode?: boolean;
}

export function MetaRow({ label, value, highlight, darkMode }: MetaRowProps) {
  const textClass = darkMode
    ? highlight
      ? 'text-orange'
      : 'text-white/70'
    : highlight
    ? 'text-orange'
    : 'text-gray-600 dark:text-gray-400';

  return (
    <div className="flex justify-between items-center group">
      <span className="text-[9px] font-black uppercase opacity-50 group-hover:opacity-70 tracking-widest transition-opacity">
        {label}
      </span>
      <span className={`text-[11px] font-bold uppercase transition-all ${textClass}`}>
        {value}
      </span>
    </div>
  );
}
