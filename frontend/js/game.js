const board = document.getElementById("gameBoard");
const movesText = document.getElementById("moves");

let level = localStorage.getItem("level") || "";

let cards;

if (level && level.includes("harder")) {
  cards = ["A","A","B","B","C","C","D","D","E","E","F","F"];
} else if (level && level.includes("Medium")) {
  cards = ["A","A","B","B","C","C","D","D"];
} else {
  cards = ["A","A","B","B","C","C"];
}

cards.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;

cards.forEach((value) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;
  card.innerText = "";

  card.addEventListener("click", () => {
    if (lock || card.innerText !== "") return;

    card.innerText = value;

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lock = true;

      moves++;
      movesText.innerText = moves;

      if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard = null;
        secondCard = null;
        lock = false;
      } else {
        setTimeout(() => {
          firstCard.innerText = "";
          secondCard.innerText = "";
          firstCard = null;
          secondCard = null;
          lock = false;
        }, 800);
      }
    }
  });

  board.appendChild(card);
});

// SAVE SCORE FUNCTION
async function saveScore() {
  const user = JSON.parse(localStorage.getItem("user"));

  await fetch("http://localhost:5000/api/game/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      moves: moves,
    }),
  });

  alert("Score saved!");
}