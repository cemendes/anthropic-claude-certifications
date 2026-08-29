interface Props {
  selectedDomains: number[];
  onChange: (domains: number[]) => void;
}

const DOMAINS = [
  { id: 1, name: 'Agentic Capabilities', color: 'bg-domain-1' },
  { id: 2, name: 'Claude Code', color: 'bg-domain-2' },
  { id: 3, name: 'Prompt Engineering', color: 'bg-domain-3' },
  { id: 4, name: 'Model Control Protocol', color: 'bg-domain-4' },
  { id: 5, name: 'Context Management', color: 'bg-domain-5' },
];

export const DomainFilter: React.FC<Props> = ({ selectedDomains, onChange }) => {
  const toggleDomain = (id: number) => {
    if (selectedDomains.includes(id)) {
      onChange(selectedDomains.filter(d => d !== id));
    } else {
      onChange([...selectedDomains, id]);
    }
  };

  return (
    <div className="bg-card-1 border border-border rounded-xl p-5 shadow-lg flex flex-col gap-4">
      <h3 className="font-bold text-on-surface flex items-center gap-2 text-sm uppercase tracking-wider">
        <span className="material-symbols-outlined text-[18px]">filter_list</span>
        Filter Domains
      </h3>
      
      <div className="flex flex-col gap-3">
        {DOMAINS.map(domain => {
          const isSelected = selectedDomains.includes(domain.id);
          return (
            <label 
              key={domain.id} 
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors border ${isSelected ? 'bg-card-2 border-outline-variant' : 'bg-transparent border-transparent hover:bg-card-2/50'}`}
            >
              <div className="relative flex items-center justify-center shrink-0">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  checked={isSelected}
                  onChange={() => toggleDomain(domain.id)}
                />
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-primary-container border-primary-container' : 'border-outline-variant'}
                `}>
                  {isSelected && <span className="material-symbols-outlined text-[12px] text-bg font-bold">check</span>}
                </div>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${domain.color}`}></span>
              <span className={`text-sm leading-tight ${isSelected ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>
                {domain.name}
              </span>
            </label>
          );
        })}
      </div>
      
      <div className="flex gap-2 pt-2 border-t border-border mt-1">
        <button 
          className="flex-1 py-1.5 px-2 text-xs font-semibold rounded-md bg-card-2 hover:bg-outline-variant/30 transition-colors text-on-surface"
          onClick={() => onChange([1, 2, 3, 4, 5])}
        >
          Select All
        </button>
        <button 
          className="flex-1 py-1.5 px-2 text-xs font-semibold rounded-md bg-card-2 hover:bg-outline-variant/30 transition-colors text-on-surface"
          onClick={() => onChange([])}
        >
          Clear
        </button>
      </div>
    </div>
  );
};
