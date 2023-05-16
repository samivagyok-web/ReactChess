import { Piece } from "../contracts/Piece";
import { PieceType } from "../enums/PieceType";
import { getPieceIllustration, getPieceTypeFromFenCode } from "../helpers/FENHelper";
import { CellItem } from "../types/types";

export class Knight implements Piece {
    code: string;
    element: JSX.Element;
    readonly type: PieceType;

    constructor(code: string) {
        this.code = code;
        this.element = getPieceIllustration(code);
        this.type = getPieceTypeFromFenCode(code);
    }    

    getAvailableMoves(pieces: CellItem[][], row: number, column: number) : number[][] {
        const availableMoves: number[][] = [];
        
        // const possibleMoves = [
        //     {name: 'UP_RIGHT', moveTo: pieceIndex - 15, rule: (pieceIndex + 1) % 8 != 0 == pieceIndex > 15},
        //     {name: 'UP_LEFT', moveTo: pieceIndex - 17, rule: pieceIndex % 8 != 0 && pieceIndex > 15},
        //     {name: 'RIGHT_UP', moveTo: pieceIndex - 6, rule: (pieceIndex + 1) % 8 != 0 && (pieceIndex + 2) % 8 != 0 },
        //     {name: 'RIGHT_DOWN', moveTo: pieceIndex + 10, rule: true},
        //     {name: 'LEFT_UP', moveTo: pieceIndex - 10, rule: true},
        //     {name: 'LEFT_DOWN', moveTo: pieceIndex + 6, rule: true},
        //     {name: 'DOWN_RIGHT', moveTo: pieceIndex + 17, rule: true},
        //     {name: 'DOWN_LEFT', moveTo: pieceIndex + 15, rule: true}
        // ]

        // possibleMoves.forEach(element => {
        //     if (element.rule && (!pieces[element.moveTo] || pieces[element.moveTo]?.type != this.type)) {
        //         availableMoves.push(element.moveTo)
        //     }
        // });

        return availableMoves;
    }
}