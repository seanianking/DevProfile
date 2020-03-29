//This assignment will require functions to run the inquire protocol
//for user input, and grab from the github API (using axios), to get  
//the Username, Color, and Star information.
//Functions to compile the information, generate HTML, and create and
//save the HTML as a PDF.
//-------------------------------------------------------------------//

//**Required Dependencies **/
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const puppeteer = require("puppeteer");
const asyncProcess = util.promisify(fs.writeFile);

//Inquirer questions:
function getDataInput(){
inquirer.prompt([{
    type: "input",
    name: "username",
    message: "GitHub username please:"
}, {
    type: "list",
    message: "Pick a color, ANY color out of these four:",
    name: "color",
    choices: ["green", "blue", "red", "pink"]
}])
return color, username;
};

function getAxiosData(username){
    const profile = axios.get(`https://api.github.com/users/${username}`);
    const starCount = axios.get(`https://api.github.com/users/${username}/starred`);
    return profile, starCount;
};


function writeToFile(fileName, data) {
 
}

function init() {

init();
