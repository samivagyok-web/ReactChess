import { CellItem } from "../types/types";

export interface Piece {
    code: string;
    element: JSX.Element;
    getAvailableMoves: (pieces: CellItem[], pieceIndex: number) => number[];    
}