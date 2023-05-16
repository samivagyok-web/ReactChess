import BlackBishop from "../assets/pieces/black/BlackBishop";
import BlackKing from "../assets/pieces/black/BlackKing";
import BlackKnight from "../assets/pieces/black/BlackKnight";
import BlackPawn from "../assets/pieces/black/BlackPawn";
import BlackQueen from "../assets/pieces/black/BlackQueen";
import BlackRook from "../assets/pieces/black/BlackRook";
import WhiteBishop from "../assets/pieces/white/WhiteBishop";
import WhiteKing from "../assets/pieces/white/WhiteKing";
import WhiteKnight from "../assets/pieces/white/WhiteKnight";
import WhitePawn from "../assets/pieces/white/WhitePawn";
import WhiteQueen from "../assets/pieces/white/WhiteQueen";
import WhiteRook from "../assets/pieces/white/WhiteRook";
import { CellItem } from "../types/types";
import { FENModel } from "../models/FENModel";
import { getPieceFromCode } from "./PieceStrategy";
import { PieceType } from "../enums/PieceType";
import { PieceEdge } from "../models/PieceEdgeModel";

export const getPieceIllustration = (character: string): JSX.Element => {
    switch (character) {
        case 'r': return <BlackRook/>
        case 'n': return <BlackKnight/>
        case 'b': return <BlackBishop/>
        case 'q': return <BlackQueen/>
        case 'k': return <BlackKing/>            
        case 'p': return <BlackPawn/>
        case 'P': return <WhitePawn/>
        case 'K': return <WhiteKing/>
        case 'Q': return <WhiteQueen/>
        case 'B': return <WhiteBishop/>
        case 'N': return <WhiteKnight/>
        case 'R': return <WhiteRook/>
        default: return <></>
    }
}

export const getPieceEdgeLogic = (row: number, column: number): PieceEdge => {
    return {
        isOnRightEdge: column == 7,
        isOnLeftEdge: column == 0,
        isOnTopEdge: row == 0,
        isOnBottomEdge: row == 7
    }
}

export const getPieceTypeFromFenCode = (code: string): PieceType => {
    if (code >= 'a' && code <= 'z') {
        return PieceType.Black;
    }

    return PieceType.White;
}

export const decipherFEN = (FEN: string): FENModel => {
    const splitFEN = FEN.split(" ");
    const sanitizedPiecePlacement = splitFEN[0].replaceAll('/', '');
    
    let flattenedPiecePlacement: CellItem[] = [];

    for (let i = 0; i < sanitizedPiecePlacement.length; i++) {
        if (sanitizedPiecePlacement[i] > '0' && sanitizedPiecePlacement[i] < '9') {
            const numericValue = parseInt(sanitizedPiecePlacement[i]);

            for (let j = 0; j < numericValue; j++) {
                flattenedPiecePlacement.push(undefined);
            }

            continue;
        }

        flattenedPiecePlacement.push(getPieceFromCode(sanitizedPiecePlacement[i]));
    }

    return {
        piecePlacement: oneDimensionToTwo(flattenedPiecePlacement),
        activePlayer: splitFEN[1] == 'w' ? PieceType.White : PieceType.Black,
        castlingRights: splitFEN[2],
        possibleEnPassant: splitFEN[3],
        halfmoveClock: parseInt(splitFEN[4]),
        fullmoveNumber: parseInt(splitFEN[5])
    }
}

const oneDimensionToTwo = (list: CellItem[]) => {
    var matrix: CellItem[][] = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % 8 === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}