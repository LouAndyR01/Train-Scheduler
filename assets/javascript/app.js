//  create Firebase database. //
//  get pertinent information for database information. //
//  initialize firebase. //
//  pull information from the input forms and create new rows in table. //
//  calculations for times of next arrival and frequency. //
//  be sure to comment, comment, comment. //

 
    // variables from the Firebase database. //
    var config = {
        apiKey: "AIzaSyBG160XV5tiSVhkMBbKlgJee42O2JgfjUc",
        authDomain: "train-scheduler-db903.firebaseapp.com",
        databaseURL: "https://train-scheduler-db903.firebaseio.com",
        projectId: "train-scheduler-db903",
        storageBucket: "train-scheduler-db903.appspot.com",
        messagingSenderId: "700791304460"
    };

    // initialize Firebase //
        firebase.initializeApp(config);

    var database = firebase.database();

    // current time display //
    var currentTime = null;

        function updateTime() {
        currentTime = moment().format("HH:mm:ss");
        $("#currentTime").html(currentTime);
    }
        $(document).ready(function() {
        updateTime();
        setInterval(updateTime, 1000);
    });

    // adding new train info to the table //
       $("#add-train-btn").on("click", function() {
        event.preventDefault();

    // pulling info from the bootstrap input forms //
    var trainName = $("#userTrainName").val().trim();
    var trainDestination = $("#userDestination").val().trim();
    var trainFirstTime = $("#firstTrainTime").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();
    
    // get values for the input fields //
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTime: trainFirstTime,
        frequency: trainFrequency,
    };

    // push train data to database //
        database.ref().push(newTrain);

    // reset bootstrap text forms //
        $("#userTrainName").val("");
        $("#userDestination").val("");
        $("#trainFrequency").val("");
        $("#firstTrainTime").val("");   
    });

        database.ref().on("child_added", function(childSnapshot) {
       
    // values for the new variables //
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainFirstTime = childSnapshot.val().firstTime;

  
    // moment js, for formated time //
    var trainTimeCalc = moment(trainFirstTime, "HH:mm").subtract(1, "years");

    // calculate difference, between start time and current time //
    var timeDifference = moment().diff(moment(trainTimeCalc), "minutes");

    // calculates the remaining minutes //
    var timeRemainder = timeDifference % trainFrequency;

    // the next train arrival time in minutes //
    var minNextTrain = trainFrequency - timeRemainder;

    // the next arrival time of train //
    var nextArrival = moment().add(minNextTrain, "minutes");
    var nextTrainArrival = moment(nextArrival).format("hh:mm");

    // append the rows of data for the new train data set //
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td class='text-center'>").text(trainFrequency),
        $("<td class='text-center'>").text(nextTrainArrival),
        $("<td class='text-center'>").text(minNextTrain), 
    );
        $("#train-table > tbody").append(newRow);   
    });    
