// konstante za prilagodbu parametara
const BALL_RADIUS = 10;
const BALL_SPEED = 5;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const PADDLE_SPEED = 5;
const PADDLE_Y_OFFSET = 60;
const BRICK_ROWS = 6;
const BRICK_COLUMNS = 8;
const BRICK_PADDING = 10;
const BOTTOM_MARGIN = 50;
const MAX_ASPECT_RATIO = 2 / 3;
const PLAYABLE_AREA_RATIO = 0.95;

let playableWidth, playableHeight, brickWidth, brickHeight;

// postavljanje Canvas objekta
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
resizeCanvas();

// varijable
let paddleX;
let ballX, ballY, ballDX, ballDY;
let ballInMotion = false;
let bricks = [];
let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;
let gameOver = false;
let gameEndMessage = '';
let ballWasAbovePaddle = false;

// kontrole igre
let rightPressed = false;
let leftPressed = false;

// event listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') rightPressed = true;
    if (e.key === 'ArrowLeft') leftPressed = true;
    if (gameOver && e.key === ' ') restartGame();
    if (!ballInMotion && !gameOver) startGame();
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') rightPressed = false;
    if (e.key === 'ArrowLeft') leftPressed = false;
});

// postavljanje velicine Canvasa i podrucja igre
function resizeCanvas() {
    const windowAspectRatio = window.innerWidth / window.innerHeight;
    if (windowAspectRatio < MAX_ASPECT_RATIO) {
        playableWidth = window.innerWidth * PLAYABLE_AREA_RATIO;
        playableHeight = playableWidth / MAX_ASPECT_RATIO;
    } else {
        playableHeight = window.innerHeight * PLAYABLE_AREA_RATIO;
        playableWidth = playableHeight * MAX_ASPECT_RATIO;
    }

    canvas.width = playableWidth;
    canvas.height = playableHeight;

    // izracun dimenzija cigli
    brickWidth = (playableWidth - (BRICK_COLUMNS + 1) * BRICK_PADDING) / BRICK_COLUMNS;
    brickHeight = 20;
}

// inicijalizacija igre
function initGame() {
    paddleX = (playableWidth - PADDLE_WIDTH) / 2;
    ballX = paddleX + PADDLE_WIDTH / 2;
    ballY = playableHeight - PADDLE_Y_OFFSET - PADDLE_HEIGHT - BALL_RADIUS;

    const angle = Math.random() * (Math.PI / 3) + Math.PI / 6;
    ballDX = BALL_SPEED * Math.cos(angle) * (Math.random() < 0.5 ? 1 : -1);
    ballDY = -BALL_SPEED * Math.sin(angle);
    ballInMotion = false;

    bricks = [];
    for (let row = 0; row < BRICK_ROWS; row++) {
        bricks[row] = [];
        for (let col = 0; col < BRICK_COLUMNS; col++) {
            bricks[row][col] = {
                x: col * (brickWidth + BRICK_PADDING) + BRICK_PADDING,
                y: row * (brickHeight + BRICK_PADDING) + 50,
                status: 1,
            };
        }
    }

    score = 0;
    gameOver = false;
    gameEndMessage = '';
    draw();
}

// osiguravanje konstantne brzine loptice
function normalizeBallSpeed() {
    const speed = Math.sqrt(ballDX ** 2 + ballDY ** 2);
    if (speed !== BALL_SPEED) {
        const scale = BALL_SPEED / speed;
        ballDX *= scale;
        ballDY *= scale;
    }
}

// detekcija sudara loptice i cigli
function checkBrickCollision() {
    for (let row = 0; row < BRICK_ROWS; row++) {
        for (let col = 0; col < BRICK_COLUMNS; col++) {
            const brick = bricks[row][col];
            if (brick.status === 1) {
                const brickLeft = brick.x;
                const brickRight = brick.x + brickWidth;
                const brickTop = brick.y;
                const brickBottom = brick.y + brickHeight;

                if (
                    ballX + BALL_RADIUS > brickLeft &&
                    ballX - BALL_RADIUS < brickRight &&
                    ballY + BALL_RADIUS > brickTop &&
                    ballY - BALL_RADIUS < brickBottom
                ) {
                    brick.status = 0;
                    score++;

                    if (ballX < brickLeft || ballX > brickRight) {
                        ballDX = -ballDX;
                    } else {
                        ballDY = -ballDY;
                    }
                    normalizeBallSpeed();

                    if (score === BRICK_ROWS * BRICK_COLUMNS) {
                        gameOver = true;
                        gameEndMessage = 'YOU WIN!';
                        saveBestScore();
                    }

                    return;
                }
            }
        }
    }
}

// crtanje palice
function drawPaddle() {
    ctx.fillStyle = '#ff0000';
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#000';
    ctx.fillRect(paddleX, playableHeight - PADDLE_Y_OFFSET - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.strokeStyle = '#aa0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(paddleX, playableHeight - PADDLE_Y_OFFSET - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.shadowBlur = 0;
}

// crtanje loptice
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#000';
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;
}

// crtanje cigli
function drawBricks() {
    bricks.forEach((row) => {
        row.forEach((brick) => {
            if (brick.status === 1) {
                ctx.fillStyle = '#00cc66';
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#000';
                ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight);
                ctx.strokeStyle = '#006633';
                ctx.lineWidth = 2;
                ctx.strokeRect(brick.x, brick.y, brickWidth, brickHeight);
            }
        });
    });
    ctx.shadowBlur = 0;
}

// prikaz rezultata
function displayScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'right';
    ctx.fillText(`Score: ${score}`, playableWidth - 10, 20);
    ctx.fillText(`Best: ${bestScore}`, playableWidth - 10, 40);
}

// pohrana najboljeg rezultata
function saveBestScore() {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
    }
}

// glavna funkcija za interakcije u igri
function playGame() {
    if (!ballInMotion) {
        ballX = paddleX + PADDLE_WIDTH / 2;
        ballY = playableHeight - PADDLE_Y_OFFSET - PADDLE_HEIGHT - BALL_RADIUS;
    } else {
        ballX += ballDX;
        ballY += ballDY;

        // sudari loptice i zida
        if (ballX + BALL_RADIUS > playableWidth || ballX - BALL_RADIUS < 0) ballDX = -ballDX;
        if (ballY - BALL_RADIUS < 0) ballDY = -ballDY;

        // provjera je li loptica ispod palice
        const ballBelowPaddle = ballY + BALL_RADIUS > playableHeight - PADDLE_Y_OFFSET - PADDLE_HEIGHT;

        if (
            ballBelowPaddle &&
            ballX > paddleX &&
            ballX < paddleX + PADDLE_WIDTH &&
            ballDY > 0 &&
            ballWasAbovePaddle
        ) {
            // odbijanje loptice
            ballDY = -ballDY;

            // normalizacija brzine loptice
            normalizeBallSpeed();
        }

        // loptica došla do dna područja igre
        if (ballY + BALL_RADIUS > playableHeight) {
            gameOver = true;
            gameEndMessage = 'GAME OVER';
            saveBestScore();
        }

        // provjera sudara s ciglama
        checkBrickCollision();
    }

    // pomaci palice
    if (rightPressed && paddleX < playableWidth - PADDLE_WIDTH) paddleX += PADDLE_SPEED;
    if (leftPressed && paddleX > 0) paddleX -= PADDLE_SPEED;

    ballWasAbovePaddle = ballY + BALL_RADIUS <= playableHeight - PADDLE_Y_OFFSET - PADDLE_HEIGHT;
}

// prikaži igru
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBricks();
    drawBall();
    displayScore();

    if (gameOver) {
        ctx.font = '48px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(gameEndMessage, canvas.width / 2, canvas.height / 2);
        ctx.font = '16px Arial';
        ctx.fillText('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 40);
        return;
    }

    playGame();
    requestAnimationFrame(draw);
}

// ponovno pokreni igru
function restartGame() {
    initGame();
}

// pocetno pokretanje
function startGame() {
    ballInMotion = true;
}

initGame();
