let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;

let turnO = true;

const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
]

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");

}

boxes.forEach((box) => {
  box.addEventListener("click", ()=>{
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      count++;
    } else {
      box.innerText = "X";
      count++;
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
    drawGame();
  })
})

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}
const showWinner = (winner) =>{
  msg.innerText = `Congratulation, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
}

const drawGame = () => {
  if (count >= 9){
    msg.innerText = "Match draw, Please Start New Match";
    msgContainer.classList.remove("hide");
    count = 0;
  }
}

newGameBtn.addEventListener("click", resetGame);
reset_btn.addEventListener("click", resetGame);