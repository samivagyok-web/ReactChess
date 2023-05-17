import { Piece } from "../contracts/Piece";
import { PieceType } from "../enums/PieceType";
import { getPieceIllustration, getPieceTypeFromFenCode, isAvailableRule } from "../helpers/FENHelper";
import { CellItem } from "../types/types";

export class Rook implements Piece {
    code: string;
    element: JSX.Element;
    readonly type: PieceType;

    constructor(code: string) {
        this.code = code;
        this.element = getPieceIllustration(code);
        this.type = getPieceTypeFromFenCode(code);
    }    

    getAvailableMoves(pieces: CellItem[][], row: number, column: number): number[][] {
        const availableMoves: number[][] = [];

        const stop = {
            up: false, right: false, down: false, left: false
        };

        for (let i = 1; i < 8; i++) {
            if (!stop.up) {
                const moveLogic = isAvailableRule(pieces, row - i, column, this.type);

                if (moveLogic.move) availableMoves.push(moveLogic.move);
                if (moveLogic.stop) stop.up = true;
            }

            if (!stop.right) {
                const moveLogic = isAvailableRule(pieces, row, column + i, this.type);

                if (moveLogic.move) availableMoves.push(moveLogic.move);
                if (moveLogic.stop) stop.right = true;
            }

            if (!stop.down) {
                const moveLogic = isAvailableRule(pieces, row + i, column, this.type);

                if (moveLogic.move) availableMoves.push(moveLogic.move);
                if (moveLogic.stop) stop.down = true;
            }

            if (!stop.left) {
                const moveLogic = isAvailableRule(pieces, row, column - i, this.type);

                if (moveLogic.move) availableMoves.push(moveLogic.move);
                if (moveLogic.stop) stop.left = true;
            }

            if (stop.up && stop.down && stop.right && stop.left) {
                break;
            }
        }

        return availableMoves;
    }
}