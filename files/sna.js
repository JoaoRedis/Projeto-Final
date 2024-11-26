const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let score = 0;

let snake = [{ x: 200, y: 200 }];
let direction = 'RIGHT';
let food = spawnFood();

document.addEventListener('keydown', changeDirection);

function spawnFood() {
  const foodX = Math.floor((Math.random() * canvas.width) / boxSize) * boxSize;
  const foodY = Math.floor((Math.random() * canvas.height) / boxSize) * boxSize;
  return { x: foodX, y: foodY };
}

function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, boxSize, boxSize));
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function changeDirection(event) {
  if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

function moveSnake() {
  const head = { ...snake[0] };
  if (direction === 'UP') head.y -= boxSize;
  if (direction === 'DOWN') head.y += boxSize;
  if (direction === 'LEFT') head.x -= boxSize;
  if (direction === 'RIGHT') head.x += boxSize;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = spawnFood();
  } else {
    snake.pop();
  }

  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game);
    alert(`Jogo terminado! Sua pontuação foi: ${score}`);
    document.location.reload();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();
}

const game = setInterval(gameLoop, 150);
