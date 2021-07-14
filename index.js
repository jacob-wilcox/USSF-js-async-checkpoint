const fetch = require("node-fetch")
const fs =  require('fs');


let pokemonNamesArray = [];
let result = ""
fs.readFile("./pokemonNames.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('thats not a pokemon')
    }
    else {
        
        let splitData = data.split("\n")

        for (element in splitData){
            splitData[element] = splitData[element].replace("\r", '')
            pokemonNamesArray.push(splitData[element])
        }

        for (currentPokemon in pokemonNamesArray){
            let pokemonNameCurrent = pokemonNamesArray[currentPokemon]

            let promise1 = new Promise((resolve, reject) => {

                
                fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNamesArray[currentPokemon]}`)
                .then(response => response.json())
                .then(dataFromCurrentPokemon => { 
                    result = ""
                    let currentPokemonTypes = dataFromCurrentPokemon['types']
                    for(theType in currentPokemonTypes){
                        oneTypeAtATime = currentPokemonTypes[theType];
                        let thisType = oneTypeAtATime['type']['name'];

                        result += `${thisType}`
                        if(theType != currentPokemonTypes.length - 1) {
                            result += `, `
                        }
                        resolve(result)

                    }
                })
            });
                
            Promise.all([promise1]).then((values) => {
                let trueResult = `${pokemonNameCurrent}: ${result}`
                
                trueResult = trueResult.charAt(0).toUpperCase() + trueResult.slice(1);
                console.log(trueResult)
            })


        }
    }
});



