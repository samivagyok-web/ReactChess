import { Piece } from "../contracts/Piece";
import { PieceType } from "../enums/PieceType";
import { getPieceIllustration, getPieceTypeFromFenCode } from "../helpers/FENHelper";
import { CellItem } from "../types/types";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";

export class Queen implements Piece {
    code: string;
    element: JSX.Element;
    readonly type: PieceType;

    constructor(code: string) {
        this.code = code;
        this.element = getPieceIllustration(code);
        this.type = getPieceTypeFromFenCode(code);
    }    

    getAvailableMoves(pieces: CellItem[][], row: number, column: number): number[][] {
        const tempPieces = this.deepCopyPieces(pieces);

        tempPieces[row][column] = new Bishop(this.code > 'a' && this.code < 'z' ? 'b' : 'B');
        const bishopAvailableMoves = tempPieces[row][column]?.getAvailableMoves(tempPieces, row, column);

        tempPieces[row][column] = new Rook(this.code > 'a' && this.code < 'z' ? 'r' : 'R');
        const rookAvailableMoves = tempPieces[row][column]?.getAvailableMoves(tempPieces, row, column);

        return bishopAvailableMoves?.concat(rookAvailableMoves!)!;
    }

    private deepCopyPieces(pieces: CellItem[][]): CellItem[][] {
        const newPieces: CellItem[][] = [];

        for (let i = 0; i < pieces.length; i++) {
            const tempArr = []

            for (let j = 0; j < pieces[i].length; j++) {
                tempArr.push(pieces[i][j]);
            }

            newPieces.push(tempArr);
        }

        return newPieces;
    }
}