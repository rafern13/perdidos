
interface PaginacaoProps {
    totalPaginas: number,
    paginaAtual: number,
    onPageChange: (novaPagina: number) => void;
}

export default function Paginacao({totalPaginas, paginaAtual, onPageChange}:  PaginacaoProps) {
    return (
        <div className="flex justify-center mt-6">
          <nav aria-label="Pagination">
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <button
                  onClick={() => onPageChange(paginaAtual - 1)}
                  disabled={paginaAtual === 0}
                  className={`px-3 py-2 leading-tight text-gray-700 bg-white border border-gray-500 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${paginaAtual === 0 ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  Anterior
                </button>
              </li>
            
              <li>
                <button
                  onClick={() => onPageChange(paginaAtual + 1)}
                  disabled={paginaAtual === totalPaginas - 1}
                  className={`px-3 py-2 leading-tight text-gray-700 bg-white border border-gray-500 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${paginaAtual === totalPaginas - 1 ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  Próxima
                </button>
              </li>
            </ul>
          </nav>
        </div>
      );

}