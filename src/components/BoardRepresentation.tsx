import { useState } from "react";
import { decipherFEN } from "../helpers/FENHelper";
import "./style.css";
import { CellItem } from "../types/types";

interface Props {
    FEN: string;
    move: (previousCell: number, newCell: number) => void
}

const BoardRepresentation = ({ FEN }: Props) => {
    const decipheredFen = decipherFEN(FEN);
    
    const [selectedCellIndex, setSelectedCellIndex] = useState<number>(-1);
    const [selectedPieceAvailableMoves, setSelectedPieceAvailableMoves] = useState<number[]>([]);

    const getCellColor = (idx: number) => {
        if (idx == selectedCellIndex) {
            return "red";
        }

        const modulo = idx % 8;
        const division = Math.floor(idx / 8);

        return (modulo + division) % 2 == 0 ? '#ffffff' : '#baca44';
    }

    const onCellClick = (item: CellItem, cellIndex: number) => {
        if (!item) {
            const selectedAvailableMove = selectedPieceAvailableMoves.find(p => p == cellIndex); 

            if (!selectedAvailableMove) {
                setSelectedPieceAvailableMoves([]);
            } else {
                move(selectedCellIndex, cellIndex);
            }

            // if there was already a piece selected try to move, or remove available moves
            return;
        }

        setSelectedPieceAvailableMoves(
            item?.getAvailableMoves(decipheredFen.piecePlacement, cellIndex)!
        );
        setSelectedCellIndex(cellIndex);
    }

    const move = (fromIndex: number, toIndex: number) => {
        console.log(fromIndex, toIndex);
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
                            onClick={() => {onCellClick(item, idx)}}
                        >
                            <div style={{position: "relative"}}>
                                {selectedPieceAvailableMoves.some(p => p == idx) && <span className="absolute-center available-move-circle" style={{zIndex: 999}}></span>}
                                <span className="absolute-center">{item?.element}</span>
                            </div>                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BoardRepresentation;