import { PieceType } from "../enums/PieceType";
import { CellItem } from "../types/types";

export interface Piece {
    code: string;
    element: JSX.Element;
    readonly type: PieceType;
    getAvailableMoves: (pieces: CellItem[], pieceIndex: number) => number[];
}