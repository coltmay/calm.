import { getPhrases, usePhrases, phraseLength, getButtons, useButtons, buttonLength } from "./DataManager.js";
import { DisplayPhrase } from "./feed/PhrasePreview.js";
import { DisplayButton } from "./feed/ButtonPreview.js";


const phraseElement = document.querySelector(".phraseFocus")
const buttonElement = document.querySelector(".buttonFocus")

// ! Look into `Fisher-Yates Algorithm`

let lastRandom = 0;

const ShowRandomPhrase = () => {
    getPhrases()
        .then(() => {
            let length = phraseLength();

            let randomIndex = randomSelector(length);
            lastRandom = randomIndex;
            console.log(lastRandom);
            let randomPhrase = usePhrases()[randomIndex]

            let phrase = DisplayPhrase(randomPhrase)
            
            phraseElement.innerHTML = phrase;
        })
}

const randomSelector = (length) => {
    do {
    return Math.floor((Math.random() * length));
    } while (lastRandom === randomIndex);
}

const ShowRandomButton = () => {
    getButtons()
        .then(() => {
            let length = buttonLength();
            let randomButtonInt = Math.floor((Math.random() * length));
            let randomButton = useButtons()[randomButtonInt]
            let button = DisplayButton(randomButton)

            buttonElement.innerHTML = button;
        })
}

const ClickButton = () => {
    buttonElement.addEventListener("click", (event => {
        if (event.target.id === "phraseButton") {
            ShowRandomPhrase();
            ShowRandomButton();
        }
    }))
}

const startChill = () => {
    ShowRandomPhrase();
    ShowRandomButton();
    ClickButton();
}

startChill();