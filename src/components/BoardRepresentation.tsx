import { useState } from "react";
import { decipherFEN } from "../helpers/FENHelper";
import "./style.css";
import { CellItem } from "../types/types";
import { FENModel } from "../models/FENModel";
import { PieceType } from "../enums/PieceType";

const BoardRepresentation = () => {
    const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0"
    const [decipheredFen, setDecipheredFen] = useState<FENModel>(decipherFEN(STARTING_FEN));
    
    const [selectedCellIndex, setSelectedCellIndex] = useState<number[]>([-1, -1]);
    const [selectedPieceAvailableMoves, setSelectedPieceAvailableMoves] = useState<number[][]>([]);

    const getCellColor = (row: number, column: number) => {
        if (selectedCellIndex[0] == row && selectedCellIndex[1] == column) {
            return "red";
        }

        return (row + column) % 2 == 0 ? '#ffffff' : '#baca44';
    }

    const isEmptyCell = (cell: CellItem) => cell == undefined;

    const onCellClick = (item: CellItem, row: number, column: number) => {
        if (isEmptyCell(item) || item?.type != decipheredFen.activePlayer) {
            const selectedAvailableMove = selectedPieceAvailableMoves.find(p => p[0] == row && p[1] == column);

            if (!selectedAvailableMove) {
                setSelectedPieceAvailableMoves([]);
            } else {
                move(selectedCellIndex[0], selectedCellIndex[1], row, column);
                setSelectedCellIndex([-1, -1]);
                setSelectedPieceAvailableMoves([]);
            }

            setSelectedCellIndex([-1, -1]);
            return;
        }

        setSelectedPieceAvailableMoves(
            item?.getAvailableMoves(decipheredFen.piecePlacement, row, column)!
        );
        setSelectedCellIndex([row, column]);
    }

    const move = (fromRow: number, fromColumn: number, toRow: number, toColumn: number) => {
        console.log(fromRow, fromColumn, toRow, toColumn);
        const temp = [...decipheredFen.piecePlacement];
        temp[toRow][toColumn] = temp[fromRow][fromColumn];
        temp[fromRow][fromColumn] = undefined;

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
                        item.map((nestedItem, nestedIdx) => {
                            return (
                                <div
                                    key={idx * 8 + nestedIdx}
                                    className="cell"
                                    style={{
                                        backgroundColor: getCellColor(idx, nestedIdx),
                                        cursor: item ? "grab" : "default",                                
                                    }}
                                    onClick={() => {onCellClick(nestedItem, idx, nestedIdx)}}
                                >
                                    <div style={{position: "relative"}}>
                                        {selectedPieceAvailableMoves.some(p => p[0] == idx && p[1] == nestedIdx) && <span className="absolute-center available-move-circle" style={{zIndex: 999}}></span>}
                                        <span className="absolute-center">{nestedItem?.element}</span>
                                    </div>                            
                                </div>
                            )
                        })
                    )                           
                })
            }
        </div>
    )
}

export default BoardRepresentation;