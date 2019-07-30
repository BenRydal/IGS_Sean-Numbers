void setData() {
  timelineStart = width * 0.4638; // scale factors
  timelineEnd = width * 0.9638;
  timelineHeight = height * .8466;
  ballVideo = new Movie(this, "ball.mp4");
  ballVideo.volume(0); // mute so no click when program starts
  ballVideo.play();
  videoDuration = ballVideo.duration();
  ballVideo.stop();
  loadData();
}

void loadData() {
  Table data = loadTable("data.csv", "header");
  int rowCount = data.getRowCount();
  int samplingRate = 10;
  for (int i = 0; i < rowCount; i+=samplingRate) {
    Point toAdd = new Point();
    toAdd.xPos = data.getFloat(i, "x") * width/1440; // scale factors;
    toAdd.yPos = data.getFloat(i, "y") * height/900;
    toAdd.time = map(i, 0, rowCount, timelineStart, timelineEnd);
    String turn = data.getString(i, "turn");
    if (turn.length() > 0) {
      toAdd.conversation = turn;
      conversation.add(toAdd);
    } else toAdd.conversation = null;
    movement.add(toAdd); // always add to movement and only sometimes add to conversationPoints
  }
}
