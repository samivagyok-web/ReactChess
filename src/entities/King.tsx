import { Piece } from "../contracts/Piece";
import { getPieceIllustration } from "../helpers/FENHelper";

export class King implements Piece {
    code: string;
    element: JSX.Element;

    constructor(code: string) {
        this.code = code;
        this.element = getPieceIllustration(code);
    }    
    
    getAvailableMoves(fen: string, pieceIndex: number): number[] {
        return [];
    }
}