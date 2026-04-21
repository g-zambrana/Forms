const express = require('express');
const router = express.Router();
const {readFile} = require('fs').promises;

router.get('/', async (req, res) => {
    let chosenWords = await getWords();
    console.log("Chosen Words:", chosenWords);
});

let getWords = async () => {
    let allWords = await readFile ('resources/allwords.txt', 'utf-8');
    let wordArray = allWords.split('\n');
    console.log(wordArray);
    shuffle(wordArray);
    let choices = [];
    while(choices.length< 5){
        let line = wordArray.pop();
        //let [word, part, def]= line.split('\t');
        let tokens = line.split('\t');
        let word = tokens[0];
        let part = tokens[1];
        let def = tokens[2];
        if (part === randomPart){
            choices.push(line);
        }
    }
    return choices;

}

let getRandomPart = ()=>{
    let parts = ['noun', 'verb', 'adjective'];
    let randomIndex = Math.floor(Math.random() * parts.length);
    let randomPart = parts[randomIndex];
    return randomPart;
}

let shuffle = (array) => {
    for(let i = array.length - 1; i > 0; i--)
    {
        let randomNumber = Math.floor(Math.random()*(i+1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
    console.log("array shuffled");
}

module.exports = router;