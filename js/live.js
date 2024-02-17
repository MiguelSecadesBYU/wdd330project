//DOM variables
var leagueSelect = document.querySelector("#leagueSelect");
var liveTable = document.querySelector("#liveTable");

//Function to build the live table row
function addLiveRow(data){
    //live row
    var liveRow = document.createElement('tr');
    liveRow.classList.add("live-row");

    //home team cell
    var homeTeamCell = document.createElement('td');
    homeTeamCell.classList.add("live-cell");

    //home team logo
    var homeLogo = document.createElement('img');
    homeLogo.src = data['teams']['home']['logo'];
    homeLogo.classList.add("team-logo");

    //home team name
    var homeName = document.createElement('span');
    homeName.innerHTML = data['teams']['home']['name'];

    homeTeamCell.appendChild(homeLogo);
    homeTeamCell.appendChild(homeName);

    //away team cell
    var awayTeamCell = document.createElement('td');
    awayTeamCell.classList.add("live-cell");

    //away team logo
    var awayLogo = document.createElement('img');
    awayLogo.src = data['teams']['away']['logo'];
    awayLogo.classList.add("team-logo");

    //away team name
    var awayName = document.createElement('span');
    awayName.innerHTML = data['teams']['away']['name'];

    awayTeamCell.appendChild(awayLogo);
    awayTeamCell.appendChild(awayName);

    //score cell
    var scoreCell = document.createElement('td');
    scoreCell.classList.add("live-cell");

    //score box
    var scoreBox = document.createElement('div');
    scoreBox.classList.add("score-box");

    //status box
    var statusBox = document.createElement('p');
    statusBox.classList.add("status-box");
    statusBox.innerHTML = data['fixture']['status']['long'];

        //time cell
    var timeCell = document.createElement('p');
    timeCell.classList.add("live-cell");
    timeCell.innerHTML = data['fixture']['status']['elapsed'] + "'";

    //score
    var score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " : "+ data['goals']['away'];

    scoreBox.appendChild(statusBox);
    scoreBox.appendChild(timeCell);
    scoreBox.appendChild(score);
    scoreCell.appendChild(scoreBox);

    //status cell
    var statusCell = document.createElement('td');
    statusCell.classList.add("live-cell");
    //status cell is empty

    //time cell
   // var timeCell = document.createElement('td');
   // timeCell.classList.add("live-cell");
   // timeCell.innerHTML = data['fixture']['status']['elapsed'] + "'";

    liveRow.appendChild(homeTeamCell);
    liveRow.appendChild(scoreCell);
    liveRow.appendChild(statusCell);
   // liveRow.appendChild(timeCell);
    liveRow.appendChild(awayTeamCell);
    liveTable.appendChild(liveRow);
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

function getLive(){
    //Clear the previous live
    liveTable.innerHTML = "";

    //Get the selected league id
    var leagueId = leagueSelect.value;

    //Fetch the data from the API
    fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?league="+leagueId+"&live=all", {
        "method" : "GET",
        "headers" : {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",  
        "x-rapidapi-key": "065a61a84cmsh3c1f8ad78d59d8fp19b1aajsn7f4f7d3832f5"
        }
    })

    .then(response => response.json().then(data =>{
        console.log(response);
        var liveList = data['response'];

        //Check if liveList is empty
        if(liveList.length == 0){
            //Show a message that there are no live matches
            liveTable.innerHTML = "<p class='NoMatches'>There is no game in play.</p>";
        } else {
            //Loop through the live matches and add them to the table
            for(var i=0;i<liveList.length;i++){
                addLiveRow(liveList[i]);
            }
        }
    }))
    .catch(err =>{
    // console.log(err);
    
    })

}


//Function to handle the change event of the league select
function handleChange(){
//Get the live matches for the selected league
getLive();
}

//Add the event listener to the league select
leagueSelect.addEventListener("change", handleChange);

//Get the initial live matches for the default league
getLive();
