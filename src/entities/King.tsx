import { Piece } from "../contracts/Piece";
import { PieceType } from "../enums/PieceType";
import { getPieceIllustration, getPieceTypeFromFenCode } from "../helpers/FENHelper";
import { CellItem } from "../types/types";

export class King implements Piece {
    code: string;
    element: JSX.Element;
    type: PieceType;

    constructor(code: string) {
        this.code = code;
        this.element = getPieceIllustration(code);
        this.type = getPieceTypeFromFenCode(code);
    }    
    
    getAvailableMoves(pieces: CellItem[][], row: number, column: number): number[][] {
        // think about checks
        const availableMoves: number[][] = [];

        const possibleMoves = [
            {name: "UP", row: row - 1, column: column, rule: row != 0},
            {name: "UP_RIGHT", row: row - 1, column: column + 1, rule: row != 0 && column != 7},
            {name: "UP_LEFT", row: row - 1, column: column - 1, rule: row != 0 && column != 0},
            {name: "RIGHT", row: row, column: column + 1, rule: column != 7},
            {name: "LEFT", row: row, column: column - 1, rule: column != 0},
            {name: "DOWN", row: row + 1, column: column, rule: row != 7},
            {name: "DOWN_RIGHT", row: row + 1, column: column + 1, rule: row != 7 && column != 7},
            {name: "DOWN_LEFT", row: row + 1, column: column - 1, rule: row != 7 && column != 0},
        ]

        possibleMoves.forEach(move => {
            // moving into checks
            if (move.rule && (!pieces[move.row][move.column] || pieces[move.row][move.column]?.type != this.type)) {
                availableMoves.push([move.row, move.column]);
            }
        });

        return availableMoves;
    }
}