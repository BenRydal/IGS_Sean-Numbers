void setData() {
  setGUIData();
  setSpeakerData();
  // setVideoData();
  loadData();
  animationMaxValue = rowCounts.min(); // set animationMaxVlaue to the smallest data file
}

void setGUIData() {
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
void setSpeakerData() {
  speakerColor.set("T", 0);
  speakerColor.set("S", 1);
  speakerColor.set("M", 2);
  speakerColor.set("C", 3); 
  speakerColor.set("N", 4);
}

//void setVideoData() {
//  ballVideo = new Movie(this, "ball.mp4");
//  ballVideo.volume(0); // mute so no click when program starts
//  ballVideo.play();
//  videoDuration = ballVideo.duration();
//  ballVideo.stop();
//}

void loadData() {
  String filePath = "data/interaction/";
  final File dataDir = new File(sketchPath(filePath)); // Create path to data folder
  for (final File f : dataDir.listFiles()) { // loop through all files in directory
    String fileName = f.getName();
    if (fileName.endsWith(".csv")) { // If it is a CSV file load data
      Table dataTable = loadTable(filePath + fileName, "header");
      loadDataTable(dataTable, fileName.charAt(0)); // Use first letter of file name to associate with speaker
    }
  }
}

// Loads CSV file as Path object to paths ArrayList. Path object is a person/path with movement and conversation Point objects, speaker and boolean show
void loadDataTable(Table data, char speaker) {
  ArrayList<Point_Movement> movement = new ArrayList(); // holds location data for each path
  ArrayList<Point_Conversation> conversation = new ArrayList(); // holds conversaton data and location data for conversation for each path
  int rowCount = data.getRowCount();
  int samplingRate = 40;
  rowCounts.append(rowCount/samplingRate); // add number of data points to rowCounts list to set animation

  // loop through table
  for (int i = 0; i < rowCount; i++) {
    // if there is a conversation turn, add it to conversation ArrayList
    String turn = data.getString(i, "talk");
    if (turn.length() > 0) {
      Point_Conversation convoToAdd = new Point_Conversation();
      convoToAdd.xPos = data.getFloat(i, "x") * width/1440; // scale factors to fit screen correctly
      convoToAdd.yPos = data.getFloat(i, "y") * height/900;
      convoToAdd.time = map(i, 0, rowCount, timelineStart, timelineEnd);
      convoToAdd.talkTurn = turn;
      conversation.add(convoToAdd);
    }
    // Add to movement ArrayList depending on sampling rate
    if (i%samplingRate == 0) { // only get points from rows based on sampling rate (reduces data)
      Point_Movement mvmntToAdd = new Point_Movement();
      mvmntToAdd.xPos = data.getFloat(i, "x") * width/1440; // scale factors to fit screen correctly
      mvmntToAdd.yPos = data.getFloat(i, "y") * height/900;
      mvmntToAdd.time = map(i, 0, rowCount, timelineStart, timelineEnd);
      movement.add(mvmntToAdd); // always add to movement and only sometimes add to conversationPoints
    }
  }
  Path s = new Path(speaker);
  s.movement = movement;
  s.conversation = conversation;
  paths.add(s);
}
