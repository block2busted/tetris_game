export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.isPlaying = false;
        this.intervalId = null;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        document.addEventListener('keyup', this.view.inputHandler);

        this.view.renderStartScreen(this.isPlaying);
    };

    update() {
        this.game.movePieceDown();
        this.updateView();
    };

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    };

    updateView() {
        const state = this.game.getState();
        if (state.isGameOver) {
            this.isPlaying = false;
            this.stopTimer();
            this.game.updateRecords();
            this.view.renderGameOverScreen(this.game.getState());
        } else if (!this.isPlaying) {
            console.log(this.game.getState())
            this.view.renderStartScreen(this.game.getState());
        } else {
            this.view.renderMainScreen(this.game.getState());
        }
    };

    reset() {
        this.game.reset();
        this.play();
    };

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100

        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100)
        }
    };

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    };

    handleKeyDown(event) {
        const state = this.game.getState();

        switch (event.keyCode) {
            case 13: // Enter key
                if (state.isGameOver) {
                    this.reset()
                } else {
                    this.play();
                }
                document.removeEventListener('keyup', this.view.inputHandler);
                this.view.renderMainScreen(this.game.getState());
                break;
            case 37: // left-arrow key
                if (this.isPlaying) {
                    this.game.movePieceLeft();
                    this.updateView();
                    break;
                }
                break;
            case 38: // up-arrow key;
                if (this.isPlaying) {
                    this.game.rotatePiece();
                    this.updateView();
                    break;
                }
                break;
            case 39: // right-arrow key;
                if (this.isPlaying) {
                    this.game.movePieceRight();
                    this.updateView();
                    break;
                }
                break;
            case 40: // down-arrow key;
                if (this.isPlaying) {
                    this.stopTimer();
                    this.game.movePieceDown();
                    this.updateView();
                    break;
                }
        }
    };

    handleKeyUp(event) {
        switch (event.keyCode) {
            case 40:
                if (this.isPlaying) {
                    this.startTimer();
                    break;
                }
        }
    };
}