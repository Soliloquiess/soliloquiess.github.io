// HTML 요소들을 선택합니다.
const score = document.querySelector(".score"); // 점수를 표시할 요소
const startBtn = document.querySelector(".startBtn"); // 시작 버튼
const gameArea = document.querySelector(".gameArea"); // 게임 영역
const gameMessage = document.querySelector(".gameMessage"); // 게임 메시지 영역

// 시작 버튼과 게임 메시지 영역에 클릭 이벤트 리스너를 추가합니다.
startBtn.addEventListener("click", start); // 시작 버튼 클릭 시 start() 함수 실행
gameMessage.addEventListener("click", start); // 게임 메시지 클릭 시 start() 함수 실행

// 키보드 이벤트를 감지하는 이벤트 리스너를 추가합니다.
document.addEventListener("keydown", pressOn); // 키 다운 이벤트 감지
document.addEventListener("keyup", pressOff); // 키 업 이벤트 감지

// 키보드 키 상태를 저장하는 객체를 초기화합니다.
let keys = {}; // 키 상태를 저장할 객체

// 플레이어와 파이프의 초기 상태를 설정합니다.
let player = {
  x: 0, // 플레이어의 가로 위치
  y: 0, // 플레이어의 세로 위치
  speed: 2, // 플레이어의 이동 속도
  score: 0, // 플레이어의 점수
  inplay: false // 게임 진행 중 여부
};

let pipe = {
  startPos: 0, // 파이프 시작 위치
  spaceBetweenRow: 0, // 파이프 행 간격
  spaceBetweenCol: 0, // 파이프 열 간격
  pipeCount: 0 // 파이프 개수
};

// 게임을 시작하는 함수입니다.
function start() {
  console.log("game start");

  // 게임 상태를 초기화합니다.
  player.inplay = true; // 게임 진행 중 상태
  player.score = 0; // 플레이어의 점수 초기화
  gameArea.innerHTML = ""; // 게임 영역 비우기
  gameMessage.classList.add("hide"); // 게임 메시지 숨기기
  startBtn.classList.add("hide"); // 시작 버튼 숨기기

  // 새로운 새를 생성합니다.
  let bird = document.createElement("div"); // 새 요소 생성
  let wing = document.createElement("div"); // 새의 날개 요소 생성
  bird.setAttribute("class", "bird"); // 새 요소에 클래스 추가
  wing.setAttribute("class", "wing"); // 날개 요소에 클래스 추가
  wing.pos = 15; // 날개의 초기 위치 설정
  wing.style.top = wing.pos + "px"; // 날개의 초기 위치를 스타일로 설정
  bird.appendChild(wing); // 새에 날개 요소를 추가
  gameArea.appendChild(bird); // 게임 영역에 새를 추가
  player.x = bird.offsetLeft; // 플레이어의 가로 위치 설정
  player.y = bird.offsetTop; // 플레이어의 세로 위치 설정

  // 파이프 초기화
  pipe.startPos = 0; // 파이프 시작 위치 초기화
  pipe.spaceBetweenRow = 400; // 파이프 행 간격 설정
  pipe.pipeCount = Math.floor(gameArea.offsetWidth / pipe.spaceBetweenRow); // 파이프 개수 계산

  for (let i = 0; i < pipe.pipeCount; i++) {
    makePipe(pipe.startPos * pipe.spaceBetweenRow); // 파이프 생성
    pipe.startPos++; // 시작 위치 증가
  }

  // 게임 루프 시작
  window.requestAnimationFrame(playGame); // 게임 루프 시작
}

// 파이프를 생성하는 함수
function makePipe(pipePos) {
  let totalHeight = gameArea.offsetHeight; // 게임 영역의 전체 높이
  let totalWidth = gameArea.offsetWidth; // 게임 영역의 전체 너비

  // 상단 파이프 생성
  let pipeUp = document.createElement("div"); // 상단 파이프 요소 생성
  pipeUp.classList.add("pipe"); // 파이프 클래스 추가
  pipeUp.height = Math.floor(Math.random() * 350); // 파이프 높이 랜덤 설정
  pipeUp.style.height = pipeUp.height + "px"; // 파이프 높이를 스타일로 설정
  pipeUp.style.left = totalWidth + pipePos + "px"; // 파이프 위치 설정
  pipeUp.x = totalWidth + pipePos; // 파이프 가로 위치 설정
  pipeUp.style.top = "0px"; // 파이프 상단 위치 설정
  pipeUp.style.backgroundColor = "red"; // 상단 파이프 색상 설정
  gameArea.appendChild(pipeUp); // 게임 영역에 상단 파이프 추가

  // 하단 파이프 생성
  pipe.spaceBetweenCol = Math.floor(Math.random() * 250) + 150; // 파이프 열 간격 설정
  let pipeDown = document.createElement("div"); // 하단 파이프 요소 생성
  pipeDown.classList.add("pipe"); // 파이프 클래스 추가
  pipeDown.style.height =
    totalHeight - pipeUp.height - pipe.spaceBetweenCol + "px"; // 파이프 높이 설정
  pipeDown.style.left = totalWidth + pipePos + "px"; // 파이프 위치 설정
  pipeDown.x = totalWidth + pipePos; // 파이프 가로 위치 설정
  pipeDown.style.bottom = "0px"; // 파이프 하단 위치 설정
  pipeDown.style.backgroundColor = "black"; // 하단 파이프 색상 설정
  gameArea.appendChild(pipeDown); // 게임 영역에 하단 파이프 추가
}

// 파이프를 이동시키는 함수
function movePipes(bird) {
  let pipes = document.querySelectorAll(".pipe"); // 모든 파이프 요소 선택
  let counter = 0;
  pipes.forEach(function(item) {
    item.x -= player.speed; // 파이프를 왼쪽으로 이동
    item.style.left = item.x + "px"; // 파이프의 위치를 업데이트

    if (item.x < 0) {
      item.parentElement.removeChild(item); // 화면 밖으로 나간 파이프 제거
      counter++;
    }

    if (isCollide(item, bird)) {
      playGameOver(bird); // 충돌 검사를 수행하고 게임 오버 처리
    }
  });

  for (let i = 0; i < counter / 2; i++) {
    makePipe(0); // 화면 왼쪽으로 나간 파이프 재생성
  }
}

// 충돌 검사를 수행하는 함수
function isCollide(pipe, bird) {
  let pipeRect = pipe.getBoundingClientRect(); // 파이프의 사각 영역 정보
  let birdRect = bird.getBoundingClientRect(); // 새의 사각 영역 정보

  // 충돌 검사를 수행하고 결과를 반환
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
    let bird = document.querySelector(".bird"); // 새 요소 선택
    let wing = document.querySelector(".wing"); // 날개 요소 선택
    movePipes(bird); // 파이프 이동 처리
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
    window.requestAnimationFrame(playGame); // 다음 프레임 요청
    player.score++; // 점수 증가
    score.innerText = "SCORE : " + player.score; // 점수 표시 업데이트
  }
}

// 게임 오버 시 실행되는 함수
function playGameOver(bird) {
  player.inplay = false; // 게임 진행 중 상태 해제
  gameMessage.classList.remove("hide"); // 게임 메시지 보이기
  gameMessage.innerHTML =
    "GAME OVER<br/>당신의 점수는 " +
    player.score +
    "점 입니다. <br/> 다시 시작하려면 여기를 누르세요!";
  bird.setAttribute("style", "transform:rotate(180deg)"); // 새를 뒤집어 표시
}

// 키가 눌렸을 때 실행되는 함수
function pressOn(e) {
  console.log(e.code); // 눌린 키 코드 출력
  keys[e.code] = true; // 키 상태를 true로 설정
  console.log(keys); // 현재 키 상태 출력
}

// 키가 떼졌을 때 실행되는 함수
function pressOff(e) {
  console.log(e.code); // 떼진 키 코드 출력
  keys[e.code] = false; // 키 상태를 false로 설정
  console.log(keys); // 현재 키 상태 출력
}
