//This assignment will require functions to run the inquire protocol
//for user input, and grab from the github API (using axios), to get  
//the Username, Color, and Star information.
//Functions to compile the information, generate HTML, and create and
//save the HTML as a PDF.
//-------------------------------------------------------------------//

//**Required Dependencies **/
const inquirer = require("inquirer");
const createHTML = require("./generateHTML.js");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const puppeteer = require("puppeteer");
const asyncWriter = util.promisify(fs.writeFile);

// function init();

//Inquirer questions:
// function getDataInput(){
// inquirer.prompt([{
//     type: "input",
//     name: "username",
//     message: "GitHub username please:"
// }, 

// {
//     type: "list",
//     message: "Pick a color, ANY color... out of these four:",
//     name: "color",
//     choices: ["green", "blue", "red", "pink"]

// }])

// return username, color;
// };

//Previous function split into two:
function getUsername() {
  let username = inquirer.prompt({
    type: "input",
    name: "username",
    message: "GitHub username please:"
  })
  return username
};

function getColor() {
  let color = inquirer.prompt({
    type: "list",
    message: "Pick a color, ANY color... out of these four:",
    name: "color",
    choices: ["green", "blue", "red", "pink"]
  })
  return color
};



//Previous function (getAxiosData) split into two functions:
//Pull information with GitHub's API via axios call.
function getAxiosProfile(username) {
  const profile = axios.get(`https://api.github.com/users/${username}`);
  // const getStar = axios.get(`https://api.github.com/users/${username}/starred`);
  return profile;
};

function getAxiosStar(username) {
  // const profile = axios.get(`https://api.github.com/users/${username}`);
  const getStar = axios.get(`https://api.github.com/users/${username}/starred`);
  return getStar;
};

async function init() {
  try {
    let { username } = await getUsername();
    let { color } = await getColor();
    
    let profile = await getAxiosProfile(username);
    // const {color} = await getDataInput();
    let getStar = await getAxiosStar(username);
    let starNumber = getStar.data.length;
    profile.data.starCount = starNumber;
    profile.data.color = color;
    // let {data} = await getAxiosData(profile);
    // let starCount = getStar.data.length
    // data.color = color;
    // data.starCount = starCount;

    const generator = createHTML(profile.data);
    asyncWriter(`${username}.html`, generator).then(function(){
        console.log("Congrats, it's an HTML!");
    });
    // call function that gets the pdf
    getPDF(generator, username);

  } catch (err) {
    console.log(err);
  }
}

async function getPDF() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "file:" + __dirname,
      console.log(__dirname), { waitUntil: "networkidle2" }
    );
    await page.pdf({
      path: `${profile}.pdf`,
      pageRanges: "1",
      format: "A4",
      printBackground: true
    });
    await browser.close();
    console.log(`PDF Created at ${profile}.pdf`);
  } catch (err) {
    console.log(err);
  }
}

init();




// function writeToFile(fileName, data) {

// }

// function init() {

// init();
