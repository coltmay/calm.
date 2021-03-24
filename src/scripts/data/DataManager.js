/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~
json-server -p 8099 -w db.json
~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
let phraseArray = [];
let phrasesArrayLength = 0;
let buttonArray = [];
let buttonsArrayLength = 0;


export const getPhrases = () => {
    return fetch("http://localhost:8099/phrases")
        .then(response => response.json())
        .then(parsedResponse => {
            phraseArray = parsedResponse;
            phrasesArrayLength = parsedResponse.length;
            return parsedResponse;
        })
}

export const phraseLength = () => {
    return phrasesArrayLength;
}

export const usePhrases = () => {
    return phraseArray;
}

export const getButtons = () => {
    return fetch("http://localhost:8099/buttons")
    .then(response => response.json())
    .then(parsedResponse => {
        buttonArray = parsedResponse;
        buttonsArrayLength = parsedResponse.length;
        return parsedResponse;
    })
}

export const buttonLength = () => {
    return buttonsArrayLength;
}

export const useButtons = () => {
    return buttonArray;
}

export const createPhrase = (phraseObj) => {
    return fetch("http://localhost:8099/phrases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(phraseObj)
    })
        .then(response => response.json())
}