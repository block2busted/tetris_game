export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.isPlaying = false;
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keydown', this.handleKeyUp.bind(this));
        this.view.renderStartScreen();
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

    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    };

    updateView() {
        const state = this.game.getState();
        if (state.isGameOver) {
            this.view.renderGameOverScreen(state);
        } else if (!this.isPlaying) {
            this.view.renderStartScreen();
        } else {
            this.view.renderMainScreen(this.game.getState());
        }
    };

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100;
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100);
        }
    };

    stopTimer() {
        if ( this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    };

    handleKeyDown(event) {
        const state = this.game.getState();

        switch (event.keyCode) {
            case 13: // Enter key
                if (state.isGameOver) {
                    this.game.reset();
                    break;
                } else if (this.isPlaying) {
                    this.pause();
                    break;
                } else {
                    this.view.renderMainScreen(this.game.getState());
                    this.play();
                    break;
                }
            case 37: // left-arrow key
                this.game.movePieceLeft();
                this.updateView();
                break;
            case 38: // up-arrow key;
                this.game.rotatePiece();
                this.updateView();
                break;
            case 39: // right-arrow key;
                this.game.movePieceRight();
                this.updateView();
                break;
            case 40: // down-arrow key;
                this.stopTimer();
                this.game.movePieceDown();
                this.updateView();
                break;
        }
    };

    handleKeyUp(event) {
        switch (event.keyCode) {
            case 40:
                this.startTimer();
                break;
        }
    };
}