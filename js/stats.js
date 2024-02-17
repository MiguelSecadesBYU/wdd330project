// Constants and global variables
let LEAGUE_ID = "140"; // The ID of the league you want to show, for example, La Liga
const SEASON = "2023"; // The season you want to show, for example, 2023
const STAGE = "Regular Season"; // The stage you want to show, for example, Regular Season

// DOM elements
const leagueSelect = document.getElementById("leagueSelect");
const leagueLogo = document.getElementById("league-logo");
const leagueName = document.getElementById("league-name");
const topScorerTeamLogo = document.getElementById("top-scorer-team-logo");
const topScorerTeamName = document.getElementById("top-scorer-team-name");
const topScorerTeamGoals = document.getElementById("top-scorer-team-goals");
const bottomScorerTeamLogo = document.getElementById("bottom-scorer-team-logo");
const bottomScorerTeamName = document.getElementById("bottom-scorer-team-name");
const bottomScorerTeamGoals = document.getElementById("bottom-scorer-team-goals");
const topScorerPlayerName = document.getElementById("top-scorer-player-name");
const topScorerPlayerTeam = document.getElementById("top-scorer-player-team");
const topScorerPlayerGoals = document.getElementById("top-scorer-player-goals");
const topKeeperPlayerName = document.getElementById("top-keeper-player-name");
const topKeeperPlayerTeam = document.getElementById("top-keeper-player-team");
const topKeeperPlayerGoals = document.getElementById("top-keeper-player-goals");

// Function to make a request to the API
function fetchAPI(endpoint, params) {
  // Build the URL with the parameters
  let url = new URL(API_URL + endpoint);
  url.search = new URLSearchParams({ ...params, timezone: "Europe/Madrid" }).toString();

// Create the options of the request
let options = {
    method: "GET",
    headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",  
        "x-rapidapi-key": "065a61a84cmsh3c1f8ad78d59d8fp19b1aajsn7f4f7d3832f5"
    },
  };
  

  // Make the request and return a promise
  return fetch(url, options)
    .then((response) => {
      // Check if the response is correct
      if (response.ok) {
        // Return the data in JSON format
        return response.json();
      } else {
        // Throw an error with the status and message of the response
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    })
    .catch((error) => {
      // Show the error in the console
      console.error(error);
    });
}

// Function to show the league name and logo
function showLeagueInfo() {
  // Make a request to the API to get the league data
  fetchAPI("/leagues", { id: LEAGUE_ID })
    .then((data) => {
      // Check if there is data
      if (data && data.results > 0) {
        // Get the first result
        let league = data.response[0].league;

        // Assign the name and logo of the league to the HTML elements
        leagueLogo.src = league.logo;
        leagueLogo.alt = `Logo of ${league.name}`;
        leagueName.textContent = league.name;
      } else {
        // Show an error message
        leagueName.textContent = "No data found for the league";
      }
    })
    .catch((error) => {
      // Show an error message
      leagueName.textContent = "An error occurred while getting the league data";
    });
}

// Function to show the team that has scored the most goals
function showTopScorerTeam() {
  // Make a request to the API to get the standings data
  fetchAPI("/standings", { league: LEAGUE_ID, season: SEASON, stage: STAGE })
    .then((data) => {
      // Check if there is data
      if (data && data.results > 0) {
        // Get the first result
        let standings = data.response[0].league.standings[0];

        // Sort the teams by the number of goals for from highest to lowest
        standings.sort((a, b) => b.goals.for - a.goals.for);

        // Get the first team
        let team = standings[0].team;

        // Assign the name, logo and number of goals of the team to the HTML elements
        topScorerTeamLogo.src = team.logo;
        topScorerTeamLogo.alt = `Logo of ${team.name}`;
        topScorerTeamName.textContent = team.name;
        topScorerTeamGoals.textContent = `Goals scored: ${standings[0].goals.for}`;
      } else {
        // Show an error message
        topScorerTeamName.textContent = "No data found for the team that has scored the most goals";
      }
    })
    .catch((error) => {
      // Show an error message
      topScorerTeamName.textContent = "An error occurred while getting the team that has scored the most goals";
    });
}

// Function to show the team that has conceded the most goals
function showBottomScorerTeam() {
  // Make a request to the API to get the standings data
  fetchAPI("/standings", { league: LEAGUE_ID, season: SEASON, stage: STAGE })
    .then((data) => {
      // Check if there is data
      if (data && data.results > 0) {
        // Get the first result
        let standings = data.response[0].league.standings[0];

        // Sort the teams by the number of goals against from highest to lowest
        standings.sort((a, b) => b.goals.against - a.goals.against);

        // Get the first team
        let team = standings[0].team;

        // Assign the name, logo and number of goals of the team to the HTML elements
        bottomScorerTeamLogo.src = team.logo;
        bottomScorerTeamLogo.alt = `Logo of ${team.name}`;
        bottomScorerTeamName.textContent = team.name;
        bottomScorerTeamGoals.textContent = `Goals conceded: ${standings[0].goals.against}`;
      } else {
        // Show an error message
        bottomScorerTeamName.textContent = "No data found for the team that has conceded the most goals";
      }
    })
    .catch((error) => {
      // Show an error message
      bottomScorerTeamName.textContent = "An error occurred while getting the team that has conceded the most goals";
    });
}

// Function to show the top scorer
function showTopScorerPlayer() {
  // Make a request to the API to get the top scorers data
  fetchAPI("/players/topscorers", { league: LEAGUE_ID, season: SEASON })
    .then((data) => {
      // Check if there is data
      if (data && data.results > 0) {
        // Get the first result
        let player = data.response[0].player;
        let statistics = data.response[0].statistics[0];

        // Assign the name, team and number of goals of the player to the HTML elements
        topScorerPlayerName.textContent = player.name;
        topScorerPlayerTeam.textContent = `Team: ${statistics.team.name}`;
        topScorerPlayerGoals.textContent = `Goals scored: ${statistics.goals.total}`;
      } else {
        // Show an error message
        topScorerPlayerName.textContent = "No data found for the top scorer";
      }
    })
    .catch((error) => {
      // Show an error message
      topScorerPlayerName.textContent = "An error occurred while getting the top scorer";
    });
}

// Function to show the top goalkeeper
function showTopKeeperPlayer() {
  // Make a request to the API to get the players data
  fetchAPI("/players", { league: LEAGUE_ID, season: SEASON, position: "Goalkeeper" })
    .then((data) => {
      // Check if there is data
      if (data && data.results > 0) {
        // Get the results
        let players = data.response;

        // Sort the players by the number of goals conceded from lowest to highest
        players.sort((a, b) => a.statistics[0].goals.conceded - b.statistics[0].goals.conceded);

        // Get the first player
        let player = players[0].player;
        let statistics = players[0].statistics[0];

        // Assign the name, team and number of goals of the player to the HTML elements
        topKeeperPlayerName.textContent = player.name;
        topKeeperPlayerTeam.textContent = `Team: ${statistics.team.name}`;
        topKeeperPlayerGoals.textContent = `Goals conceded: ${statistics.goals.conceded}`;
      } else {
        // Show an error message
        topKeeperPlayerName.textContent = "No data found for the top goalkeeper";
      }
    })
    .catch((error) => {
      // Show an error message
      topKeeperPlayerName.textContent = "An error occurred while getting the top goalkeeper";
    });
}

//Function to handle the change event of the league select
function handleChange(){
    showLeagueInfo();
    showTopScorerTeam();
    showBottomScorerTeam();
    showTopScorerPlayer();
    showTopKeeperPlayer();
}
    
//Add the event listener to the league select
leagueSelect.addEventListener("change", handleChange);

// Call the functions when the page loads
showLeagueInfo();
showTopScorerTeam();
showBottomScorerTeam();
showTopScorerPlayer();
showTopKeeperPlayer();
