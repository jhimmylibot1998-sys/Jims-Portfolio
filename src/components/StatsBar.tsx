import { StatItem } from '../types';

interface StatsBarProps {
  stats: StatItem[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-[#FAF8F5] border-b border-[#D5D0C6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#D5D0C6]">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col justify-between ${
                index > 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-[#77756F] uppercase tracking-wider mb-2">
                <span>INDEX 0{index + 1}</span>
                <span className="text-[#D65335]">●</span>
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#191919] tabular-nums tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-wider text-[#191919] font-medium">
                  {stat.label}
                </div>
                {stat.subtext && (
                  <div className="mt-0.5 text-xs text-[#77756F]">
                    {stat.subtext}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
