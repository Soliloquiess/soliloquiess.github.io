// HTML 요소들을 선택합니다.
const score = document.querySelector(".score");
const startBtn = document.querySelector(".startBtn");
const gameArea = document.querySelector(".gameArea");
const gameMessage = document.querySelector(".gameMessage");

// 시작 버튼과 게임 메시지 영역에 이벤트 리스너를 추가합니다.
startBtn.addEventListener("click", start);
gameMessage.addEventListener("click", start);

// 키보드 이벤트를 감지하는 이벤트 리스너를 추가합니다.
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

// 키보드 키 상태를 저장하는 객체를 초기화합니다.
let keys = {};

// 플레이어와 파이프의 초기 상태를 설정합니다.
let player = {
  x: 0,
  y: 0,
  speed: 2,
  score: 0,
  inplay: false
};

let pipe = {
  startPos: 0,
  spaceBetweenRow: 0,
  spaceBetweenCol: 0,
  pipeCount: 0
};

// 게임을 시작하는 함수입니다.
function start() {
  console.log("game start");

  // 게임 상태를 초기화합니다.
  player.inplay = true;
  player.score = 0;
  gameArea.innerHTML = "";
  gameMessage.classList.add("hide");
  startBtn.classList.add("hide");

  // 새로운 새를 생성합니다.
  let bird = document.createElement("div");
  let wing = document.createElement("div");
  bird.setAttribute("class", "bird");
  wing.setAttribute("class", "wing");
  wing.pos = 15;
  wing.style.top = wing.pos + "px";
  bird.appendChild(wing);
  gameArea.appendChild(bird);
  player.x = bird.offsetLeft;
  player.y = bird.offsetTop;

  // 파이프 초기화
  pipe.startPos = 0;
  pipe.spaceBetweenRow = 400;
  pipe.pipeCount = Math.floor(gameArea.offsetWidth / pipe.spaceBetweenRow);

  for (let i = 0; i < pipe.pipeCount; i++) {
    makePipe(pipe.startPos * pipe.spaceBetweenRow);
    pipe.startPos++;
  }

  // 게임 루프 시작
  window.requestAnimationFrame(playGame);
}

// 파이프를 생성하는 함수
function makePipe(pipePos) {
  let totalHeight = gameArea.offsetHeight;
  let totalWidth = gameArea.offsetWidth;

  // 상단 파이프 생성
  let pipeUp = document.createElement("div");
  pipeUp.classList.add("pipe");
  pipeUp.height = Math.floor(Math.random() * 350);
  pipeUp.style.height = pipeUp.height + "px";
  pipeUp.style.left = totalWidth + pipePos + "px";
  pipeUp.x = totalWidth + pipePos;
  pipeUp.style.top = "0px";
  pipeUp.style.backgroundColor = "red";
  gameArea.appendChild(pipeUp);

  // 하단 파이프 생성
  pipe.spaceBetweenCol = Math.floor(Math.random() * 250) + 150;
  let pipeDown = document.createElement("div");
  pipeDown.classList.add("pipe");
  pipeDown.style.height =
    totalHeight - pipeUp.height - pipe.spaceBetweenCol + "px";
  pipeDown.style.left = totalWidth + pipePos + "px";
  pipeDown.x = totalWidth + pipePos;
  pipeDown.style.bottom = "0px";
  pipeDown.style.backgroundColor = "black";
  gameArea.appendChild(pipeDown);
}

// 파이프를 이동시키는 함수
function movePipes(bird) {
  let pipes = document.querySelectorAll(".pipe");
  let counter = 0;
  pipes.forEach(function(item) {
    item.x -= player.speed;
    item.style.left = item.x + "px";
    if (item.x < 0) {
      item.parentElement.removeChild(item);
      counter++;
    }

    if (isCollide(item, bird)) {
      playGameOver(bird);
    }
  });

  for (let i = 0; i < counter / 2; i++) {
    makePipe(0);
  }
}

// 충돌 검사를 수행하는 함수
function isCollide(pipe, bird) {
  let pipeRect = pipe.getBoundingClientRect();
  let birdRect = bird.getBoundingClientRect();
  return (
    pipeRect.bottom > birdRect.top &&
    pipeRect.top < birdRect.bottom &&
    pipeRect.left < birdRect.right &&
    pipeRect.right > birdRect.left
  );
}

// 게임 루프 함수
function playGame() {
  if (player.inplay) {
    let bird = document.querySelector(".bird");
    let wing = document.querySelector(".wing");
    movePipes(bird);
    let move = false;

    // 플레이어의 조작을 감지하여 새의 위치를 업데이트합니다.
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
      move = true;
    }
    if (keys.ArrowRight && player.x < gameArea.offsetWidth - bird.offsetWidth) {
      player.x += player.speed;
      move = true;
    }
    if ((keys.ArrowUp || keys.Space) && player.y > 0) {
      player.y -= player.speed * 5;
      move = true;
    }
    if (
      keys.ArrowDown &&
      player.y < gameArea.offsetHeight - bird.offsetHeight
    ) {
      player.y += player.speed;
      move = true;
    }

    if (move) {
      wing.pos = wing.pos === 15 ? 25 : 15;
      wing.style.top = wing.pos + "px";
    }

    player.y += player.speed * 2;

    // 게임 오버 검사
    if (player.y > gameArea.offsetHeight) {
      console.log("game over");
      playGameOver(bird);
    }

    // 새의 위치를 업데이트하고 점수를 증가시킵니다.
    bird.style.left = player.x + "px";
    bird.style.top = player.y + "px";
    window.requestAnimationFrame(playGame);
    player.score++;
    score.innerText = "SCORE : " + player.score;
  }
}

// 게임 오버 시 실행되는 함수
function playGameOver(bird) {
  player.inplay = false;
  gameMessage.classList.remove("hide");
  gameMessage.innerHTML =
    "GAME OVER<br/>당신의 점수는 " +
    player.score +
    "점 입니다. <br/> 다시 시작하려면 여기를 누르세요!";
  bird.setAttribute("style", "transform:rotate(180deg)");
}

// 키가 눌렸을 때 실행되는 함수
function pressOn(e) {
  console.log(e.code);
  keys[e.code] = true;
  console.log(keys);
}

// 키가 떼졌을 때 실행되는 함수
function pressOff(e) {
  console.log(e.code);
  keys[e.code] = false;
  console.log(keys);
}
