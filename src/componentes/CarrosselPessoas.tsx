import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PessoaCard } from "./CartaoPessoaDesaparecida";
import type { Pessoa } from "../tipos";

interface CarrosselPessoasDesaparecidasProps {
  pessoas: Pessoa[];
}

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 right-4 -translate-y-1/2 z-20 cursor-pointer bg-black/50 rounded-full p-2"
    onClick={onClick}
  >
    <FaChevronRight className="text-white w-5 h-5" />
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 left-[-3.0rem] -translate-y-1/2 z-20 cursor-pointer bg-black/50 rounded-full p-2" // Adicionado `left-4`
    onClick={onClick}
  >
    <FaChevronLeft className="text-white w-5 h-5" />
  </div>
);

export function CarrosselPessoasDesaparecidas({pessoas}: CarrosselPessoasDesaparecidasProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-3 overflow-visible">
      <h2 className="text-3xl font-bold text-center mb-6">
        Pessoas Desaparecidas Recentemente
      </h2>
      <Slider {...settings}>
        {pessoas.map((pessoa) => (
          <div key={pessoa.id} className="p-4">
            <PessoaCard pessoa={pessoa} />
          </div>
        ))}
      </Slider>
    </div>
  );
}