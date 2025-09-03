import { Header } from "../componentes/Header";

export default function Component() {
    const arrayTop = [1,2,3,4,5,6,7,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,0];
    
    return (
        <div>
            <Header />
            {arrayTop.map((i) => (
                <p className="mb-2" key={i}>{i}</p>
            ))}
            {arrayTop.map((i) => (
                <p className="mb-2" key={i}>{i}</p>
            ))}
        </div>
    )
}