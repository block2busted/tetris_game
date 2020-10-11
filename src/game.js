export default class Game {
    lines = 0;
    scores = 0;
    level = 0;
    playfield = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    activePiece = {
        x: 0,
        y: 0,
        blocks: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]
    };

    movePieceLeft() {
        this.activePiece.x -=1;

        if (this.isPieceOutOfBounds()) {
            this.activePiece.x += 1;
        }
    };

    movePieceRight() {
        this.activePiece.x +=1;

        if (this.isPieceOutOfBounds()) {
            this.activePiece.x -= 1;
        }
    };

    movePieceDown() {
        this.activePiece.y +=1;

        if (this.isPieceOutOfBounds()) {
            this.activePiece.y -= 1;
            this.lockPiece();
        }
    };

    isPieceOutOfBounds() {
        const playfield = this.playfield;
        const { y, x } = this.activePiece;

        return playfield[y] === undefined || playfield[y][x] === undefined;
    };

    lockPiece() {
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                this.playfield[pieceY + y][pieceX + x] = blocks[y][x]
            }
        }
    }
}
