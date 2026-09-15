import React, { useState } from 'react';
import type { TrackType } from '../types';
import { getTrackDomainNames } from '../hooks/useQuiz';

interface Props {
  track: TrackType;
  selectedDomains: number[];
  onChange: (domains: number[]) => void;
  showExplanation?: boolean;
}

const DOMAIN_COLORS: Record<number, string> = {
  1: 'bg-domain-1',
  2: 'bg-domain-2',
  3: 'bg-domain-3',
  4: 'bg-domain-4',
  5: 'bg-domain-5',
};

export const DomainFilter: React.FC<Props> = ({ track, selectedDomains, onChange, showExplanation = false }) => {
  const domainNames = getTrackDomainNames(track);
  const [isExpanded, setIsExpanded] = useState(!showExplanation);
  const [prevShowExplanation, setPrevShowExplanation] = useState(showExplanation);

  if (showExplanation !== prevShowExplanation) {
    setPrevShowExplanation(showExplanation);
    if (showExplanation) {
      setIsExpanded(false);
    }
  }

  const toggleDomain = (id: number) => {
    if (selectedDomains.includes(id)) {
      onChange(selectedDomains.filter(d => d !== id));
    } else {
      onChange([...selectedDomains, id]);
    }
  };

  return (
    <div className="bg-card-1 border border-border rounded-xl shadow-lg overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-on-surface hover:bg-card-2/50 transition-colors cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary-container">filter_list</span>
          <h3 className="font-bold text-sm uppercase tracking-wider">Filter Domains</h3>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-card-2 border border-outline-variant text-xs font-medium text-on-surface-variant">
            {selectedDomains.length}/5
          </span>
        </div>
        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      
      {isExpanded && (
        <div className="px-5 pb-5 pt-3 border-t border-border/60 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map(id => {
              const isSelected = selectedDomains.includes(id);
              const name = domainNames[id] || `Domain ${id}`;
              return (
                <label 
                  key={id} 
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors border ${isSelected ? 'bg-card-2 border-outline-variant' : 'bg-transparent border-transparent hover:bg-card-2/50'}`}
                >
                  <div className="relative flex items-center justify-center shrink-0">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={isSelected}
                      onChange={() => toggleDomain(id)}
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                      ${isSelected ? 'bg-primary-container border-primary-container' : 'border-outline-variant'}
                    `}>
                      {isSelected && <span className="material-symbols-outlined text-[12px] text-bg font-bold">check</span>}
                    </div>
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${DOMAIN_COLORS[id]}`}></span>
                  <span className={`text-sm leading-tight ${isSelected ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>
                    {name}
                  </span>
                </label>
              );
            })}
          </div>
          
          <div className="flex gap-2 pt-2 border-t border-border mt-1">
            <button 
              type="button"
              className="flex-1 py-1.5 px-2 text-xs font-semibold rounded-md bg-card-2 hover:bg-outline-variant/30 transition-colors text-on-surface"
              onClick={() => onChange([1, 2, 3, 4, 5])}
            >
              Select All
            </button>
            <button 
              type="button"
              className="flex-1 py-1.5 px-2 text-xs font-semibold rounded-md bg-card-2 hover:bg-outline-variant/30 transition-colors text-on-surface"
              onClick={() => onChange([])}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
