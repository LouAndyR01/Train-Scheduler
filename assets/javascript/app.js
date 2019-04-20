//  create Firebase database. //
//  get pertinent information for database information. //
//  initialize firebase. //
//  pull information from the input forms and create new rows in table. //
//  calculations for times of next arrival and frequency. //

 
    //  variables from the Firebase database. //
    var config = {
        apiKey: "AIzaSyBG160XV5tiSVhkMBbKlgJee42O2JgfjUc",
        authDomain: "train-scheduler-db903.firebaseapp.com",
        databaseURL: "https://train-scheduler-db903.firebaseio.com",
        projectId: "train-scheduler-db903",
        storageBucket: "train-scheduler-db903.appspot.com",
        messagingSenderId: "700791304460"
    };

    //  Initializae Firebase
    firebase.initializeApp(config);

    var database = firebase.database();

      //  adding new train info to the table //
      $("#add-train-btn").on("click", function() {
        event.preventDefault();

    // pulling info from the bootstrap input forms //
    var trainName = $("#userTrainName").val().trim();
    var trainDestination = $("#userDestination").val().trim();
    var trainFirstTime = $("#firstTimeInput").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();

    // holding train data //
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTime: trainFirstTime,
        frequency: trainFrequency,
    };

    // push train data to database //
    database.ref().push(newTrain);

        alert("Your train has been added");

    // reset bootstrap text forms //
        $("#userTrainName").val("");
        $("#userDestination").val("");
        $("#firstTimeInput").val("");
        $("#trainFrequency").val("");
    });

    database.ref().on("child_added", function(childSnapshot) {
       
    // values for the new variables //
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().firstTime;
    var trainFrequency = childSnapshot.val().frequency;
  
     // moment js, for formated time //
    var trainTimeCalc = moment(trainFirstTime, "HH:mm").subtract(1, "years");


    // calculate difference, between start time and current time //
    var diffTime = moment().diff(moment(trainTimeCalc), "minutes");

    // calculates the remaining minutes //
    var tRemainder = diffTime % trainFrequency;

    // the next train arrival time in minutes //
    var minAway = trainFrequency - tRemainder;

    // the next arrival time of train
    var nexTArrival = moment().add(minAway, "minutes");
    var nextTrainArrival = moment(nexTArrival).format("hh:mm");

    // append the rows of data for the new train data //
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrainArrival),
        $("<td>").text(minAway),  
    );
        $("#train-table > tbody").append(newRow);   
    });

