//DOM variables
var leagueSelect = document.querySelector("#leagueSelect");
var resultsTable = document.querySelector("#resultsTable");

//Function to build the results table ui
function addResultsRow(data){
    //results row
    var resultsRow = document.createElement('div');
    resultsRow.classList.add("results-row");

    //home team box
    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");

    var homeLogo = document.createElement('img');
    var homeName = document.createElement('p');

    homeLogo.src = data['teams']['home']['logo'];
    homeName.innerHTML = data['teams']['home']['name'];

    //away team box
    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");

    var awayLogo = document.createElement('img');
    var awayName = document.createElement('p');

    awayLogo.src = data['teams']['away']['logo'];
    awayName.innerHTML = data['teams']['away']['name'];

    homeTeam.appendChild(homeLogo);
    homeTeam.appendChild(homeName);
    awayTeam.appendChild(awayLogo);
    awayTeam.appendChild(awayName);

    var score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " : "+ data['goals']['away'];
    resultsRow.appendChild(homeTeam);
    resultsRow.appendChild(score);
    resultsRow.appendChild(awayTeam);
    resultsTable.appendChild(resultsRow);
}

var matchesPerRound = {
    "140": 10, //Hypermotion League
    "39": 9, //Premier League
    "78": 9, //Bundesliga
    "61": 10, //Ligue 1
    "135": 10, //Calcio
    "88": 9, //Eredivisie
    "253": 13 //MLS
};

//Function to get the results data from the API
function getResults(){
    //Clear the previous results
    resultsTable.innerHTML = "";

    //Get the selected league id
    var leagueId = leagueSelect.value;

    //Get the number of matches per round for the selected league
    var last = matchesPerRound[leagueId];

    //Fetch the data from the API
    fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?league="+leagueId+"&last="+last+"&timezone=Europe/Madrid", {
        "method" : "GET",
        "headers" : {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",  
        "x-rapidapi-key": "065a61a84cmsh3c1f8ad78d59d8fp19b1aajsn7f4f7d3832f5"
        }
    })

    .then(response => response.json().then(data =>{
        console.log(response);
        var resultsList = data['response'];

        //Loop through the results and add them to the table
        for(var i=0;i<resultsList.length;i++){
            addResultsRow(resultsList[i]);
        }
    }))
    .catch(err =>{
       // console.log(err);
        
    })

}

//Function to handle the change event of the league select
function handleChange(){
    //Get the results for the selected league
    getResults();
}

//Add the event listener to the league select
leagueSelect.addEventListener("change", handleChange);

//Get the initial results for the default league
getResults();
