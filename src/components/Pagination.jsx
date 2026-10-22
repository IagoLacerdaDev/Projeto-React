// Recebe totalPages, currentPage e o callback onPageChange via props
export function Pagination({ totalPages, currentPage, onPageChange }) {
  // Cria um array com os números das páginas: [1, 2, 3, ...]
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav className="pagination-nav" aria-label="Navegação de páginas">
      <ul className="pagination-list">
        {/* Botão Página Anterior */}
        <li>
          <button
            type="button"
            className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isFirstPage}
            aria-label="Página anterior"
          >
            « Anterior
          </button>
        </li>

        {/* Botões de páginas específicas */}
        {pages.map((page) => {
          const isCurrent = page === currentPage;
          return (
            <li key={page}>
              <button
                type="button"
                className={`pagination-btn page-number ${isCurrent ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={`Ir para página ${page}`}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Botão Próxima Página */}
        <li>
          <button
            type="button"
            className="pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isLastPage}
            aria-label="Próxima página"
          >
            Próxima »
          </button>
        </li>
      </ul>
    </nav>
  );
}