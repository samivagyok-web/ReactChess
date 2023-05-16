import { CellItem } from "../types/types";

export interface FENModel {
    piecePlacement: CellItem[],
    activePlayer: string,
    castlingRights: string,
    possibleEnPassant: string,
    halfmoveClock: number,
    fullmoveNumber: number
}