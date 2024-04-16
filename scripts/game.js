const keyboardDiv = document.querySelector(".keyboard");
const word = 'Happy!';

function showPlaceForWord() {
    // Create element for placing a letter
    let index = 0;
    const letterHtml = [];
    while (index < word.length) {
        console.log('index; ', index);
        console.log(word[index]);
        
        letterHtml.push(`<li class="letter">${word[index]}</li>`);
        index = index + 1;
    }
    
    // Add the html to the word-display element
    document.querySelector('.word-display').innerHTML = letterHtml.join('')
}

function showKeyboard() {
    for (let i = 65; i <= 90; i++) {
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i);
        keyboardDiv.appendChild(button);
        //button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)))
        button.addEventListener("click", (e) => 
            console.log(String.fromCharCode(i)))
    }
}

showPlaceForWord() // do it
showKeyboard()