class DrawDataConversation extends DrawData {

  boolean conversationIsSelected = false;
  int conversationTurnToDraw = 0, drawInPlanOrSpaceTime = 0;

  void setData(Path path) {
    if (showConversation && path.conversation.size() > 0) setRects(path.conversation, path.speaker); // if drawing conversation and path has conversation
    if (conversationIsSelected) drawText(path.conversation); // draw last
  }

  void setRects(ArrayList<Point_Conversation> points, char speaker) {
    int numOfPaths = 0; // determine how many paths are being drawn
    for (int i = 0; i < paths.size(); i++) {
      Path path = paths.get(i);
      if (path.show == true) numOfPaths++;
    }
    drawRects(points, speaker, numOfPaths);
  }

  void drawRects(ArrayList<Point_Conversation> points, char speaker, int numOfPaths) {
    float conversationAnimationRatio = float(animationCounter)/float(animationMaxValue); // for animation of conversation at same speed as movement
    for (int i = 0; i < points.size() * conversationAnimationRatio; i++) {
      Point_Conversation point = points.get(i);
      if (!allConversationView) if (point.talkTurn.charAt(0) != speaker) continue;
      else if (numOfPaths > 1 && point.talkTurn.charAt(0) != speaker) continue; // if drawing multiple paths only draw rects for current path
      noStroke(); // reset if setDrawText is called previously in loop
      textSize(.5); // controls length/size of rect drawn
      float conversationLength = textWidth(point.talkTurn);
      if (conversationLength < minConversationRectLength) conversationLength = minConversationRectLength; // set small strings to minimum
      if (overRect(point.xPos, point.yPos - conversationLength, conversationRectWidth, conversationLength)) setText(i, PLAN); // if over plan
      else  if (overRect(point.time, point.yPos - conversationLength, conversationRectWidth, conversationLength)) setText(i, SPACETIME); // if over spacetime
      fill(getPathColor(point.talkTurn.charAt(0)));
      // setDrawText also sets stroke/strokeWeight to highlight rect if selected
      rect(point.xPos, point.yPos - conversationLength, conversationRectWidth, conversationLength); // Plan
      rect(point.time, point.yPos - conversationLength, conversationRectWidth, conversationLength); // Spacetime
    }
  } 

  void setText(int num, int view) {
    conversationIsSelected = true;
    conversationTurnToDraw = num;
    drawInPlanOrSpaceTime = view;
    stroke(0);
    strokeWeight(4); // controls selection of rect for this conversation on return
  }

  void drawText(ArrayList<Point_Conversation> points) {
    // text scaling/positioning variables
    textSize(14);
    int boxSpacing = 10; // general spacing variable for drawing text box
    int boxDistFromRect = 5 * boxSpacing;
    int boxWidth = 300;
    int leading = 20; // thickness/width of each talk turn
    textLeading(leading);
    Point_Conversation point = points.get(conversationTurnToDraw);
    float textBoxWidth = boxWidth; // width of text and textbox drawn
    float textBoxHeight = leading * (ceil(textWidth(point.talkTurn)/textBoxWidth)); // lines of talk in a text box rounded up
    // xPos coordinate
    float xPos = 0;
    if (drawInPlanOrSpaceTime == PLAN) xPos = point.xPos - textBoxWidth/2;
    else if (drawInPlanOrSpaceTime == SPACETIME) xPos = mouseX - textBoxWidth/2;
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
      text(point.talkTurn, xPos, yPos, textBoxWidth, textBoxHeight); // floor plan
      line(mouseX, mouseY, mouseX - boxDistFromRect, yPos - boxSpacing);
      line (mouseX, mouseY, mouseX - boxDistFromRect/2, yPos - boxSpacing);
      stroke(255);
      line(mouseX - boxDistFromRect, yPos - boxSpacing, mouseX - boxDistFromRect/2, yPos - boxSpacing);
    } else {
      float yPos = mouseY - boxDistFromRect;
      rect(xPos - boxSpacing, yPos - textBoxHeight - boxSpacing, textBoxWidth + boxSpacing, textBoxHeight + boxSpacing); // textbox
      // text
      fill(0);
      text(point.talkTurn, xPos, yPos - textBoxHeight, textBoxWidth, textBoxHeight); // floor plan
      line(mouseX, mouseY, mouseX - boxDistFromRect, yPos);
      line (mouseX, mouseY, mouseX - boxDistFromRect/2, yPos);
      stroke(255);
      line(mouseX - boxDistFromRect, yPos, mouseX - boxDistFromRect/2, yPos);
    }
  }
}
