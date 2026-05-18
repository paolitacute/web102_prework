/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++){

        // create a new div element, which will become the game card
        const div = document.createElement('div');

        // add the class game-card to the list
        div.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        div.innerHTML = `<img class="game-img" src="${games[i].img}" /> <h3>${games[i].name}</h3> <p>${games[i].description}</p> <p>Backers: ${games[i].backers}</p>`;
        
        // append the game to the games-container
        const header = document.getElementById('games-container');
        header.appendChild(div);
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.backers;
}, 0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${totalBackers.toLocaleString('en-US')}</p>`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.pledged;
}, 0)

// set inner HTML using template literal
raisedCard.innerHTML = `<p>$${totalRaised.toLocaleString('en-US')}</p>`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + 1;
}, 0)

gamesCard.innerHTML = `<p>${totalGames.toLocaleString('en-US')}</p>`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((game) => {
        return game.goal > game.pledged;
    })

    console.log(unfundedGames);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((game) => {
        return game.goal <= game.pledged;
    })

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames)
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numberUnfundedGames = (GAMES_JSON.filter((game) => {
                                return game.goal > game.pledged;
                            })).reduce((accumulator, game) => {
                                return accumulator + 1;
                                }, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of ${totalRaised.toLocaleString('en-US')} 
                    has been raised for ${totalGames.toLocaleString('en-US')} ${totalGames == 1 ? "game" : "games"}.
                    Currently, ${numberUnfundedGames.toLocaleString('en-US')} ${numberUnfundedGames == 1 ? "game remains" : "games remain"}
                    unfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const helpMessage = document.createElement('p');
helpMessage.innerHTML = displayStr;
descriptionContainer.appendChild(helpMessage);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [top1Game, top2Game, ...others] = sortedGames;

const {name : name1, description: desc1, pledge: pl1, goal: goal1, backers: bkrs1, img: img1} = top1Game;
const {name : name2, description: desc2, pledge: pl2, goal: goal2, backers: bkrs2, img: img2} = top2Game;


// create a new element to hold the name of the top pledge game, then append it to the correct element
let top1Name = document.createElement('p');
top1Name.innerHTML = `${name1}`;
firstGameContainer.appendChild(top1Name);

// do the same for the runner up item
let top2Name = document.createElement('p');
top2Name.innerHTML = `${name2}`;
secondGameContainer.appendChild(top2Name);


/************************************************************************************
 *  CUSTOMIZATION
 *  Making a modal window with all the information about a game when it is clicked
 */

// Get the modal
var modal = document.getElementById("Modal");

// Get the card clicked that opens the modal
var gameCards = document.querySelector('.game-card');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the popup with content
var popup = document.getElementById("popup");

// When the user clicks on a card, get the corresponding data and open the modal
document.addEventListener('click', function (event) {
  // Check if the clicked element (the target) matches your criteria
  if (event.target.closest('.game-card')) {
    const gameCard = event.target.closest('.game-card');

    const gameName = gameCard.querySelector('h3').textContent;

        const clickedGame = GAMES_JSON.filter((game) => {
            return game.name == gameName;
        })  
        
        popup.innerHTML = `<h3>${clickedGame[0].name}</h3>
                            <img class="game-img" src="${clickedGame[0].img}">
                            <p>${clickedGame[0].description}</p>
                            <p>Backers: ${clickedGame[0].backers}</p>
                            <h4>Goal: $${clickedGame[0].pledged} / $${clickedGame[0].goal}</h4>`;

        modal.style.display = "flex";
  }
});



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    console.log("close");
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

