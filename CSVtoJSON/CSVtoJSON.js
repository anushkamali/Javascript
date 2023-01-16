const fs = require("fs");
csv = fs.readFileSync("username.csv")

const array = csv.toString().split("\n");
const csvToJsonResult = [];
const headers = array[0].split(", ")

for(let i=1; i<array.length - 1; i++)
{
    const jsonObject = {};
    const currentArrayString = array[i];

    let string = '';
    let quoteFlag = 0;

    for(let character of currentArrayString) {
        if(character === '"' && quoteFlag === 0) {quoteFlag = 1}
        else if(character === '"' && quoteFlag === 1) quoteFlag = 0
        if(character === ", " && quoteFlag === 0) character = '|'
        if(character !== '"') string += character
    }

    let jsonProperties = string.split("|")
    
    for(let j in headers) {
        if(jsonProperties[j].includes(", ")) {
            jsonObject[headers[j]] = jsonProperties[j].split(", ").map(item => item.trim())
        }
        else jsonObject[headers[j]] = jsonProperties[j]
    }

    csvToJsonResult.push(jsonObject)
}

const jsonFile = JSON.stringify(csvToJsonResult);
console.log(jsonFile)