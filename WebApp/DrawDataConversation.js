class DrawDataConversation extends DrawData {

  constructor() {
    super();
    this.conversationIsSelected = false;
    this.conversationTurnToDraw = 0;
    this.drawInPlanOrSpaceTime = 0;
  }

  setData(path) {
    if (showConversation && path.conversation.length > 0) this.setRects(path.conversation, path.speaker); // if drawing conversation and path has conversation
    if (this.conversationIsSelected) this.drawText(path.conversation); // draw last
  }

  setRects(points, speaker) {
    var numOfPaths = 0; // determine how many paths are being drawn
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      if (path.show == true) numOfPaths++;
    }
    this.drawRects(points, speaker, numOfPaths);
  }

  drawRects(points, speaker, numOfPaths) {
    var conversationAnimationRatio = float(animationCounter)/float(animationMaxValue); // for animation of conversation at same speed as movement
    print(points.length * conversationAnimationRatio);
    for (var i = 0; i < points.length; i++) { //    for (var i = 0; i < points.length * conversationAnimationRatio; i++) {
      var point = points[i];
      if (!allConversationView) if (point.talkTurn.charAt(0) != speaker) continue;
      else if (numOfPaths > 1 && point.talkTurn.charAt(0) != speaker) continue; // if drawing multiple paths only draw rects for current path
      noStroke(); // reset if setDrawText is called previously in loop
      textSize(.5); // controls length/size of rect drawn
      var conversationLength = textWidth(point.talkTurn);
      if (conversationLength < minConversationRectLength) conversationLength = minConversationRectLength; // set small strings to minimum
      if (overRect(point.xPos, point.yPos - conversationLength, conversationRectWidth, conversationLength)) this.setText(i, PLAN); // if over plan
      else  if (overRect(point.time, point.yPos - conversationLength, conversationRectWidth, conversationLength)) this.setText(i, SPACETIME); // if over spacetime
      fill(getPathColor(point.talkTurn.charAt(0)));
      // setDrawText also sets stroke/strokeWeight to highlight rect if selected
      rect(point.xPos, point.yPos - conversationLength, conversationRectWidth, conversationLength); // Plan
      rect(point.time, point.yPos - conversationLength, conversationRectWidth, conversationLength); // Spacetime
    }
  }

  setText(num, view) {
    this.conversationIsSelected = true;
    this.conversationTurnToDraw = num;
    this.drawInPlanOrSpaceTime = view;
    stroke(0);
    strokeWeight(4); // controls selection of rect for this conversation on return
  }

  drawText(points) {
    // text scaling/positioning variables
    textSize(14);
    var boxSpacing = 10; // general spacing variable for drawing text box
    var boxDistFromRect = 5 * boxSpacing;
    var boxWidth = 300;
    var leading = 20; // thickness/width of each talk turn
    textLeading(leading);
    var point = points[this.conversationTurnToDraw];
    var textBoxWidth = boxWidth; // width of text and textbox drawn
    var textBoxHeight = leading * (ceil(textWidth(point.talkTurn)/textBoxWidth)); // lines of talk in a text box rounded up
    // xPos coordinate
    var xPos = 0;
    if (this.drawInPlanOrSpaceTime == PLAN) xPos = point.xPos - textBoxWidth/2;
    else if (this.drawInPlanOrSpaceTime == SPACETIME) xPos = mouseX - textBoxWidth/2;
    if (xPos < 0) xPos += textBoxWidth; // if xPos is offscreen move it on screen for drawing
    if (xPos + textBoxWidth > width) xPos -= textBoxWidth/2;

    // textbox
    stroke(0);
    strokeWeight(1); // strokeweight for textbox, originally 2
    fill(255, 200); // transparancy for textbox

    if (mouseY < height/2) {
      var yPos = mouseY + boxDistFromRect;
      rect(xPos - boxSpacing, yPos - boxSpacing, textBoxWidth + boxSpacing, textBoxHeight + boxSpacing); // textbox
      // text
      fill(0);
      text(point.talkTurn, xPos, yPos, textBoxWidth, textBoxHeight); // floor plan
      line(mouseX, mouseY, mouseX - boxDistFromRect, yPos - boxSpacing);
      line (mouseX, mouseY, mouseX - boxDistFromRect/2, yPos - boxSpacing);
      stroke(255);
      line(mouseX - boxDistFromRect, yPos - boxSpacing, mouseX - boxDistFromRect/2, yPos - boxSpacing);
    } else {
      var yPos = mouseY - boxDistFromRect;
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