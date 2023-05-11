import { decipherFEN, getPieceIllustration } from "../helpers/FENHelper";
import "./style.css";

interface Props {
    FEN: string
}

const BoardRepresentation = ({ FEN }: Props) => {
    const decipheredFen = decipherFEN(FEN);

    const getCellColor = (idx: number) => {
        const modulo = idx % 8;
        const division = Math.floor(idx / 8);

        return (modulo + division) % 2 == 0 ? '#ffffff' : '#baca44';
    }

    return (
        <div className="wrapper">
            {
                [...decipheredFen.piecePlacement].map((item, idx) => {
                    return (
                        <div
                            key={idx}
                            className="cell"
                            style={{backgroundColor: getCellColor(idx)}}
                        >
                            {getPieceIllustration(item)}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BoardRepresentation;