import { getPhrases, usePhrases, phraseLength, getButtons, useButtons, buttonLength } from "./DataManager.js";
import { DisplayPhrase } from "./feed/PhrasePreview.js";
import { DisplayButton } from "./feed/ButtonPreview.js";


const phraseElement = document.querySelector(".phraseFocus")
const buttonElement = document.querySelector(".buttonFocus")

const ShowRandomPhrase = () => {
    getPhrases()
        .then(() => {
            let length = phraseLength();
            let randomPhraseInt = Math.floor((Math.random() * length));
            let randomPhrase = usePhrases()[randomPhraseInt]
            let phrase = DisplayPhrase(randomPhrase)
            
            phraseElement.innerHTML = phrase;
        })
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