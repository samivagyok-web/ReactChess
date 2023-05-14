import { useState } from "react";
import { decipherFEN } from "../helpers/FENHelper";
import "./style.css";

interface Props {
    FEN: string
}

const BoardRepresentation = ({ FEN }: Props) => {
    const decipheredFen = decipherFEN(FEN);
    const [selectedCellIndex, setSelectedCellIndex] = useState<number>(-1);

    const getCellColor = (idx: number) => {
        if (idx == selectedCellIndex) {
            return "red";
        }

        const modulo = idx % 8;
        const division = Math.floor(idx / 8);

        return (modulo + division) % 2 == 0 ? '#ffffff' : '#baca44';
    }

    const onCellClick = (idx: number) => {
        
    }

    const move = () => {

    }

    return (
        <div className="wrapper">
            {
                ...decipheredFen.piecePlacement.map((item, idx) => {
                    return (
                        <div
                            key={idx}
                            className="cell"
                            style={{
                                backgroundColor: getCellColor(idx),
                                cursor: item ? "grab" : "default",                                
                            }}
                            onClick={() => {onCellClick(idx)}}
                        >
                            {item?.element}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BoardRepresentation;