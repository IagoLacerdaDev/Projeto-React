export function Footer({ studentName, registration, course = 'Engenharia de Software', professor = 'Elton Figueiredo da Silva' }) {
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-content">
        <p className="footer-credits">
          Desenvolvimento realizado por <strong>{studentName}</strong> • Matrícula: <strong>{registration}</strong>
        </p>
        <p className="footer-academic">
          Universidade Católica do Salvador (UCSAL) — {course} • Prof. {professor}
        </p>
        <p className="ano-realizacao">
            2026
        </p>
      </div>
    </footer>
  );
}