// Selecting all elements with the class "box" and storing them in the boxes variable
let boxes = document.querySelectorAll(".box");

// Selecting the reset button and new button
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");

// Selecting message container and message elements
let msgContainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");

// Initializing variables to keep track of game state
let turnO = true; // Represents the current player (true for player O, false for player X)
let count = 0; // Keeps track of the number of moves made

// Array representing winning patterns in the tic-tac-toe grid
const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to reset the game to its initial state
const resetGame = () => {
  turnO = true; // Resetting player to O
  count = 0; // Resetting move count
  enableBoxes(); // Enabling all boxes
  msgContainer.classList.add("hide"); // Hiding the message container
};

// Function to enable all boxes for clicking
const enableBoxes = () => {
  // Looping through each box
  boxes.forEach((box) => {
    box.disabled = false; // Enabling the box
    box.innerText = ""; // Clearing the box text
  });
};

// Function to disable all boxes from clicking
const disableBoxes = () => {
  // Looping through each box
  boxes.forEach((box) => {
    box.disabled = true; // Disabling the box
  });
};

// Function to check if there's a winner
const checkWinner = () => {
  // Looping through each winning pattern
  for (let pattern of winPattern) {
    // Getting the values of the positions in the pattern
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    // Checking if all positions have the same non-empty value
    if (
      pos1val !== "" &&
      pos1val === pos2val &&
      pos2val === pos3val
    ) {
      // If a winner is found, display the winner and return true
      showWinner(pos1val);
      return true;
    }
  }
  // If no winner is found, return false
  return false;
};

// Function to display the winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations!!!! Winner is ${winner}`; // Setting the message text
  msgContainer.classList.remove("hide"); // Removing the "hide" class to show the message container
  disableBoxes(); // Disabling all boxes
};

// Function to handle game draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`; // Setting the message text
  msgContainer.classList.remove("hide"); // Removing the "hide" class to show the message container
  disableBoxes(); // Disabling all boxes
};

// Adding click event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Checking if the box is empty
    if (box.innerText === "") {
      // Setting the appropriate player symbol based on whose turn it is
      if (turnO) {
        box.innerText = "O"; // Setting O
        turnO = false; // Switching to player X's turn
      } else {
        box.innerText = "X"; // Setting X
        turnO = true; // Switching to player O's turn
      }
      box.disabled = true; // Disabling the clicked box
      count++; // Incrementing the move count

      // Checking for a winner after every move
      if (count >= 5) {
        let isWinner = checkWinner(); // Checking for a winner
        // If no winner is found and all moves are made, declare draw
        if (!isWinner && count === 9) {
          gameDraw();
        }
      }
    }
  });
});

// Adding click event listeners to the new game button and reset button
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
