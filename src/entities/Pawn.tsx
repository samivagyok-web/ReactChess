import { Piece } from "../contracts/Piece";
import { getPieceIllustration } from "../helpers/FENHelper";
import { CellItem } from "../types/types";

export class Pawn implements Piece {
    code: string;
    element: JSX.Element;

    constructor(code: string) {
        this.code = code;
        this.element = getPieceIllustration(code);
    }    
    
    getAvailableMoves(pieces: CellItem[], pieceIndex: number): number[] {
        return [];
    }
}