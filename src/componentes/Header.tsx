import { FaCompass, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom"; 

export function Header() {
    return(
        <header className='bg-blue-600 fixed w-full top-0 z-20 text-white p-3 shadow-md mb-4'>
           <div className="ml-3 flex flex-col sm:flex-row items-center sm:flex-end justify-between">
                <h1 className="text-2xl font-bold">
                    <Link to="/">Desaparecimentos - API Polícia</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-10 mr-2">
                        <li>
                            <Link to="/" className="hover:text-gray-200 flex flex-row justify-center gap-2 items-center my-auto transition-colors duration-200">
                                <FaHome />
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link to="/explorar" className="hover:text-gray-200 flex flex-row justify-center gap-2 items-center my-auto transition-colors duration-200">
                                <FaCompass />
                                Explorar
                            </Link>
                        </li>
                    </ul>
                </nav>
           </div>
        </header>
    )
}