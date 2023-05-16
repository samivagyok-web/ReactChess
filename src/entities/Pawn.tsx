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

    getAvailableMoves(pieces: CellItem[], pieceIndex: number): number[] {
        // KEEP IN MIND: PROMOTING, EN PASSANT, CHECK
        
        if (this.type == PieceType.White) {
            return this.getAvailableMovesWhite(pieces, pieceIndex);
        }

        return this.getAvailableMovesBlack(pieces, pieceIndex);
    }

    private getAvailableMovesWhite(pieces: CellItem[], pieceIndex: number): number[] {
        const edgeLogic: PieceEdge = getPieceEdgeLogic(pieceIndex);

        const availableMoves = [];

        const AHEAD_ONE_INDEX = pieceIndex - 8;
        const AHEAD_TWO_INDEX = pieceIndex - 16;
        const AHEAD_ONE_LEFT_TAKE = pieceIndex - 9;
        const AHEAD_ONE_RIGHT_TAKE = pieceIndex - 7;
    
        if (!pieces[AHEAD_ONE_INDEX]) {
            availableMoves.push(AHEAD_ONE_INDEX);
        }

        if ((pieceIndex >= 48 && pieceIndex < 56) && !pieces[AHEAD_ONE_INDEX] && !pieces[AHEAD_TWO_INDEX]) {
            availableMoves.push(AHEAD_TWO_INDEX);
        }

        if (pieces[AHEAD_ONE_LEFT_TAKE] && !edgeLogic.isOnLeftEdge) {
            availableMoves.push(AHEAD_ONE_LEFT_TAKE);
        }

        if (pieces[AHEAD_ONE_RIGHT_TAKE] && !edgeLogic.isOnRightEdge) {
            availableMoves.push(AHEAD_ONE_RIGHT_TAKE);
        }

        return availableMoves;
    }

    private getAvailableMovesBlack(pieces: CellItem[], pieceIndex: number): number[] {
        const edgeLogic: PieceEdge = getPieceEdgeLogic(pieceIndex);

        const availableMoves = [];

        const AHEAD_ONE_INDEX = pieceIndex + 8;
        const AHEAD_TWO_INDEX = pieceIndex + 16;
        const AHEAD_ONE_LEFT_TAKE = pieceIndex + 7;
        const AHEAD_ONE_RIGHT_TAKE = pieceIndex + 9;

        if (!pieces[AHEAD_ONE_INDEX]) {
            availableMoves.push(AHEAD_ONE_INDEX);
        }

        if ((pieceIndex >= 8 && pieceIndex < 16) && !pieces[AHEAD_ONE_INDEX] && !pieces[AHEAD_TWO_INDEX]) {
            availableMoves.push(AHEAD_TWO_INDEX);
        }

        if (pieces[AHEAD_ONE_LEFT_TAKE] && !edgeLogic.isOnLeftEdge) {
            availableMoves.push(AHEAD_ONE_LEFT_TAKE);
        }

        if (pieces[AHEAD_ONE_RIGHT_TAKE] && !edgeLogic.isOnRightEdge) {
            availableMoves.push(AHEAD_ONE_RIGHT_TAKE);
        }

        return availableMoves;
    }
}