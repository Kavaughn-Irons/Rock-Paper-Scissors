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

var data = database.ref("/mostRecentPlayer");
var dataTwo = database.ref("/playerArray");
var playerNum = 0;
var thisObject = {};
var playButtonClassNum = 0;
var acceptButtonClassNum = 0;
data.once("value",function(data){
    console.log(data.val());
    playerNum = data.val().mostRecentPlayer.playerNumber;
    $(".header-username").text("Username: " + data.val().mostRecentPlayer.username);
    $(".header-wins").text("wins: " + data.val().mostRecentPlayer.wins);
    $(".header-losses").text("losses: " + data.val().mostRecentPlayer.losses);
},function(data){
    console.log(data);
});
dataTwo.on("value",function(data){
playButtonClassNum = 0;
acceptButtonClassNum = 0;    
console.log(data.val().playerArray);
$(".lobby-body").empty();
$(".requests-body").empty();    
for(var i = 0; i < data.val().playerArray.length; i++){

    if(i !== playerNum){
    $(".lobby-body").append("<div class='row'><div class='col-xl-3' style='margin-top: 10px;'>Username: "+data.val().playerArray[i].username+"</div><div class='col-xl-3' style='margin-top: 10px;'>Wins: "+data.val().playerArray[i].wins+"</div><div class='col-xl-3' style='margin-top: 10px;'>Losses: "+data.val().playerArray[i].losses+"</div><div class='col-xl-3'><button style='margin-top: 5px;' type='button' class='btn btn-success playButton"+playButtonClassNum+"'>Play</button></div></div>");
    
    $(".playButton"+playButtonClassNum).on("click",function(){
        
        var classNumber = this.getAttribute("class").substring(this.getAttribute("class").length-1,this.getAttribute("class").length);
        console.log(classNumber);    
        var sendObject = data.val().playerArray[playerNum];
  
database.ref("/playerArray/playerArray/"+String(classNumber)+"/requests/"+data.val().playerArray[classNumber].amountOfRequests).set(sendObject);
database.ref("/playerArray/playerArray/"+String(classNumber)+"/amountOfRequests/").set(data.val().playerArray[classNumber].amountOfRequests+1);   


        
        });   
    }
    playButtonClassNum++;
}
    try{
    for(var i = 0; i < data.val().playerArray[playerNum].requests.length; i++){
    var simpleUsernme = data.val().playerArray[playerNum].requests[i].username;
    var simpleWins = data.val().playerArray[playerNum].requests[i].wins; 
    var simpleLosses = data.val().playerArray[playerNum].requests[i].losses; 
    $(".requests-body").append("<div class='row'><div class='col-xl-3' style='margin-top: 10px;'>Username: "+simpleUsernme+"</div><div class='col-xl-3' style='margin-top: 10px;'>Wins: "+simpleWins+"</div><div class='col-xl-3' style='margin-top: 10px;'>Losses: "+simpleLosses+"</div><div class='col-xl-3'><button style='margin-top: 5px;' type='button' class='btn btn-success acceptButton"+acceptButtonClassNum+"'>Accept</button></div></div>");
    
    $(".acceptButton"+acceptButtonClassNum).on("click",function(){
        console.log(this)
        var opponentId = this.getAttribute("class").substring(this.getAttribute("class").length-1,this.getAttribute("class").length);
        var fullOpponentId = data.val().playerArray[playerNum].requests[opponentId].playerNumber;
        var opponentObject = data.val().playerArray[fullOpponentId];                           

        console.log(opponentObject,"here!");
        database.ref("/playerArray/playerArray/"+String(playerNum)+"/amountOfRequests/").set(0);
        database.ref("/playerArray/playerArray/"+String(playerNum)+"/requests/").set([]);
        database.ref("/playerArray/playerArray/"+String(playerNum)+"/opponent/").set(opponentObject);
        var getObject = database.ref("/playerArray/playerArray/"+String(playerNum))

        getObject.once("value",function(getData){thisObject = getData.val();},function(getData){});
        console.log(thisObject,"This one!")
        database.ref("/playerArray/playerArray/"+String(fullOpponentId)+"/opponent/").set(thisObject);        
        database.ref("/playerArray/playerArray/"+String(fullOpponentId)+"/goToGame/").set(true);


        
        var dataThree = database.ref("/playerArray/playerArray/"+fullOpponentId);
        dataThree.on("value",function(dataTwo){
            

            
            if(dataTwo.val().goToGame === true){
                var countDown = 2;
                var delay = setInterval(function(){
                
                
                console.log(countDown);
                    if(countDown === 0){    
                    console.log("here!!!");
                    firebase.database().ref("/playerArray/playerArray/"+playerNum+"/goToGame/").set(true); 
                    clearInterval(delay);
                    }
                    countDown = countDown - 1;
                },1000);
                   
            }
        
        
        },function(dataTwo){});

    });
        
     acceptButtonClassNum++;   
    }
    
    }catch(error){
        console.log("No Requests To Display!");
    }
    
    if(data.val().playerArray[playerNum].goToGame === true){
   
        database.ref("/mostRecentPlayer/mostRecentPlayer/").set(data.val().playerArray[playerNum]).then(location.href = "arena.html");
    }

},function(data){
    console.log(data);
});