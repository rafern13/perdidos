
interface PaginacaoProps {
    totalPaginas: number,
    paginaAtual: number,
    onPageChange: (novaPagina: number) => void;
}

export default function Paginacao({totalPaginas, paginaAtual, onPageChange}:  PaginacaoProps) {
    const paginas = Array.from({ length: totalPaginas }, (_, i) => i);

    return (
        <div className="flex justify-center mt-6">
          <nav aria-label="Pagination">
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <button
                  onClick={() => onPageChange(paginaAtual - 1)}
                  disabled={paginaAtual === 0}
                  className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${paginaAtual === 0 ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  Anterior
                </button>
              </li>
              
              {/* {paginas.map((pageNumber) => (
                <li className="w-3/5" key={pageNumber}>
                  <button
                    onClick={() => onPageChange(pageNumber)}
                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${pageNumber === paginaAtual ? "z-10 text-blue-600 bg-blue-50 border-blue-300" : ""}`}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              ))} */}
    
              <li>
                <button
                  onClick={() => onPageChange(paginaAtual + 1)}
                  disabled={paginaAtual === totalPaginas - 1}
                  className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${paginaAtual === totalPaginas - 1 ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  Próxima
                </button>
              </li>
            </ul>
          </nav>
        </div>
      );

}