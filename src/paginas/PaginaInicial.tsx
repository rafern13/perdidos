import { useState } from "react";
import { Header } from "../componentes/Header";
import { NumberInput } from "../componentes/NumberInput";
import { PessoaCard } from "../componentes/CartaoPessoaDesaparecida";
import { CarrosselPessoasDesaparecidas } from "../componentes/CarrosselPessoas";

export default function Component() {
    const [contador, setContador] = useState<number>(0);

    return (
        <div>
            <Header />
            <NumberInput 
              label=""
              value=""
              onChange={() => {
                setContador(contador + 1)
              }}
            
            />
            <p>{contador}</p>     
            <PessoaCard 
              pessoa={{
                id: 1,
                nome: "João Silva",
                idade: 30,
                vivo: false,
                urlFoto: "",
                ultimaOcorrencia: {
                  dtDesaparecimento: "2023-10-01",
                  localDesaparecimentoConcat: "São Paulo, SP",
                },
              }}
            />       

            <CarrosselPessoasDesaparecidas
              pessoas={[
                {
                  id: 1,
                  nome: "João Silva",
                  idade: 30,
                  vivo: false,
                  urlFoto: "",
                  ultimaOcorrencia: {
                    dtDesaparecimento: "2023-10-01",
                    localDesaparecimentoConcat: "São Paulo, SP",
                  },
                },
                {
                  id: 2,
                  nome: "Maria Souza",
                  idade: 25,
                  vivo: true,
                  urlFoto: "",
                  ultimaOcorrencia: {
                    dtDesaparecimento: "2023-09-15",
                    localDesaparecimentoConcat: "Rio de Janeiro, RJ",
                  },
                },
                {
                  id: 3,
                  nome: "Carlos Pereira",
                  idade: 40,
                  vivo: false,
                  urlFoto: "",
                  ultimaOcorrencia: {
                    dtDesaparecimento: "2023-08-20",
                    localDesaparecimentoConcat: "Belo Horizonte, MG",
                  },
                },
                {
                  id: 4,
                  nome: "Ana Lima",
                  idade: 28,
                  vivo: true,
                  urlFoto: "",
                  ultimaOcorrencia: {
                    dtDesaparecimento: "2023-07-30",
                    localDesaparecimentoConcat: "Curitiba, PR",
                  },
                },
              ]}
            />

        </div>
    )
}