import { Piece } from "../contracts/Piece";
import { PieceType } from "../enums/PieceType";
import { getPieceEdgeLogic, getPieceIllustration, getPieceTypeFromFenCode } from "../helpers/FENHelper";
import { PieceEdge } from "../models/PieceEdgeModel";
import { CellItem } from "../types/types";

export class Pawn implements Piece {
    code: string;
    element: JSX.Element;
    readonly type: PieceType;

    constructor(code: string) {
        this.code = code;
        this.element = getPieceIllustration(code);
        this.type = getPieceTypeFromFenCode(code);        
    }

    getAvailableMoves(pieces: CellItem[][], row: number, column: number): number[][] {
        // KEEP IN MIND: PROMOTING, EN PASSANT, CHECK
        
        if (this.type == PieceType.White) {
            return this.getAvailableMovesWhite(pieces, row, column);
        }

        return this.getAvailableMovesBlack(pieces, row, column);
    }

    private getAvailableMovesWhite(pieces: CellItem[][], row: number, column: number): number[][] {
        const edgeLogic: PieceEdge = getPieceEdgeLogic(row, column);

        const availableMoves = [];

        const AHEAD_ONE = [row - 1, column];
        const AHEAD_TWO = [row - 2, column];
        const AHEAD_ONE_LEFT_TAKE = [row - 1, column - 1];
        const AHEAD_ONE_RIGHT_TAKE = [row - 1, column + 1]
    
        if (!pieces[AHEAD_ONE[0]][AHEAD_ONE[1]]) {
            availableMoves.push(AHEAD_ONE);
        }

        if (row == 6 && !pieces[AHEAD_ONE[0]][AHEAD_ONE[1]] && !pieces[AHEAD_TWO[0]][AHEAD_TWO[1]]) {
            availableMoves.push(AHEAD_TWO);
        }

        if (pieces[AHEAD_ONE_LEFT_TAKE[0]][AHEAD_ONE_LEFT_TAKE[1]] && !edgeLogic.isOnLeftEdge) {
            availableMoves.push(AHEAD_ONE_LEFT_TAKE);
        }

        if (pieces[AHEAD_ONE_RIGHT_TAKE[0]][AHEAD_ONE_RIGHT_TAKE[1]] && !edgeLogic.isOnRightEdge) {
            availableMoves.push(AHEAD_ONE_RIGHT_TAKE);
        }

        return availableMoves;
    }

    private getAvailableMovesBlack(pieces: CellItem[][], row: number, column: number): number[][] {
        const edgeLogic: PieceEdge = getPieceEdgeLogic(row, column);

        const availableMoves = [];

        const AHEAD_ONE = [row + 1, column];
        const AHEAD_TWO = [row + 2, column];
        const AHEAD_ONE_LEFT_TAKE = [row + 1, column - 1];
        const AHEAD_ONE_RIGHT_TAKE = [row + 1, column + 1];

        if (!pieces[AHEAD_ONE[0]][AHEAD_ONE[1]]) {
            availableMoves.push(AHEAD_ONE);
        }

        if (row == 1 && !pieces[AHEAD_ONE[0]][AHEAD_ONE[1]] && !pieces[AHEAD_TWO[0]][AHEAD_TWO[1]]) {
            availableMoves.push(AHEAD_TWO);
        }

        if (pieces[AHEAD_ONE_LEFT_TAKE[0]][AHEAD_ONE_LEFT_TAKE[1]] && !edgeLogic.isOnLeftEdge) {
            availableMoves.push(AHEAD_ONE_LEFT_TAKE);
        }

        if (pieces[AHEAD_ONE_RIGHT_TAKE[0]][AHEAD_ONE_RIGHT_TAKE[1]] && !edgeLogic.isOnRightEdge) {
            availableMoves.push(AHEAD_ONE_RIGHT_TAKE);
        }

        return availableMoves;
    }
}