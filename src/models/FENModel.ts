import { PieceType } from "../enums/PieceType";
import { CellItem } from "../types/types";

export interface FENModel {
    piecePlacement: CellItem[],
    activePlayer: PieceType,
    castlingRights: string,
    possibleEnPassant: string,
    halfmoveClock: number,
    fullmoveNumber: number
}