import { getPhrases } from "./DataManager.js"

// Function to randomize number based on array length.
export const randomPhrase = () => {
    getPhrases()
        .then(phraseArray => {
            return(phraseArray.length)
        })
}