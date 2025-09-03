import { Link } from "react-router-dom"; 

export function Header() {
    return(
        <header className='bg-blue-600 sticky top-0 text-white p-3 shadow-md mb-4'>
           <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    <Link to="/">Desaparecimentos - API Polícia</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-10">
                        <li>
                            <Link to="/" className="hover:text-gray-200 transition-colors duration-200">
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link to="/pesquisa" className="hover:text-gray-200 transition-colors duration-200">
                                Pesquisar
                            </Link>
                        </li>
                    </ul>
                </nav>
           </div>
        </header>
    )
}