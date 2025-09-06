import { useEffect, useState } from "react";

type Props = {
    mensagem: string;
    erro: boolean;
    setMensagemReq: (mensagem: string) => void;
}

const ERRO_COLOR = "bg-red-600";
const OK_COLOR = "bg-[#00cf66]";

export default function MensagemPopUp({ mensagem, erro, setMensagemReq }: Props) {
    const [isShowing, setIsShowing] = useState(false);

    const cor = erro ? ERRO_COLOR : OK_COLOR;

    useEffect(() => {
        if (mensagem) {
            setIsShowing(true);

            const fadeOutTimer = setTimeout(() => {
                console.log("Fading out error message");
                setIsShowing(false);
            }, 2500);

            const clearErrorTimer = setTimeout(() => {
                console.log("Clearing error message");
                setMensagemReq("");
            }, 3000);

            return () => {
                clearTimeout(fadeOutTimer);
                clearTimeout(clearErrorTimer);
            };
        }
    }, [mensagem, setMensagemReq]);

    if (!mensagem) {
        return null;
    }

    return (
        <div
            className={`fixed flex justify-center gap-3 items-center top-0 right-0 rounded-lg p-4 z-50
                      ${cor} text-white font-semibold shadow-lg mr-2 mt-2
                      transition-all duration-1000 ease-in-out
                      ${isShowing ? "opacity-100 translate-x-0" : "opacity-0 translate-x-100"}`}
        >
            <p>{mensagem}</p>
            <button className="text-xl text-white p-3" onClick={() => {
                setIsShowing(false);
                setTimeout(() => setMensagemReq(""), 500);
            }}>
                <p className="text-white/40 hover:text-white transition-colors duration-200 cursor-pointer">
                    X
                </p>
            </button>
        </div>
    );
}
