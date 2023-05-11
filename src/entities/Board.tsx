import BoardRepresentation from "../components/BoardRepresentation";

class Board {
    private FEN: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0";

    public getBoardRepresentation() {
        return (
            <BoardRepresentation FEN={this.FEN}/>
        )
    }
}

export default Board;