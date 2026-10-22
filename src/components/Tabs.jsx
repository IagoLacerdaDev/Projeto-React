import { useState } from 'react';

export function Tabs({ tabsData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="tabs-wrapper">
      <div className="tabs-header" role="tablist" aria-label="Navegação em abas">
        {tabsData.map((tab, index) => {
          const isSelected = activeIndex === index;
          return (
            <button
              key={index}
              type="button"
              role="tab"
              id={`tab-${index}`}
              aria-selected={isSelected}
              aria-controls={`panel-${index}`}
              className={`tab-btn ${isSelected ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {tab.title}
            </button>
          );
        })}
      </div>
      <div
        id={`panel-${activeIndex}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeIndex}`}
        className="tab-panel"
      >
        <p>{tabsData[activeIndex]?.content}</p>
      </div>
    </div>
  );
}