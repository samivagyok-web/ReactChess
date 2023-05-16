import { Piece } from "../contracts/Piece";
import { PieceType } from "../enums/PieceType";
import { getPieceIllustration, getPieceTypeFromFenCode } from "../helpers/FENHelper";
import { CellItem } from "../types/types";

export class Queen implements Piece {
    code: string;
    element: JSX.Element;
    readonly type: PieceType;

    constructor(code: string) {
        this.code = code;
        this.element = getPieceIllustration(code);
        this.type = getPieceTypeFromFenCode(code);
    }    

    getAvailableMoves(pieces: CellItem[], pieceIndex: number): number[] {
        return [];
    }
}