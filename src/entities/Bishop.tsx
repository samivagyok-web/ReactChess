import { Piece } from "../contracts/Piece";
import { PieceType } from "../enums/PieceType";
import { getPieceIllustration, getPieceTypeFromFenCode, isAvailableRule } from "../helpers/FENHelper";
import { CellItem } from "../types/types";

export class Bishop implements Piece {
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

        const stop = {
            leftUp: false, rightUp: false, rightDown: false, leftDown: false
        }

        for (let i = 1; i < 8; i++) {
            if (!stop.leftUp) {
                const moveLogic = isAvailableRule(pieces, row - i, column - i, this.type);

                if (moveLogic.move) {
                    availableMoves.push(moveLogic.move);
                }

                if (moveLogic.stop) {
                    stop.leftUp = true;
                }
            }

            if (!stop.rightUp) {
                const moveLogic = isAvailableRule(pieces, row - i, column + i, this.type);

                if (moveLogic.move) {
                    availableMoves.push(moveLogic.move);
                }

                if (moveLogic.stop) {
                    stop.rightUp = true;
                }
            }

            if (!stop.rightDown) {
                const moveLogic = isAvailableRule(pieces, row + i, column + i, this.type);

                if (moveLogic.move) {
                    availableMoves.push(moveLogic.move);
                }

                if (moveLogic.stop) {
                    stop.rightDown = true;
                }
            }

            if (!stop.leftDown) {
                const moveLogic = isAvailableRule(pieces, row + i, column - i, this.type);

                if (moveLogic.move) {
                    availableMoves.push(moveLogic.move);
                }

                if (moveLogic.stop) {
                    stop.leftDown = true;
                }
            }
            
            if (stop.leftUp && stop.rightUp && stop.rightDown && stop.leftDown) {
                break;
            }
        }

        return availableMoves;
    }    
}