class DrawDataMovement extends DrawData {

  float bugXPos = -1, bugYPos = -1, bugTimePos = -1;

  void setData(Path path, color shade) {
    resetBug();
    draw(PLAN, path.movement, shade);
    draw(SPACETIME, path.movement, shade);
    if (bugXPos != -1) drawBug(shade); // if selected, draw bug
    drawSlicer();
  }

  void draw(int view, ArrayList<Point_Movement> points, color shade) {
    strokeWeight(5);
    //if (videoIsPlaying) stroke(shade, 100); // set transparancy if video playing 
    //else stroke(shade, 225);

    stroke(shade, 225);

    noFill(); // important for curve drawing

    beginShape();
    for (int i = 0; i < animationCounter; i++) {
      Point_Movement point = points.get(i);
      if (view == PLAN) curveVertex(point.xPos, point.yPos);
      else if (view == SPACETIME) { // text/get bug values
        curveVertex(point.time, point.yPos);
        // send to record bug
        //if (videoIsPlaying) {
        //  float videoX = map(ballVideo.time(), 0, videoDuration, timelineStart, timelineEnd);
        //  if (videoX >= point.time - bugPrecision && videoX <= point.time + bugPrecision) recordBug(point.xPos, point.yPos, point.time);
        //} else 

        if (mouseY < timelineHeight && mouseX >= point.time - bugPrecision && mouseX <= point.time + bugPrecision) {
          recordBug(point.xPos, point.yPos, point.time);
        } else if (animation && i == animationCounter - 1) recordBug(point.xPos, point.yPos, point.time);
      }
    }
    endShape();
  }

  void resetBug() {
    bugXPos = -1;
    bugYPos = -1;
    bugTimePos = -1;
  }
  void recordBug(float xPos, float yPos, float timePos) {
    bugXPos = xPos;
    bugYPos = yPos;
    bugTimePos = timePos;
    bugTimePosForVideo = timePos;
  }

  void drawBug(color shade) {
    stroke(0);
    strokeWeight(5);
    fill(shade);
    ellipse(bugXPos, bugYPos, bugSize, bugSize);
    ellipse(bugTimePos, bugYPos, bugSize, bugSize);
  }

  void drawSlicer() {
    fill(0);
    stroke(0);
    strokeWeight(3);
    //if (videoIsPlaying) {
    //  float videoX = map(ballVideo.time(), 0, videoDuration, timelineStart, timelineEnd);
    //  line(videoX, 0, videoX, timelineHeight);
    //} else 

    if (!animation && overRect(timelineStart, 0, timelineEnd - timelineStart, timelineHeight)) {
      line(mouseX, 0, mouseX, timelineHeight);
    }
  }
}
