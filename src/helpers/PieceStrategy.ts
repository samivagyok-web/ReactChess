import { Bishop } from "../entities/Bishop";
import { King } from "../entities/King";
import { Knight } from "../entities/Knight";
import { Pawn } from "../entities/Pawn";
import { Queen } from "../entities/Queen";
import { Rook } from "../entities/Rook";
import { CellItem } from "../types/types";

export const getPieceFromCode = (code: string): CellItem => {
    const loweredCode = code.toLowerCase();

    switch (loweredCode) {
        case 'r': return new Rook(code);
        case 'n': return new Knight(code);
        case 'b': return new Bishop(code);
        case 'k': return new King(code);
        case 'q': return new Queen(code);
        case 'p': return new Pawn(code);
        default: return undefined;
    }

}