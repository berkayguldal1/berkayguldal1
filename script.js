const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = generateFood();
let direction = "RIGHT";
let score = 0;

// Klavye kontrolü
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Rastgele yemek oluştur
function generateFood() {
  const foodX = Math.floor((Math.random() * canvas.width) / boxSize) * boxSize;
  const foodY = Math.floor((Math.random() * canvas.height) / boxSize) * boxSize;
  return { x: foodX, y: foodY };
}

// Oyun döngüsü
function gameLoop() {
  const head = { ...snake[0] };

  // Yılanın hareketi
  if (direction === "UP") head.y -= boxSize;
  else if (direction === "DOWN") head.y += boxSize;
  else if (direction === "LEFT") head.x -= boxSize;
  else if (direction === "RIGHT") head.x += boxSize;

  // Duvara veya kendine çarpma kontrolü
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert(`Oyun Bitti! Skor: ${score}`);
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    score = 0;
    food = generateFood();
    return;
  }

  // Yemek yeme kontrolü
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop();
  }

  snake.unshift(head);

  // Ekranı temizle
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Yılanı çiz
  ctx.fillStyle = "lime";
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  });

  // Yemeği çiz
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Skoru yaz
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Skor: ${score}`, 10, 20);

  setTimeout(gameLoop, 100);
}

gameLoop();
