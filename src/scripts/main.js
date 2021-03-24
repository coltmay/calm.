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
            // Set variable equal to the length of the array being fetched.
            let length = phraseLength();
            // Set variable equal to a random number between 0 and the array length.
            let randomIndex = randomSelector(length);


            while (lastRandom === randomIndex) {
                randomIndex = randomSelector(length)
            }
            console.log(`Random Index = ${randomIndex}`, `Last Random = ${lastRandom}`)
            
            let randomPhrase = usePhrases()[randomIndex]
            
            let phrase = DisplayPhrase(randomPhrase)
            
            phraseElement.innerHTML = phrase;

            lastRandom = randomIndex;
        })
}

const randomSelector = (length) => {
    return Math.floor((Math.random() * length));
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