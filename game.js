  var firebaseConfig = {
    apiKey: "AIzaSyD06C17YbLrmUy-29S0nfJSQ0tmCSHX-RM",
    authDomain: "rock-paper-scissors-374aa.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-374aa.firebaseio.com",
    projectId: "rock-paper-scissors-374aa",
    storageBucket: "rock-paper-scissors-374aa.appspot.com",
    messagingSenderId: "1085853525652",
    appId: "1:1085853525652:web:6a6f7116e308ea1a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var playerObject = {

    requests:[],amountOfRequests : 0,wins : 0, losses : 0, username : "",playerNumber : 0,goToGame : false, 
    gameObject : {rock: false, paper: false, scissors : false},opponentReady : false,opponent : {},picked : false
    
};
var players = [];
database.ref("/playerArray").on("value",function(data){
    players = data.val().playerArray; console.log(players);
});

$(".join").on("click",function(){

    playerObject.username = document.getElementById("username").value;
    players.push(playerObject);
    playerObject.playerNumber = players.length-1;
    database.ref("mostRecentPlayer").set({mostRecentPlayer: playerObject});
    database.ref("/playerArray").set({playerArray: players});
    location.href = "Lobby.html";

});

console.log(playerObject.username);