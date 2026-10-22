import { useState, useEffect, useRef } from 'react';

// Recebe o rótulo do botão e a lista de opções (com label e callback) via props
export function Dropdown({ label = 'Selecione uma opção', options = [] }) {
  // useState gerencia a visibilidade do menu (aberto/fechado)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);

  // useRef referencia a div do componente para detectar cliques fora dele
  const dropdownRef = useRef(null);

  // useEffect monitora cliques na página para fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectOption = (option) => {
    setSelectedLabel(option.label);
    setIsOpen(false); // Fecha o menu ao selecionar uma opção
    if (option.onClick) {
      option.onClick(option); // Dispara o callback associado à opção
    }
  };

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <button
        type="button"
        className="dropdown-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{selectedLabel ? `Selecionado: ${selectedLabel}` : label}</span>
        <span className="dropdown-arrow" aria-hidden="true">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <ul className="dropdown-menu" role="menu">
          {options.map((option, index) => (
            <li key={index} role="none">
              <button
                type="button"
                role="menuitem"
                className="dropdown-item"
                onClick={() => handleSelectOption(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}