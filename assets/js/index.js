//This assignment will require functions to run the inquire protocol
//for user input, and grab from the github API (using axios), to get  
//the Username, Color, and Star information.
//Functions to compile the information, generate HTML, and create and
//save the HTML as a PDF.
//-------------------------------------------------------------------//

//**Required Dependencies **/
const inquirer = require("inquirer");
const generateHTML = require("./generate");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const puppeteer = require("puppeteer");
const asyncProcess = util.promisify(fs.writeFile);

const questions = [
  
];

function writeToFile(fileName, data) {
 
}

function init() {

init();
