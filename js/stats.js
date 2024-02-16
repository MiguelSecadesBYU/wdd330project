//DOM variables
const leagueSelect1 = document.getElementById("leagueSelect1");
const leagueStatsTable = document.getElementById("leagueStatsTable");

//Function to build the league stats table ui
function addLeagueStatsRow(data){
    //Create a new row element
    const leagueStatsRow = document.createElement("div");
    leagueStatsRow.className = "stats-row";

    //Create a new stat name element
    const statName = document.createElement("div");
    statName.className = "stat-name";
    statName.textContent = data.name;

    //Create a new stat value element
    const statValue = document.createElement("div");
    statValue.className = "stat-value";
    statValue.textContent = data.value;

    //Append the stat name and value elements to the row element
    leagueStatsRow.appendChild(statName);
    leagueStatsRow.appendChild(statValue);

    //Append the row element to the league stats table element
    leagueStatsTable.appendChild(leagueStatsRow);
}

//Function to get the league stats data from the API
function getLeagueStats(){
    //Clear the previous stats
    leagueStatsTable.innerHTML = "";

    //Get the selected league id
    const leagueId = leagueSelect1.value;

    //Fetch the data from the API
    fetch("https://api-football-v1.p.rapidapi.com/v3/leagues/statistics?league="+leagueId+"&season=2022", {
        "method" : "GET",
        "headers" : {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",  
        "x-rapidapi-key": "065a61a84cmsh3c1f8ad78d59d8fp19b1aajsn7f4f7d3832f5"
        }
    })
    .then(response => response.json().then(data =>{
        console.log(response);
        var leagueStatsList = data['response'];

        //Loop through the league stats and add them to the table
        for(var i=0;i<leagueStatsList.length;i++){
            addLeagueStatsRow(leagueStatsList[i]);
        }
    }))
    .catch(err =>{
        //console.log(err);
        
    })
}

//Function to handle the change event of the league select 1
function handleChange1(){
    //Get the league stats for the selected league
    getLeagueStats();
}

//Add the event listener to the league select 1
leagueSelect1.addEventListener("change", handleChange1);

//Get the initial league stats for the default league
getLeagueStats();

