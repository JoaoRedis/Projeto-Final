let gameMode = ""; // Armazena o modo de jogo (singleplayer ou multiplayer)
let player1X = 130, player2X = 230; // Posições iniciais dos jogadores
let player1Y = 200, player2Y = 200; // Posições Y iniciais
let player1SpeedX = 0, player1SpeedY = 0;
let player2SpeedX = 0, player2SpeedY = 0;
let obstacles = [];
let gameInterval, obstacleInterval, botInterval;

const modeSelection = document.getElementById("modeSelection");
const gameScreen = document.getElementById("gameScreen");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const results = document.getElementById("results");
const winnerText = document.getElementById("winnerText");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const gameArea = document.getElementById("gameArea");

document.getElementById("singleplayerBtn").addEventListener("click", () => {
  gameMode = "singleplayer";
  startGameScreen();
});

document.getElementById("multiplayerBtn").addEventListener("click", () => {
  gameMode = "multiplayer";
  startGameScreen();
});

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

function startGameScreen() {
  modeSelection.style.display = "none";
  gameScreen.style.display = "block";
}

function startGame() {
  startBtn.style.display = "none";
  restartBtn.style.display = "none";
  results.style.display = "none";
  obstacles.forEach((obs) => obs.remove()); // Remove obstáculos antigos
  setInterval(createObstacle, 1000); // Cria novos obstáculos a cada 1 segundo
    gameStarted = true;
  obstacles = [];
  player1X = 130;
  player1Y = 200;
  player2X = 230;
  player2Y = 200;

  player1.style.left = player1X + "px";
  player1.style.top = player1Y + "px";
  player2.style.left = player2X + "px";
  player2.style.top = player2Y + "px";

  gameInterval = setInterval(gameLoop, 10);
  obstacleInterval = setInterval(createObstacle, 500); // Mais obstáculos
  if (gameMode === "singleplayer") startBot();

  
    

}

function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");

    // Determina posição inicial aleatória
    const randomTop = Math.random() * gameArea.offsetHeight;
    const randomLeft = Math.random() * gameArea.offsetWidth;

    obstacle.style.top = `${randomTop}px`;
    obstacle.style.left = `${randomLeft}px`;

    gameArea.appendChild(obstacle);

    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    let directionX = Math.random() < 0.5 ? -1 : 1; // Direção inicial horizontal
    let directionY = Math.random() < 0.5 ? -1 : 1; // Direção inicial vertical
    let posX = parseFloat(obstacle.style.left);
    let posY = parseFloat(obstacle.style.top);

    const interval = setInterval(() => {
        posX += directionX * 2; // Velocidade horizontal
        posY += directionY * 2; // Velocidade vertical

        // Verifica se está dentro da área do jogo
        if (posX <= 0 || posX >= gameArea.offsetWidth - obstacle.offsetWidth) {
            directionX *= -1; // Inverte a direção horizontal
        }

        if (posY <= 0 || posY >= gameArea.offsetHeight - obstacle.offsetHeight) {
            directionY *= -1; // Inverte a direção vertical
        }

        obstacle.style.left = `${posX}px`;
        obstacle.style.top = `${posY}px`;

        // Verifica colisão com jogadores
        if (checkCollision(obstacle, player1) || checkCollision(obstacle, player2)) {
            resetPlayerPosition();
        }
    }, 20); // Atualização a cada 20ms
}


function gameLoop() {
  movePlayers();
  updatePositions();
  checkCollisions();
  checkWinner();
}

function movePlayers() {
  player1X += player1SpeedX;
  player1Y += player1SpeedY;
  player2X += player2SpeedX;
  player2Y += player2SpeedY;

  // Limita os movimentos dos jogadores dentro da pista
  player1X = Math.max(0, Math.min(player1X, gameArea.offsetWidth - 40));
  player1Y = Math.max(0, Math.min(player1Y, gameArea.offsetHeight - 60));
  player2X = Math.max(0, Math.min(player2X, gameArea.offsetWidth - 40));
  player2Y = Math.max(0, Math.min(player2Y, gameArea.offsetHeight - 60));
}

function updatePositions() {
  player1.style.left = `${player1X}px`;
  player1.style.top = `${player1Y}px`;
  player2.style.left = `${player2X}px`;
  player2.style.top = `${player2Y}px`;
}

function createObstacle() {
  let obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.position = "absolute";
  obstacle.style.left = Math.random() * (gameArea.offsetWidth - 30) + "px";
  obstacle.style.top = "0px";
  obstacle.style.width = "30px";
  obstacle.style.height = "30px";
  obstacle.style.backgroundColor = "#f00";
  gameArea.appendChild(obstacle);

  obstacles.push(obstacle);

  let obstacleInterval = setInterval(() => {
    let currentTop = parseInt(obstacle.style.top, 10);
    if (currentTop < gameArea.offsetHeight) {
      obstacle.style.top = currentTop + 4 + "px"; // Obstáculos se movem mais rápido
    } else {
      clearInterval(obstacleInterval);
      obstacle.remove();
    }
  }, 10);
}

function checkCollisions() {
  obstacles.forEach((obstacle) => {
    let obsLeft = parseInt(obstacle.style.left, 10);
    let obsTop = parseInt(obstacle.style.top, 10);

    // Verifica colisão com o Player 1
    if (
      player1X < obsLeft + 30 &&
      player1X + 40 > obsLeft &&
      player1Y < obsTop + 30 &&
      player1Y + 60 > obsTop
    ) {
      resetPlayerPosition(player1, "Player 1");
    }

    // Verifica colisão com o Player 2
    if (
      player2X < obsLeft + 30 &&
      player2X + 40 > obsLeft &&
      player2Y < obsTop + 30 &&
      player2Y + 60 > obsTop
    ) {
      resetPlayerPosition(player2, "Player 2");
    }
  });
}

function resetPlayerPosition(player, name) {
  if (player === player1) {
    player1X = 130;
    player1Y = 200;
  } else {
    player2X = 230;
    player2Y = 200;
  }

  updatePositions();
  console.log(`${name} hit an obstacle and was reset!`);
}

function checkWinner() {
  if (player1X >= gameArea.offsetWidth - 40) {
    endGame("Player 1 Wins!");
  } else if (player2X >= gameArea.offsetWidth - 40) {
    endGame(gameMode === "singleplayer" ? "Bot Wins!" : "Player 2 Wins!");
  }
}

function endGame(winner) {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  clearInterval(botInterval);
  results.style.display = "block";
  winnerText.textContent = winner;
  restartBtn.style.display = "block";
}

function restartGame() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  clearInterval(botInterval);
  startBtn.style.display = "block";
  results.style.display = "none";
}

function startBot() {
  botInterval = setInterval(() => {
    let randomMove = Math.random();
    if (randomMove < 0.5) {
      player2SpeedX = 2; // Move para a direita
    } else {
      player2SpeedX = -2; // Move para a esquerda
    }

    // Desvia de obstáculos
    for (let obstacle of obstacles) {
      let obsLeft = parseInt(obstacle.style.left, 10);
      let obsTop = parseInt(obstacle.style.top, 10);

      if (
        Math.abs(obsTop - player2Y) < 50 &&
        Math.abs(obsLeft - player2X) < 30
      ) {
        if (player2X > obsLeft) {
          player2SpeedX = 2; // Desvia para a direita
        } else {
          player2SpeedX = -2; // Desvia para a esquerda
        }
      }
    }
  }, 300);
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w": player1SpeedY = -2; break; // Player 1 - Move para cima
    case "s": player1SpeedY = 2; break; // Player 1 - Move para baixo
    case "a": player1SpeedX = -2; break; // Player 1 - Move para esquerda
    case "d": player1SpeedX = 2; break; // Player 1 - Move para direita
    case "ArrowUp": player2SpeedY = -2; break; // Player 2 - Move para cima
    case "ArrowDown": player2SpeedY = 2; break; // Player 2 - Move para baixo
    case "ArrowLeft": player2SpeedX = -2; break; // Player 2 - Move para esquerda
    case "ArrowRight": player2SpeedX = 2; break; // Player 2 - Move para direita
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
    case "s": player1SpeedY = 0; break;
    case "a":
    case "d": player1SpeedX = 0; break;
    case "ArrowUp":
    case "ArrowDown": player2SpeedY = 0; break;
    case "ArrowLeft":
    case "ArrowRight": player2SpeedX = 0; break;
  }
});
