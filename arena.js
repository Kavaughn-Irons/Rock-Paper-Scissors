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
var mostRecentObj = {};
var preMadeWins = 0;
var preMadeLosses = 0;
var added = false;
var username = "";
var opponent = "";
var picked = false;
var opponentPick = "";
var ourPick = "";
database.ref("/mostRecentPlayer/mostRecentPlayer/").once("value",function(data){


database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/goToGame").set(true);    
    
preMadeWins = data.val().wins+1;
preMadeLosses = data.val().losses+1;    
    username = data.val().username;
    opponent = data.val().opponent.username;
    $(".username").text("Username: " + username);
    $(".opponent").text("Opponent: " + opponent);
    
var getOpponent = database.ref("/playerArray/playerArray/"+data.val().opponent.playerNumber);

        $(".Rock").on("click",function(){
            if(picked === false){
            database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/gameObject/rock/").set(true);
            database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/picked/").set(true);
            picked = true;
            }
            
        });

        $(".Paper").on("click",function(){
            if(picked === false){
            database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/gameObject/paper/").set(true);
            database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/picked/").set(true);
            picked = true;
            }
        });

        $(".Scissors").on("click",function(){
            if(picked === false){
            database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/gameObject/scissors/").set(true);
            database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/picked/").set(true);
            picked = true;
            }
        });      
    
getOpponent.on("value",function(getOpponentData){
    console.log("something changed!");
    if(getOpponentData.val().picked === true){
    
        if(getOpponentData.val().gameObject.rock === true){
        opponentPick = "rock";   
        }
        if(getOpponentData.val().gameObject.paper === true){
        opponentPick = "paper";   
        }
        if(getOpponentData.val().gameObject.scissors === true){
        opponentPick = "scissors";   
        }
        
        
        getOurInfo = database.ref("/playerArray/playerArray/"+data.val().playerNumber);
        
        getOurInfo.on("value",function(getOurData){
            if(getOurData.val().gameObject.rock === true){
            ourPick = "rock";   
            }
            if(getOurData.val().gameObject.paper === true){
            ourPick = "paper";   
            }
            if(getOurData.val().gameObject.scissors === true){
            ourPick = "scissors";   
            }
            if(getOpponentData.val().picked === true && getOurData.val().picked === true){
  
                if(opponentPick === "rock"){
                   if(ourPick === "rock"){
                    
                       
                       $(".win-lose").text("Tie!")
                       $(".lobby-button").html("<button type'button' class='btn btn-primary created-lobby-button' style='height: 70px; width: 200px;'><h1>Lobby</h1></button>")
                       
                       $(".created-lobby-button").on("click",function(){
                           getOurInfo.once("value",function(lobbyData){
                           database.ref("/mostRecentPlayer/mostRecentPlayer/").set(lobbyData.val())
                           location.href = "lobby.html"
                           },function(lobbyData){});

                       });
                   }
                   if(ourPick === "paper"){
                   
                       getOurInfo.on("value",function(lobbyData){
                        mostRecentObj = lobbyData.val()
                       
                       },function(lobbyData){}); 
                       
                       database.ref("/playerArray/playerArray/"+getOurData.val().playerNumber+"/wins/").set(preMadeWins);
                       
                       $(".win-lose").text("Winner!")
                       $(".lobby-button").html("<button type'button' class='btn btn-primary created-lobby-button' style='height: 70px; width: 200px;'><h1>Lobby</h1></button>")
                       $(".created-lobby-button").on("click",function(){
                            database.ref("/mostRecentPlayer/mostRecentPlayer/").set(mostRecentObj)
                           location.href = "lobby.html"
                       });
    
                   }
                   if(ourPick === "scissors"){

                       getOurInfo.on("value",function(lobbyData){
                        mostRecentObj = lobbyData.val()
                       
                       },function(lobbyData){}); 
                       
                       database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/losses/").set(preMadeLosses);
                       
                       $(".win-lose").text("Loser!")
                       $(".lobby-button").html("<button type'button' class='btn btn-primary created-lobby-button' style='height: 70px; width: 200px;'><h1>Lobby</h1></button>")
                      
                       $(".created-lobby-button").on("click",function(){
                            database.ref("/mostRecentPlayer/mostRecentPlayer/").set(mostRecentObj)
                           location.href = "lobby.html"
                       });
                   }
                }
                
                if(opponentPick === "paper"){
                   if(ourPick === "rock"){

                       getOurInfo.on("value",function(lobbyData){
                        mostRecentObj = lobbyData.val()
                       
                       },function(lobbyData){}); 
                       
                       database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/losses/").set(preMadeLosses);
                       
                       $(".win-lose").text("Loser!")
                       $(".lobby-button").html("<button type'button' class='btn btn-primary created-lobby-button' style='height: 70px; width: 200px;'><h1>Lobby</h1></button>")
                       
                       $(".created-lobby-button").on("click",function(){
                            database.ref("/mostRecentPlayer/mostRecentPlayer/").set(mostRecentObj)
                           location.href = "lobby.html"
                       });
                   }
                   if(ourPick === "paper"){
             
                       getOurInfo.on("value",function(lobbyData){
                        mostRecentObj = lobbyData.val()
                       
                       },function(lobbyData){}); 
                       
                       $(".win-lose").text("Tie!")
                       $(".lobby-button").html("<button type'button' class='btn btn-primary created-lobby-button' style='height: 70px; width: 200px;'><h1>Lobby</h1></button>")
                       
                       $(".created-lobby-button").on("click",function(){
                            database.ref("/mostRecentPlayer/mostRecentPlayer/").set(mostRecentObj)
                           location.href = "lobby.html"
                       });
                   }
                   if(ourPick === "scissors"){

                       getOurInfo.on("value",function(lobbyData){
                        mostRecentObj = lobbyData.val()
                       
                       },function(lobbyData){}); 
                       
                       
                       database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/wins/").set(preMadeWins);
                       
                       $(".win-lose").text("Winner!")
                       $(".lobby-button").html("<button type'button' class='btn btn-primary created-lobby-button' style='height: 70px; width: 200px;'><h1>Lobby</h1></button>")
                       
                       $(".created-lobby-button").on("click",function(){
                            database.ref("/mostRecentPlayer/mostRecentPlayer/").set(mostRecentObj)
                           location.href = "lobby.html"
                       });
                   }
                }
                
                if(opponentPick === "scissors"){
                   if(ourPick === "rock"){
                
                       getOurInfo.on("value",function(lobbyData){
                        mostRecentObj = lobbyData.val()
                       
                       },function(lobbyData){}); 
                       
                       database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/wins/").set(preMadeWins);
                       
                       $(".win-lose").text("Winner!")
                       $(".lobby-button").html("<button type'button' class='btn btn-primary created-lobby-button' style='height: 70px; width: 200px;'><h1>Lobby</h1></button>")

                       $(".created-lobby-button").on("click",function(){
                            database.ref("/mostRecentPlayer/mostRecentPlayer/").set(mostRecentObj)
                           location.href = "lobby.html"
                       });
                   }
                   if(ourPick === "paper"){
             
                       getOurInfo.on("value",function(lobbyData){
                        mostRecentObj = lobbyData.val()
                       
                       },function(lobbyData){}); 
                       
                       database.ref("/playerArray/playerArray/"+data.val().playerNumber+"/losses/").set(preMadeLosses);
                       
                       $(".win-lose").text("Loser!")
                       $(".lobby-button").html("<button type'button' class='btn btn-primary created-lobby-button' style='height: 70px; width: 200px;'><h1>Lobby</h1></button>")

                       $(".created-lobby-button").on("click",function(){
                            database.ref("/mostRecentPlayer/mostRecentPlayer/").set(mostRecentObj)
                           location.href = "lobby.html"
                       });
                       
                   }
                   if(ourPick === "scissors"){
 
                       getOurInfo.on("value",function(lobbyData){
                        mostRecentObj = lobbyData.val()
                       
                       },function(lobbyData){}); 
                       
                       $(".win-lose").text("Tie!")
                       $(".lobby-button").html("<button type'button' class='btn btn-primary created-lobby-button' style='height: 70px; width: 200px;'><h1>Lobby</h1></button>")

                       $(".created-lobby-button").on("click",function(){
                            database.ref("/mostRecentPlayer/mostRecentPlayer/").set(mostRecentObj)
                           location.href = "lobby.html"
                       });
                   }
                }
            }
        },function(getOurData){});
        
        
        
    }
},function(getOpponentData){});
 

});



