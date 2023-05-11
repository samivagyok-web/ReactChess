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
import { FENModel } from "./FENModel";

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

export const decipherFEN = (FEN: string): FENModel => {
    const splitFEN = FEN.split(" ");
    const sanitizedPiecePlacement = splitFEN[0].replaceAll('/', '');
    
    let piecePlacement: string = '';

    for (let i = 0; i < sanitizedPiecePlacement.length; i++) {
        if (sanitizedPiecePlacement[i] > '0' && sanitizedPiecePlacement[i] < '9') {
            const numericValue = parseInt(sanitizedPiecePlacement[i]);

            for (let j = 0; j < numericValue; j++) {
                piecePlacement = piecePlacement + " ";
            }

            continue;
        }

        piecePlacement = piecePlacement + sanitizedPiecePlacement[i];
    }

    return {
        piecePlacement: piecePlacement,
        activePlayer: splitFEN[1],
        castlingRights: splitFEN[2],
        possibleEnPassant: splitFEN[3],
        halfmoveClock: parseInt(splitFEN[4]),
        fullmoveNumber: parseInt(splitFEN[5])
    }
}