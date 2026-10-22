import { useState, useEffect } from 'react';
import './App.css';
import { ToastProvider, useToast } from './context/ToastContext';
import { Tabs } from './components/Tabs';
import { Accordion } from './components/Accordion';
import { ProgressBar } from './components/ProgressBar';
import { Pagination } from './components/Pagination';
import { Dropdown } from './components/Dropdown';
import { Footer } from './components/Footer';

const TABS_MOCK = [
  {
    title: 'Visão Geral',
    content: 'Esta aplicação reúne os 6 componentes visuais obrigatórios em React.js usando Hooks, Props, HTML5 semântico e atributos ARIA.'
  },
  {
    title: 'Responsividade',
    content: 'O layout utiliza CSS Grid e Flexbox com Media Queries para se adaptar a Smartphones (1 coluna), Tablets e Desktops (2 colunas).'
  },
  {
    title: 'Desafio Extra (+0,2)',
    content: 'O estado global foi implementado com a Context API (ToastContext), compartilhando notificações entre componentes.'
  }
];

const ACCORDION_MOCK = [
  {
    title: '1. O que são Props no React?',
    content: 'Props são propriedades passadas de um componente pai para um filho, tornando os componentes dinâmicos e reutilizáveis.'
  },
  {
    title: '2. Como o Menu Suspenso fecha ao clicar fora?',
    content: 'Utilizamos os hooks useRef e useEffect para escutar cliques no documento e fechar o menu caso o clique ocorra fora dele.'
  },
  {
    title: '3. Como funciona a Paginação?',
    content: 'O componente recebe o total de páginas e a página atual via props, desabilitando os botões Anterior/Próxima nos limites.'
  }
];

const COURSES_MOCK = [
  { id: 1, name: 'Arquitetura de Componentes React', tag: 'Módulo 1' },
  { id: 2, name: 'Gerenciamento de Estado com Hooks', tag: 'Módulo 1' },
  { id: 3, name: 'Context API e Estado Global', tag: 'Módulo 2' },
  { id: 4, name: 'Acessibilidade Web (WAI-ARIA)', tag: 'Módulo 2' },
  { id: 5, name: 'Design Responsivo e Mobile-First', tag: 'Módulo 3' },
  { id: 6, name: 'Testes Automatizados e Qualidade', tag: 'Módulo 3' }
];

function DashboardContent() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ucsal-theme') || 'dark';
  });

  const [progress, setProgress] = useState(40);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToast } = useToast();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ucsal-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    addToast(
      `Tema alterado para ${nextTheme === 'light' ? 'Modo Claro ☀️' : 'Modo Escuro 🌙'}`,
      'info'
    );
  };

  const itemsPerPage = 2;
  const totalPages = Math.ceil(COURSES_MOCK.length / itemsPerPage);
  const currentItems = COURSES_MOCK.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleProgressChange = (newValue) => {
    const clamped = Math.min(100, Math.max(0, newValue));
    setProgress(clamped);
    if (clamped === 100) {
      addToast('Progresso concluído em 100%!', 'success');
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    addToast(`Navegou para a página ${newPage}`, 'info');
  };

  const dropdownOptions = [
    {
      label: 'Exportar Relatório em PDF',
      onClick: () => addToast('Relatório exportado com sucesso!', 'success')
    },
    {
      label: 'Sincronizar com GitHub Codespaces',
      onClick: () => addToast('Sincronizando ambiente na nuvem...', 'info')
    },
    {
      label: 'Simular Falha de Conexão',
      onClick: () => addToast('Erro ao conectar ao servidor externo.', 'error')
    }
  ];

  return (
    <div className="app-container">
      <header className="top-navbar">
        <div className="navbar-brand">
          <h1>Atividade React.js — UCSAL</h1>
          <p>6 Componentes • Hooks • Acessibilidade ARIA • Context API Global</p>
        </div>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={handleToggleTheme}
          aria-label={`Alternar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
          aria-pressed={theme === 'light'}
        >
          <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}</span>
        </button>
      </header>

      <main className="components-grid">
        <section className="component-card" aria-labelledby="sec-tabs">
          <h2 id="sec-tabs">1. Abas (Tabs)</h2>
          <Tabs tabsData={TABS_MOCK} />
        </section>

        <section className="component-card" aria-labelledby="sec-acc">
          <h2 id="sec-acc">2. Acordeão (Accordion - FAQ)</h2>
          <Accordion items={ACCORDION_MOCK} />
        </section>

        <section className="component-card" aria-labelledby="sec-prog">
          <h2 id="sec-prog">3. Barra de Progresso (Progress Bar)</h2>
          <ProgressBar value={progress} label="Upload do Repositório" />
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => handleProgressChange(progress - 20)}
            >
              - 20%
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => handleProgressChange(progress + 20)}
            >
              + 20%
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => handleProgressChange(100)}
            >
              Concluir (100%)
            </button>
          </div>
        </section>

        <section className="component-card" aria-labelledby="sec-toast">
          <h2 id="sec-toast">4. Notificação Toast (Context API)</h2>
          <p>Dispare notificações globais temporárias (fecham em 4s):</p>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => addToast('Operação salva com sucesso!', 'success')}
            >
              Toast Sucesso
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={() => addToast('Erro ao validar formulário.', 'error')}
            >
              Toast Erro
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => addToast('Informação atualizada no painel.', 'info')}
            >
              Toast Info
            </button>
          </div>
        </section>

        {/* 5. Paginação */}
        <section className="component-card" aria-labelledby="sec-pag">
          <h2 id="sec-pag">5. Paginação (Pagination)</h2>
          <ul className="paginated-list">
            {currentItems.map((item) => (
              <li key={item.id} className="paginated-item">
                <span>{item.name}</span>
                <span className="badge">{item.tag}</span>
              </li>
            ))}
          </ul>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </section>

        <section className="component-card" aria-labelledby="sec-drop">
          <h2 id="sec-drop">6. Menu Suspenso (Dropdown Menu)</h2>
          <p>Selecione uma ação (fecha ao escolher ou ao clicar fora):</p>
          <Dropdown
            label="Escolha uma ação do sistema"
            options={dropdownOptions}
          />
        </section>
      </main>

      <Footer
        studentName="Iago César Lacerda Santos"
        registration="200028764"
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
}