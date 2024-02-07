const year = document.querySelector('#year');
year.innerHTML = new Date().getFullYear();

document.getElementById("modify").innerHTML = document.lastModified

function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x= document.getElementById('hamburgerBtn')
x.onclick = toggleMenu;

//DOM variables
var elapsedTime = document.querySelector("#elapsed");
var homeTeamLogo = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamLogo = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatchGoals = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");


//Function to build the match tiles ui
function addMatchTile(data){
    //match div
    var matchTile = document.createElement('div');
    matchTile.classList.add("match-tile");

    //home team box
    var homeTeam = document.createElement('div');
    homeTeamLogo.classList.add("team");

    var homeTileLogo = document.createElement('img');
    var homeTileName = document.createElement('p');

    homeTileLogo.src = data['teams']['home']['logo'];
    homeTileName.innerHTML = data['teams']['home']['name'];

    //away team box
    var awayTeam = document.createElement('div');
    awayTeamLogo.classList.add("team");

    var awayTileLogo = document.createElement('img');
    var awayTileName = document.createElement('p');

    awayTileLogo.src = data['teams']['away']['logo'];
    awayTileName.innerHTML = data['teams']['away']['name'];

    homeTeam.appendChild(homeTeamLogo);
    homeTeam.appendChild(homeTeamName);
    awayTeam.appendChild(awayTeamLogo);
    awayTeam.appendChild(awayTeamName);

    var score = document.createElement('p');
    score.innerHTML = data['goals'] + " : "+ data['goals']['away'];
    matchTile.appendChild(homeTeam);
    matchTile.appendChild(score);
    matchTile.appendChild(awayTeam);
}


//Fetching function
function getData(){
    fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all", {
        "method" : "GET",
        "headers" : {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",  
        "x-rapidapi-key": "065a61a84cmsh3c1f8ad78d59d8fp19b1aajsn7f4f7d3832f5"
        }
    })
    .then(response => response.json().then(data =>{
        console.log(response);
        var matchesList = data['response'];

        var fixture = matchesList[0]['fixture'];
        var goals = matchesList[0]['goals'];
        var teams = matchesList[0]['teams'];

        //Render thedata in the page
        elapsedTime.innerHTML = fixture['status']['elapsed'] + "'";
        homeTeamLogo.src = teams['home']['logo'];
        homeTeamName.innerHTML = teams['home']['name'];
        awayTeamLogo.src = teams['away']['logo'];
        awayTeamName.innerHTML = teams['away']['name'];
        lastMatchGoals.innerHTML = goals['home'] + " : " + goals['away'];

        for(var i=1;i<matchesList.length;i++){
            addMatchTile(matchesList[i]);
        }
    }))
    .catch(err =>{
       // console.log(err);
        
    })

}//27:43

getData();