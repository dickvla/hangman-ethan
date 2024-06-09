const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const hangmanBox = document.querySelector(".hangman-box");
const hangmanBoxImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");

let word = 'rainbows';
let incorrect = 0;
let correctLettersShown = 0;
const maxNumberOfGuesses = 6;

const fruits = ['apple', 'banana', 'orange', 'kiwifruit', 'mandarin']
const usedFruits = []
function showPlaceForWord() {
    // Create element for placing a letter
    let index = 0;
    const letterHtml = [];
    while (index < word.length) {
        console.log('index; ', index);
        console.log(word[index]);
        
        letterHtml.push(`<li class="letter"> </li>`);
        index = index + 1;
    }
    
    // Add the html to the word-display element
    document.querySelector('.word-display').innerHTML = letterHtml.join('')
}

function showKeyboard() {
    for (let i = 65; i <= 90; i++) {
        const button = document.createElement("button");
        button.classList.add('key')  
        button.innerText = String.fromCharCode(i);
        keyboardDiv.appendChild(button);
        //button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)))
        button.addEventListener("click", (e) => {
            console.log(String.fromCharCode(i));
            useKeyboard(e);
        })
    }
}

function enableAllKeys() {
    const allKeys = document.getElementsByClassName('key')
    for (let key of allKeys) {
        key
        .disabled = false
    };
}
function useKeyboard(evt) {
    // disable letter on keyboard
    evt.target.disabled = true;
    // show letter clicked
    const letter = evt.target.innerHTML.toLowerCase();
    console.log(letter);
    // check if letter is in word
    if (word.includes(letter)) {
        // Yes it is
        

        // loop over all letters in word
        for(let i=0;i<word.length; i++){
            // does the letter clicked match the letter in the word?
            if (word[i] === letter){
                correctLettersShown++;
                // Yes, show the letter
                wordDisplay.querySelectorAll("li")[i].innerText = letter;
                if (correctLettersShown === word.length ){
                    gameOver(true);
                }
            }
        }
    } else {
        // The letter is not in the word
        incorrect++;
        hangmanBoxImage.src = `assets/images/hangman-${incorrect}.svg`;
        if (incorrect === maxNumberOfGuesses) {
            gameOver(false);
        }
    }
}

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `assets/images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${word}</b>`;
    if (fruits.length === usedFruits.length) {
        gameModal.querySelector('.play-again').style.display = 'none'
        gameModal.querySelector('.game-finished').classList.remove('hide')
    }
    gameModal.classList.add("show");
}

function showWord(index) {
    if (index < 0 || index >= fruits.length) {
        console.log ('invalid index ', index);
        return;
    }
    console.log(fruits[index])
} 

function getRandomWord(){
    let fruit = ''
    let isUsed = true
    while (isUsed) {
        let index = Math.random();
        index = index * fruits.length
        index = Math.floor(index)
        fruit = fruits[index]
        // check if fruit is used
        isUsed = usedFruits.includes(fruit)
    }
    usedFruits.push(fruit)
    return fruit 
}


function runGame(){
    incorrect = 0;
    correctLettersShown = 0;

    word = getRandomWord()
    showPlaceForWord() // do it
    gameModal.classList.remove("show");
    enableAllKeys()
}
showKeyboard()
runGame()