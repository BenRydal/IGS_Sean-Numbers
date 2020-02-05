function setData() {
  setGUIData();
  setSpeakerData();
  // setVideoData();
  processData();
  animationMaxValue = Math.min(...rowCounts); // set animationMaxVlaue to the smallest data file
}

function setGUIData() {
  timelineStart = width * 0.4638; // scale factors
  timelineEnd = width * 0.9638;
  timelineHeight = height * .8466;
  buttonSpacing = 20;
  buttonWidth = 20;
  speakerKeysHeight = timelineHeight + 30;
  additionalKeysHeight = timelineHeight + 75;
  bugPrecision = 5;
  bugSize = 25;
}

// Set hash values to associate colors to speakers/movement paths
function setSpeakerData() {
  speakerColor["T"] = 0;
  speakerColor["S"] = 1;
  speakerColor["M"] = 2;
  speakerColor["C"] = 3;
  speakerColor["N"] = 4;
}

//void setVideoData() {
//  ballVideo = new Movie(this, "ball.mp4");
//  ballVideo.volume(0); // mute so no click when program starts
//  ballVideo.play();
//  videoDuration = ballVideo.duration();
//  ballVideo.stop();
//}

var dataTables = [];
var fileNames;

// Loads CSV file into p5.Table objects so that they can manipulated later
function preloadCSVs() {
  var filePath = "data/interaction/";
  fileNames = ['Cassandra.csv', 'Mei.csv', 'Nathan.csv', 'Sean.csv', 'Teacher.csv'];
  for (var i = 0; i < fileNames.length; i++) { // loop through all files in directory
    var fileName = fileNames[i];
    var dataTable = loadTable(filePath + fileName, "header");
    dataTables.push(dataTable);
  }
}

function processData() {
  for (var i = 0; i < dataTables.length; i++) { // loop through all files in directory
    loadDataTable(dataTables[i], fileNames[i].charAt(0)); // Use first letter of file name to associate with speaker
  }
}

// Loads each speaker p5.Table as Path object to paths ArrayList. Path object is a person/path with movement and conversation Point objects, speaker and boolean show
function loadDataTable(data, speaker) {
  var movement = []; // holds location data for each path
  var conversation = []; // holds conversaton data and location data for conversation for each path
  var rowCount = data.getRowCount();
  var samplingRate = 40;
  rowCounts.push(rowCount/samplingRate); // add number of data points to rowCounts list to set animation

  // loop through table
  for (var i = 0; i < rowCount; i++) {
    // if there is a conversation turn, add it to conversation ArrayList
    var turn = data.getString(i, "talk");
    if (turn.length > 0) {
      var convoToAdd = new Point_Conversation();
      convoToAdd.xPos = data.getNum(i, "x") * width/1440; // scale factors to fit screen correctly
      convoToAdd.yPos = data.getNum(i, "y") * height/900;
      convoToAdd.time = map(i, 0, rowCount, timelineStart, timelineEnd);
      convoToAdd.talkTurn = turn;
      conversation.push(convoToAdd);
    }
    // Add to movement ArrayList depending on sampling rate
    if (i%samplingRate == 0) { // only get points from rows based on sampling rate (reduces data)
      var mvmntToAdd = new Point_Movement();
      mvmntToAdd.xPos = data.getNum(i, "x") * width/1440; // scale factors to fit screen correctly
      mvmntToAdd.yPos = data.getNum(i, "y") * height/900;
      mvmntToAdd.time = map(i, 0, rowCount, timelineStart, timelineEnd);
      movement.push(mvmntToAdd); // always add to movement and only sometimes add to conversationPoints
    }
  }
  var s = new Path(speaker);
  s.movement = movement;
  s.conversation = conversation;
  paths.push(s);
}