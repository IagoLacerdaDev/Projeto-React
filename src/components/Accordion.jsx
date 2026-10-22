import { useState } from 'react';

export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  const handleToggle = (index) => {
    // Se clicar no que já está aberto, fecha (null). Senão, abre o clicado.
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="accordion-wrapper">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <h3>
              <button
                type="button"
                className="accordion-header"
                onClick={() => handleToggle(index)}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${index}`}
                id={`accordion-btn-${index}`}
              >
                <span>{item.title}</span>
                <span className="accordion-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={`accordion-content-${index}`}
              role="region"
              aria-labelledby={`accordion-btn-${index}`}
              className="accordion-content"
            >
              <div className="accordion-body">
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}