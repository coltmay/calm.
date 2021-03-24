import { getPhrases, usePhrases, phraseLength, getButtons, useButtons, buttonLength, createPhrase } from "./data/DataManager.js";
import { DisplayPhrase } from "./feed/PhrasePreview.js";
import { DisplayButton } from "./feed/ButtonPreview.js";
import { DisplayAddLink } from "./feed/AddLinkPreview.js";
import { DisplayPhraseEntry } from "./feed/PhraseEntryPreview.js";
import { DisplaySubmitButton } from "./feed/SubmitButtonPreview.js";
import { DisplayBackLink } from "./feed/BackLinkPreview.js";


const phraseElement = document.querySelector(".phraseFocus");
const buttonElement = document.querySelector(".buttonFocus");
const entryPreviewButtonElement = document.querySelector(".previewEntrySwitch");

let lastRandom = 0;

const ShowRandomPhrase = () => {
    getPhrases()
        .then(() => {
            // Set variable equal to the length of the array being fetched.
            let length = phraseLength();
            // Set variable equal to a random number between 0 and the array length.
            let randomIndex = randomSelector(length);

            // Compares newly generated random number with the last accepted random number, if identical, re-randomizes. 
            while (lastRandom === randomIndex) {
                randomIndex = randomSelector(length)
            }

            // Fetches a phrase from the phrase array, using the random number as the index.
            let randomPhrase = usePhrases()[randomIndex]

            // Converts phrase to HTML
            let phrase = DisplayPhrase(randomPhrase)

            // Injects the phrase to the DOM
            phraseElement.innerHTML = phrase;

            // Sets new value of lastRandom, for next application.
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

const ShowAddLink = () => {
    entryPreviewButtonElement.innerHTML = DisplayAddLink();
}

const ClickChillButton = () => {
    buttonElement.addEventListener("click", (event => {
        if (event.target.id === "phraseButton") {
            ShowRandomPhrase();
            ShowRandomButton();
        }
    }))
}

const ShowPhraseEntry = () => {
    entryPreviewButtonElement.addEventListener("click", event => {
        event.preventDefault();
        if (event.target.id === "displayEntry") {
            phraseElement.innerHTML = DisplayPhraseEntry();
            buttonElement.innerHTML = DisplaySubmitButton();
            entryPreviewButtonElement.innerHTML = DisplayBackLink();
        }
    })
}

const goBack = () => {
    entryPreviewButtonElement.addEventListener("click", event => {
        event.preventDefault();
        if (event.target.id === "displayMain") {
            ShowRandomPhrase();
            ShowRandomButton();
            ShowAddLink();
        }
    })
}

const ClickSubmitButton = () => {
    buttonElement.addEventListener("click", event => {

        if (event.target.id === "submitButton") {

            let phrase = document.querySelector("textarea[name='phraseInputBox']").value;

            phrase = phrase.replace(/\n/g, "<br>").toLowerCase();

            const phraseObj = {
                phrase: phrase
            };

            createPhrase(phraseObj);
        }
    })
}

const startChill = () => {
    ShowRandomPhrase();
    ShowRandomButton();
    ShowAddLink();
    ClickChillButton();
    ShowPhraseEntry();
    goBack();
    ClickSubmitButton();
}

startChill();