export interface Piece {
    code: string;
    element: JSX.Element;
    getAvailableMoves: (fen: string, pieceIndex: number) => number[];
}