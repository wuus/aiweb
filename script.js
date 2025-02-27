class PuzzleGame {
    constructor() {
        this.board = [];
        this.moves = 0;
        this.boardElement = document.getElementById('puzzle-board');
        this.movesElement = document.getElementById('moves');
        this.newGameButton = document.getElementById('new-game');
        
        this.newGameButton.addEventListener('click', () => this.startNewGame());
        this.initializeGame();
    }

    initializeGame() {
        this.moves = 0;
        this.movesElement.textContent = `移动次数: ${this.moves}`;
        this.board = Array.from({length: 16}, (_, i) => i);
        this.shuffleBoard();
        this.renderBoard();
    }

    shuffleBoard() {
        for (let i = this.board.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.board[i], this.board[j]] = [this.board[j], this.board[i]];
        }
        // 确保拼图可解
        if (!this.isSolvable()) {
            if (this.board[0] !== 0 && this.board[1] !== 0) {
                [this.board[0], this.board[1]] = [this.board[1], this.board[0]];
            } else {
                [this.board[2], this.board[3]] = [this.board[3], this.board[2]];
            }
        }
    }

    isSolvable() {
        let inversions = 0;
        for (let i = 0; i < this.board.length - 1; i++) {
            for (let j = i + 1; j < this.board.length; j++) {
                if (this.board[i] !== 0 && this.board[j] !== 0 && this.board[i] > this.board[j]) {
                    inversions++;
                }
            }
        }
        return inversions % 2 === 0;
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        this.board.forEach((num, index) => {
            const tile = document.createElement('div');
            tile.className = `tile ${num === 0 ? 'empty' : ''}`;
            if (num !== 0) tile.textContent = num;
            tile.addEventListener('click', () => this.moveTile(index));
            this.boardElement.appendChild(tile);
        });
    }

    moveTile(index) {
        const emptyIndex = this.board.indexOf(0);
        if (this.isAdjacent(index, emptyIndex)) {
            [this.board[index], this.board[emptyIndex]] = [this.board[emptyIndex], this.board[index]];
            this.moves++;
            this.movesElement.textContent = `移动次数: ${this.moves}`;
            this.renderBoard();
            
            if (this.checkWin()) {
                setTimeout(() => {
                    alert(`恭喜！你用了 ${this.moves} 步完成了拼图！`);
                    this.startNewGame();
                }, 300);
            }
        }
    }

    isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / 4);
        const col1 = index1 % 4;
        const row2 = Math.floor(index2 / 4);
        const col2 = index2 % 4;
        
        return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    }

    checkWin() {
        return this.board.every((num, index) => num === (index + 1) % 16);
    }

    startNewGame() {
        this.initializeGame();
    }
}

// 启动游戏
window.addEventListener('DOMContentLoaded', () => {
    new PuzzleGame();
}); 