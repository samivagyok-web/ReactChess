import { Piece } from "../contracts/Piece";
import { PieceType } from "../enums/PieceType";
import { getPieceIllustration, getPieceTypeFromFenCode } from "../helpers/FENHelper";
import { CellItem } from "../types/types";

export class Knight implements Piece {
    code: string;
    element: JSX.Element;
    readonly type: PieceType;

    constructor(code: string) {
        this.code = code;
        this.element = getPieceIllustration(code);
        this.type = getPieceTypeFromFenCode(code);
    }    

    getAvailableMoves(pieces: CellItem[][], row: number, column: number) : number[][] {
        // KEEP IN MIND CHECKS, BEING PINNED
        const availableMoves: number[][] = [];
        
        const possibleMoves = [
            {name: 'UP_RIGHT', row: row - 2, column: column + 1, rule: row > 1 && column < 7},
            {name: 'UP_LEFT', row: row - 2, column: column - 1, rule: row > 1 && column > 0},
            {name: 'RIGHT_UP', row: row + 1, column: column + 2, rule: row < 7 && column < 6},
            {name: 'RIGHT_DOWN', row: row - 1, column: column + 2, rule: row > 0 && column < 6},
            {name: 'LEFT_UP', row: row - 1, column: column - 2, rule: row > 0 && column > 1},
            {name: 'LEFT_DOWN', row: row + 1, column: column - 2, rule: row < 7 && column > 1},
            {name: 'DOWN_RIGHT', row: row + 2, column: column + 1, rule: row < 6 && column < 7},
            {name: 'DOWN_LEFT', row: row + 2, column: column - 1, rule: row < 6 && column > 0}
        ]
        
        possibleMoves.forEach(move => {            
            if (move.rule && (!pieces[move.row][move.column] || pieces[move.row][move.column]?.type != this.type)) {
                availableMoves.push([move.row, move.column])
            }
        });

        return availableMoves;
    }
}