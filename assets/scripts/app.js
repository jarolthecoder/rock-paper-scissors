const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const gameButtons = document.querySelectorAll('.player-choice');
const gameOptions = [rock, paper, scissors];

const playerChoice = document.querySelector('#player-choice');
const computerChoice = document.querySelector('#computer-choice');
const playerScoreDisplay = document.querySelector('#player-score');
const computerScoreDisplay = document.querySelector('#computer-score');
const playerEmoji = document.querySelector('.player-emoji');
const computerEmoji = document.querySelector('.computer-emoji');

let playerScore = 0;
let computerScore = 0;

// Rules and Character selection screen
const characterButton = document.querySelectorAll('.character-emoji');
characterButton.forEach(c => {c.addEventListener('click', (p)=> {
    const character = p.target;
    const playerType = character.dataset.tone;
    switch(playerType) {
        case 'boy-light':
            playerEmoji.textContent = '🧑🏻';
            playerEmoji.dataset.type = 'player-active';
            break;
        case 'boy-light-medium':
            playerEmoji.textContent = '🧑🏼';
            playerEmoji.dataset.type = 'player-active';
            break;
        case 'boy-medium-dark':
            playerEmoji.textContent = '🧑🏽';
            playerEmoji.dataset.type = 'player-active';
            break;
        case 'boy-dark':
            playerEmoji.textContent = '🧑🏿';
            playerEmoji.dataset.type = 'player-active';
            break;
        case 'girl-light':
            playerEmoji.textContent = '👩🏻';
            playerEmoji.dataset.type = 'player-active';
            break;
        case 'girl-light-medium':
            playerEmoji.textContent = '👩🏼';
            playerEmoji.dataset.type = 'player-active';
            break;
        case 'girl-medium-dark':
            playerEmoji.textContent = '👩🏽';
            playerEmoji.dataset.type = 'player-active';
            break;
        case 'girl-dark':
            playerEmoji.textContent = '👩🏿';
            playerEmoji.dataset.type = 'player-active';
            break;
    }
})});

const nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', ()=> {
    const rulesScreen = document.querySelector('.rules-container');
    const characterScreen = document.querySelector('#character-screen');
    rulesScreen.style.display = 'none';
    characterScreen.style.display = 'block';
});

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', ()=> {
    const startScreen = document.querySelector('#start-screen');
    const invalidChoice = document.querySelector('.invalid-choice')
    if(playerEmoji.dataset.type) {
        startScreen.style.display = 'none'; 
    } else {
        invalidChoice.style.display = 'block';
    }
});

//G A M E - S T A R T S -------------------------------------------------------------------------------------------------->
// Player Hand
function playerHand(e) {
    const gameButton = e.target;
    const buttonType = gameButton.dataset.type;
    switch (buttonType) {
        case 'rock':
            playerChoice.src = rock.src;
            playerChoice.dataset.type = 'rock';
            break;
        case 'paper':
            playerChoice.src = paper.src;
            playerChoice.dataset.type = 'paper';
            break;
        case 'scissors':
            playerChoice.src = scissors.src;
            playerChoice.dataset.type = 'scissors';
            break;
    }
    computerHand()
    playRound(playerChoice, computerChoice);
    endGame()
}

gameButtons.forEach(b => {b.addEventListener('click', playerHand)});

// Computer Hand
function computerHand() {
    const computerOptions = gameOptions[Math.floor(Math.random() * 3)];

    if (computerOptions === rock) {
        computerChoice.src = rock.src;
        computerChoice.dataset.type = 'rock';

    } else if (computerOptions === paper) {
        computerChoice.src = paper.src;
        computerChoice.dataset.type = 'paper';

    } else if (computerOptions === scissors) {
        computerChoice.src = scissors.src;
        computerChoice.dataset.type = 'scissors';
    }
    return computerChoice;
}

// Game
let result = document.querySelector('.game-choices h2');
function playRound(playerSelection, computerSelection) {
    const winnerSound = new Audio('./assets/audio/winner.mp3');
    const loserSound = new Audio('./assets/audio/loser.mp3');
    const drawSound = new Audio('./assets/audio/draw.mp3');

    if (playerSelection.dataset.type === 'rock') {
        switch (computerSelection.dataset.type) {
            case 'rock':
                result.textContent = 'It is a draw! 😐';
                drawSound.play();
                playerEmoji.classList.remove('winner');
                computerEmoji.classList.remove('winner');
                break;
            case 'paper':
                result.textContent = 'You Lose! Paper beats Rock 🤡';
                computerScore++;
                computerScoreDisplay.textContent = computerScore;
                loserSound.play();
                computerEmoji.classList.add('winner');
                playerEmoji.classList.remove('winner');
                break;
            case 'scissors':
                result.textContent = 'You Win! Rock beats Scissors 👏';
                playerScore++;
                playerScoreDisplay.textContent = playerScore;
                playerEmoji.classList.add('winner');
                computerEmoji.classList.remove('winner');
                winnerSound.play();
                break;
        };
    } else if (playerSelection.dataset.type === 'paper') {
        switch (computerSelection.dataset.type) {
            case 'rock':
                result.textContent = 'You Win! Paper beats Rock 👏';
                playerScore++;
                playerScoreDisplay.textContent = playerScore;
                playerEmoji.classList.add('winner');
                computerEmoji.classList.remove('winner');
                winnerSound.play();
                break;
            case 'paper':
                result.textContent = 'It is a draw! 😐';
                drawSound.play();
                playerEmoji.classList.remove('winner');
                computerEmoji.classList.remove('winner');
                break;
            case 'scissors':
                result.textContent = 'You Lose! Scissors beats Paper 🤡';
                computerScore++;
                computerScoreDisplay.textContent = computerScore;
                computerEmoji.classList.add('winner');
                playerEmoji.classList.remove('winner');
                loserSound.play();
                break;
        };
    } else if (playerSelection.dataset.type === 'scissors') {
        switch (computerSelection.dataset.type) {
            case 'rock':
                result.textContent = 'You Lose! Rock beats Scissors 🤡';
                computerScore++;
                computerScoreDisplay.textContent = computerScore;
                computerEmoji.classList.add('winner');
                playerEmoji.classList.remove('winner');
                loserSound.play();
                break;
            case 'paper':
                result.textContent = 'You Win! Scissors beats Paper 👏';
                playerScore++;
                playerScoreDisplay.textContent = playerScore;
                playerEmoji.classList.add('winner');
                computerEmoji.classList.remove('winner');
                winnerSound.play();
                break;
            case 'scissors':
                result.textContent = 'It is a draw! 😐';
                drawSound.play();
                playerEmoji.classList.remove('winner');
                computerEmoji.classList.remove('winner');
                break;
        };
    };
    return result; 
};

// Ends game and start new round
const resultScreen = document.querySelector('#result-screen');
const gameResult = document.querySelector('.result');
const playerFinalScore = document.querySelector('.player-score');
const computerFinalScore = document.querySelector('.computer-score');
const resetButton = document.querySelector('.reset-button');

function endGame() {
    const gameWinner = new Audio('./assets/audio/game-winner.mp3');
    const gameLoser = new Audio('./assets/audio/game-loser.mp3');
    if(playerScore === 5 || computerScore === 5) {
        resultScreen.classList.add('result-active');
        if(playerScore > computerScore) {
            gameResult.textContent = 'Congratulations! You are the Winner. 🏆';
            setTimeout(()=> {
                gameWinner.play();
            }, 2000);
        } else {
            gameResult.textContent = 'You Lose! Computer Wins. 😒';
            setTimeout(()=> {
                gameLoser.play();
            }, 2000);
        } 
        playerFinalScore.textContent = `${playerEmoji.innerHTML} Player Score: ${playerScore}`;
        computerFinalScore.textContent = `${computerEmoji.innerHTML}  Computer Score: ${computerScore}`;
    }
};
endGame();

resetButton.addEventListener('click', ()=> {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = 0;
    computerScoreDisplay.textContent = 0;
    playerChoice.src = '';
    computerChoice.src = '';
    result.textContent = 'Rock, Paper or Scissors?';
    playerEmoji.classList.remove('winner');
    computerEmoji.classList.remove('winner');
    resultScreen.classList.remove('result-active');
});