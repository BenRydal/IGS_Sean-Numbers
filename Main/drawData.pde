class DrawData {

  void setDrawData(ArrayList<Point> movement, ArrayList<Point> conversation) {
    if (showConversation && !animation) drawConversationRects(conversation);
    drawMovement(PLAN, movement);
    drawMovement(SPACETIME, movement);
    if (bugXPos != -1) drawBug(); // if selected, draw bug
    drawSlicer();
    if (conversationIsSelected && !animation) drawConversationText(); // draw last
  }

  void drawMovement(int view, ArrayList<Point> points) {
    resetBug();
    strokeWeight(5);
    if (videoIsPlaying) stroke(colors[0], 100); // set transparancy if video playing 
    else stroke(colors[0]);
    noFill(); // important for curve drawing
    beginShape();

    for (int i = 0; i <= numberOfPoints; i++) {
      // for (int i = 0; i <= points.size()-1; i++) {
      Point point = points.get(i);
      if (view == PLAN) curveVertex(point.xPos, point.yPos);
      else if (view == SPACETIME) { // text/get bug values 
        curveVertex(point.time, point.yPos);
        if (videoIsPlaying) {
          float videoX = map(ballVideo.time(), 0, videoDuration, timelineStart, timelineEnd);
          if (videoX >= point.time - bugPrecision && videoX <= point.time + bugPrecision) recordBug(point.xPos, point.yPos, point.time);
        } else if (mouseY < timelineHeight && mouseX >= point.time - bugPrecision && mouseX <= point.time + bugPrecision) {
          recordBug(point.xPos, point.yPos, point.time);
        } else if (animation && i == numberOfPoints) {
          recordBug(point.xPos, point.yPos, point.time);
        }
      }
    }
    endShape();
  }

  void setDrawText(int num, int view) {
    conversationIsSelected = true;
    conversationToDraw[0] = num;
    conversationToDraw[1] = view;
    stroke(0);
    strokeWeight(4); // controls selection of rect for this conversation on return
  }

  void drawConversationRects(ArrayList<Point> points) {
    conversationIsSelected = false; // reset
    conversationToDraw[0] = 0;
    conversationToDraw[1] = 0;
    int conversationRectWidth = 9;
    int minConversationRectLength = 5;

    for (int i = 0; i <= points.size()-1; i++) {
      noStroke(); // reset if setDrawText is called previously in loop
      textSize(.5); // controls length/size of rect drawn
      Point point = points.get(i);
      float conversationLength = textWidth(point.conversation);
      if (conversationLength < minConversationRectLength) conversationLength = minConversationRectLength; // set small strings to minimum
      if (overRect(point.xPos, point.yPos - conversationLength, conversationRectWidth, conversationLength)) setDrawText(i, PLAN); // if over plan
      else  if (overRect(point.time, point.yPos - conversationLength, conversationRectWidth, conversationLength)) setDrawText(i, SPACETIME); // if over spacetime
      // setDrawText also sets stroke/strokeWeight to highlight rect if selected
      setConversationColor(point.conversation.charAt(0));
      rect(point.xPos, point.yPos - conversationLength, conversationRectWidth, conversationLength); // Plan
      rect(point.time, point.yPos - conversationLength, conversationRectWidth, conversationLength); // Spacetime
    }
  }

  void drawConversationText() {
    // text scaling/positioning variables
    textSize(14);
    int boxSpacing = 10; // general spacing variable for drawing text box
    int boxDistFromRect = 5 * boxSpacing;
    int boxWidth = 300;
    int leading = 20; // thickness/width of each talk turn
    textLeading(leading);
    Point point = conversation.get(conversationToDraw[0]);
    float textBoxWidth = boxWidth; // width of text and textbox drawn
    float textBoxHeight = leading * (ceil(textWidth(point.conversation)/textBoxWidth)); // lines of talk in a text box rounded up
    // xPos coordinate
    float xPos = 0;
    if (conversationToDraw[1] == PLAN) xPos = point.xPos - textBoxWidth/2;
    else if (conversationToDraw[1] == SPACETIME) xPos = mouseX - textBoxWidth/2;
    if (xPos < 0) xPos += textBoxWidth; // if xPos is offscreen move it on screen for drawing
    if (xPos + textBoxWidth > width) xPos -= textBoxWidth/2;

    // textbox
    stroke(0);
    strokeWeight(2); // strokeweight for textbox
    fill(255, 200); // transparancy for textbox

    if (mouseY < height/2) {
      float yPos = mouseY + boxDistFromRect;
      rect(xPos - boxSpacing, yPos - boxSpacing, textBoxWidth + boxSpacing, textBoxHeight + boxSpacing); // textbox
      // text
      fill(0);
      text(point.conversation, xPos, yPos, textBoxWidth, textBoxHeight); // floor plan
      line(mouseX, mouseY, mouseX - boxDistFromRect, yPos - boxSpacing);
      line (mouseX, mouseY, mouseX - boxDistFromRect/2, yPos - boxSpacing);
      stroke(255);
      line(mouseX - boxDistFromRect, yPos - boxSpacing, mouseX - boxDistFromRect/2, yPos - boxSpacing);
    } else {
      float yPos = mouseY - boxDistFromRect;
      rect(xPos - boxSpacing, yPos - textBoxHeight - boxSpacing, textBoxWidth + boxSpacing, textBoxHeight + boxSpacing); // textbox
      // text
      fill(0);
      text(point.conversation, xPos, yPos - textBoxHeight, textBoxWidth, textBoxHeight); // floor plan
      line(mouseX, mouseY, mouseX - boxDistFromRect, yPos);
      line (mouseX, mouseY, mouseX - boxDistFromRect/2, yPos);
      stroke(255);
      line(mouseX - boxDistFromRect, yPos, mouseX - boxDistFromRect/2, yPos);
    }
  }

  void setConversationColor(char speaker) {
    int turnOpacity = 255;
    if (videoIsPlaying) turnOpacity = 100;
    if (speaker == 'T') fill(colors[0], turnOpacity); // Purple
    else if (speaker == 'S') fill (colors[1], turnOpacity); // Blue
    else if (speaker == 'M') fill (colors[2], turnOpacity); // Green
    else if (speaker == 'K') fill(colors[3], turnOpacity); // Orange
    else if (speaker == 'I') fill(colors[4], turnOpacity); // Red
    else ;
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
  }

  void drawBug() {
    stroke(0);
    strokeWeight(5);
    setConversationColor('T');
    ellipse(bugXPos, bugYPos, bugSize, bugSize);
    ellipse(bugTimePos, bugYPos, bugSize, bugSize);
  }

  void drawSlicer() {
    fill(0);
    stroke(0);
    strokeWeight(3);
    if (videoIsPlaying) {
      float videoX = map(ballVideo.time(), 0, videoDuration, timelineStart, timelineEnd);
      line(videoX, bugYPos + bugSize/2, videoX, timelineHeight);
    } else if (!animation && overRect(timelineStart, 0, timelineEnd - timelineStart, timelineHeight)) {
      line(mouseX, bugYPos + bugSize/2, mouseX, timelineHeight);
    }
  }
}
