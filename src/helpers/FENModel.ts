export interface FENModel {
    piecePlacement: string,
    activePlayer: string,
    castlingRights: string,
    possibleEnPassant: string,
    halfmoveClock: number,
    fullmoveNumber: number
}