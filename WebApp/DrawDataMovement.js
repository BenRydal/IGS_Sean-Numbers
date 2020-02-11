class DrawDataMovement extends DrawData {

  constructor() {
    super();
    this.bugXPos = -1;
    this.bugYPos = -1;
    this.bugTimePos = -1;
  }

  setData(path, shade) {
    this.resetBug();
    this.draw(PLAN, path.movement, shade);
    this.draw(SPACETIME, path.movement, shade);
    if (this.bugXPos != -1) this.drawBug(shade); // if selected, draw bug
    this.drawSlicer();
  }

  draw(view, points, shade) {
    strokeWeight(5);
    //if (videoIsPlaying) stroke(shade, 100); // set transparancy if video playing
    //else stroke(shade, 225);
    shade.setAlpha(225);
    stroke(shade); //stroke(shade, 225);

    noFill(); // important for curve drawing

    beginShape();
    for (var i = 0; i < animationCounter; i++) {
      var point = points[i];
      if (view == PLAN) curveVertex(point.xPos, point.yPos);
      else if (view == SPACETIME) { // text/get bug values
        curveVertex(point.time, point.yPos);
        // send to record bug
        //if (videoIsPlaying) {
        //  float videoX = map(ballVideo.time(), 0, videoDuration, timelineStart, timelineEnd);
        //  if (videoX >= point.time - bugPrecision && videoX <= point.time + bugPrecision) recordBug(point.xPos, point.yPos, point.time);
        //} else

        if (mouseY < timelineHeight && mouseX >= point.time - bugPrecision && mouseX <= point.time + bugPrecision) {
          this.recordBug(point.xPos, point.yPos, point.time);
        } else if (animation && i == animationCounter - 1) {
          this.recordBug(point.xPos, point.yPos, point.time);
        }
      }
    }
    endShape();
  }

  resetBug() {
    this.bugXPos = -1;
    this.bugYPos = -1;
    this.bugTimePos = -1;
  }
  recordBug(xPos, yPos, timePos) {
    this.bugXPos = xPos;
    this.bugYPos = yPos;
    this.bugTimePos = timePos;
    bugTimePosForVideo = timePos;
  }

  drawBug(shade) {
    stroke(0);
    strokeWeight(5);
    fill(shade);
    ellipse(this.bugXPos, this.bugYPos, bugSize, bugSize);
    ellipse(this.bugTimePos, this.bugYPos, bugSize, bugSize);
  }

  drawSlicer() {
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