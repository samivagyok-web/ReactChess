import { useState } from "react";
import { decipherFEN } from "../helpers/FENHelper";
import "./style.css";
import { CellItem } from "../types/types";
import { FENModel } from "../models/FENModel";
import { PieceType } from "../enums/PieceType";

const BoardRepresentation = () => {
    const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0"
    const [decipheredFen, setDecipheredFen] = useState<FENModel>(decipherFEN(STARTING_FEN));
    
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

    const isEmptyCell = (cell: CellItem) => cell == undefined;

    const onCellClick = (item: CellItem, cellIndex: number) => {
        if (isEmptyCell(item) || item?.type != decipheredFen.activePlayer) {
            const selectedAvailableMove = selectedPieceAvailableMoves.find(p => p == cellIndex); 

            if (!selectedAvailableMove) {
                setSelectedPieceAvailableMoves([]);
            } else {
                move(selectedCellIndex, cellIndex);
                setSelectedCellIndex(-1);
                setSelectedPieceAvailableMoves([]);
            }

            setSelectedCellIndex(-1);
            return;
        }

        setSelectedPieceAvailableMoves(
            item?.getAvailableMoves(decipheredFen.piecePlacement, cellIndex)!
        );
        setSelectedCellIndex(cellIndex);
    }

    const move = (fromIndex: number, toIndex: number) => {
        const temp = [...decipheredFen.piecePlacement];
        temp[toIndex] = temp[fromIndex];
        temp[fromIndex] = undefined;

        setDecipheredFen({
            ...decipheredFen,
            piecePlacement: temp,
            activePlayer: decipheredFen.activePlayer == PieceType.White ? PieceType.Black : PieceType.White
        })
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