import BoardRepresentation from "../components/BoardRepresentation";

export class Board {
    private FEN: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0";

    private move(previousCell: number, newCell: number) {
        
    }

    public getBoardRepresentation() {
        return (
            <BoardRepresentation FEN={this.FEN} move={this.move}/>
        )
    }
}

export default Board;