// firebase information //
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBG160XV5tiSVhkMBbKlgJee42O2JgfjUc",
    authDomain: "train-scheduler-db903.firebaseapp.com",
    databaseURL: "https://train-scheduler-db903.firebaseio.com",
    projectId: "train-scheduler-db903",
    storageBucket: "train-scheduler-db903.appspot.com",
    messagingSenderId: "700791304460"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  function currentTime() {
    var current = moment().format('LT');
    $("#currentTime").text("The current time is: " + current);
    //updates to current time //
    setTimeout(currentTime, 1000 * 60);
  };
  currentTime();

//  adding new train info to the table //
$("submit-btn").on("click", function(event){
    event.preventDefault();

  
