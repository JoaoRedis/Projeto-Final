const gameArea = document.getElementById('game-area');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
let score = 0;
let gameInterval;
let timeLimit = 2000; // Tempo máximo para clicar no alvo (em ms)
let timeoutId; // Armazena o timer para "Game Over"

function createTarget() {
  const target = document.createElement('div');
  target.classList.add('target');

  const x = Math.random() * (gameArea.offsetWidth - 40);
  const y = Math.random() * (gameArea.offsetHeight - 40);
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  target.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    target.remove();
    resetTimeout(); // Reinicia o timer ao clicar no alvo
  });

  gameArea.appendChild(target);

  timeoutId = setTimeout(() => {
    // Game Over se o alvo não for clicado
    clearInterval(gameInterval);
    startBtn.disabled = false;
    alert(`Game Over! Sua pontuação foi: ${score}`);
  }, timeLimit);

  setTimeout(() => {
    if (target.parentElement) target.remove();
  }, timeLimit); // Remove o alvo após o tempo limite
}

function resetTimeout() {
  clearTimeout(timeoutId); // Limpa o timer anterior
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  startBtn.disabled = true;

  resetTimeout(); // Garante que o timer está zerado antes de começar
  gameInterval = setInterval(createTarget, 800);

  setTimeout(() => {
    clearInterval(gameInterval);
    startBtn.disabled = false;
    alert(`Jogo terminado! Sua pontuação foi: ${score}`);
  }, 30000); // Jogo dura 30 segundos
}

startBtn.addEventListener('click', startGame);
