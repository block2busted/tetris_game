export default class View {
    colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'green',
        '6': 'purple',
        '7': 'red'
    }

    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.playfieldBorderWidth = 4;
        this.playfieldX = this.playfieldBorderWidth;
        this.playfieldY = this.playfieldBorderWidth;
        this.playfieldWidth = this.width * 2 / 3;
        this.playfieldHeigth = this.height;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeigth = this.playfieldHeigth - this.playfieldBorderWidth * 2;

        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeigth / rows;

        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeigth = this.height;


        this.element.appendChild(this.canvas)
    }

    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state)
    };

    renderStartScreen() {
        this.context.fillStyle = 'white';
        this.context.font = '22px "Press start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';

        this.context.fillText('Enter your name and press Enter', this.width / 2, this.height /2);
    };

    renderGameOverScreen({ score }) {
        this.clearScreen();
        this.context.fillStyle = 'white';
        this.context.font = '22px "Press start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GAME OVER', this.width / 2, this.height /2 - 48);
        this.context.fillText(`Score ${score}`, this.width / 2, this.height /2);
        this.context.fillText(`Scores table:`, this.width / 2, this.height /2 +48);
        this.context.fillText(`Press ENTER to restart.`, this.width / 2, this.height /2 + 72);
    };

    renderPlayfield({ playfield }) {
        for (let y = 0; 0 < playfield.length; y++) {
            const line = playfield[y];

            if (y===20) {
                break;
            }

            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                if (block) {

                    this.renderBlock(
                        (x * this.blockWidth) + this.playfieldX,
                        (y * this.blockHeight) + this.playfieldY,
                        this.blockWidth,
                        this.blockHeight,
                        this.colors[block]
                    );
                }
            }
        }

        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.playfieldBorderWidth;
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeigth);
    };

    renderPanel({ level, score, player, nextPiece }) {
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '18px "Press start 2P"';

        this.context.fillText(`Player: ${player}`, this.panelX, this.panelY)
        this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 20)
        this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 40)
        this.context.fillText("Next", this.panelX, this.panelY + 96)

        for (let y=0; y < nextPiece.blocks.length; y++) {
            for (let x=0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];
                if (block) {
                    this.renderBlock(
                        (x * this.blockWidth * 0.5) + this.panelX,
                        (y * this.blockHeight * 0.5) + this.panelY + 100,
                        this.blockWidth * 0.5,
                        this.blockHeight * 0.5,
                        this.colors[block]
                    )
                }
            }
        }
    };

    renderBlock(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height)
    };

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}