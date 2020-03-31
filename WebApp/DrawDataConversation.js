class DrawDataConversation {

  constructor() {
    this.conversationIsSelected = false;
    this.conversationToDraw = 0; //stores the Point_Conversation object
    this.drawInPlanOrSpaceTime = 0
  }

  setData(path) {
    if (showConversation && path.conversation.length > 0) this.drawRects(path.conversation, path.speaker); // if drawing conversation and path has conversation
  }

  setConversationBubble() {
    if (this.conversationIsSelected) this.drawText(); // done last to be overlaid on top
  }

  numOfPaths() {
    var numOfPaths = 0; // determine how many paths are being drawn
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      if (path.show == true) numOfPaths++;
    }
    return numOfPaths;
  }

  drawRects(points, speaker) {
    var conversationAnimationRatio = float(animationCounter)/float(animationMaxValue); // for animation of conversation at same speed as movement
    for (var i = 0; i < floor(points.length * conversationAnimationRatio); i++) { //    for (var i = 0; i < points.length * conversationAnimationRatio; i++) {
      var point = points[i];
      if (!allConversationView) if (point.talkTurn.charAt(0) != speaker) continue;
      else if (this.numOfPaths() > 1 && point.talkTurn.charAt(0) != speaker) continue; // if drawing multiple paths only draw rects for current path
      noStroke(); // reset if setDrawText is called previously in loop
      textSize(.5); // controls length/size of rect drawn
      var conversationLength = textWidth(point.talkTurn);
      if (conversationLength < minConversationRectLength) conversationLength = minConversationRectLength; // set small strings to minimum
      if (overRect(point.xPos, point.yPos - conversationLength, conversationRectWidth, conversationLength)) this.setText(points[i], PLAN); // if over plan
      else  if (overRect(point.time, point.yPos - conversationLength, conversationRectWidth, conversationLength)) this.setText(points[i], SPACETIME); // if over spacetime
      fill(getPathColor(point.talkTurn.charAt(0)));
      // setText sets stroke/strokeWeight to highlight rect if selected
      rect(point.xPos, point.yPos - conversationLength, conversationRectWidth, conversationLength); // Plan
      rect(point.time, point.yPos - conversationLength, conversationRectWidth, conversationLength); // Spacetime
    }
  }

  setText(num, view) {
    this.conversationIsSelected = true;
    this.conversationToDraw = num;
    this.drawInPlanOrSpaceTime = view;
    stroke(0);
    strokeWeight(4); // controls selection of rect for this conversation on return
  }

  drawText() {
    // text scaling/positioning variables
    textSize(14);
    var boxSpacing = 10, boxDistFromRect = 5 * boxSpacing; // general spacing variable for drawing text box
    var leading = 20; // thickness/width of each talk turn
    textLeading(leading);
    var point = this.conversationToDraw;
    var textBoxWidth = 300.0; // width of text and textbox drawn
    var textBoxHeight = leading * (ceil(textWidth(point.talkTurn.toUpperCase())/textBoxWidth)); // lines of talk in a text box rounded up
    // xPos coordinate
    var xPos = 0;
    if (this.drawInPlanOrSpaceTime == PLAN) xPos = point.xPos - textBoxWidth/2;
    else if (this.drawInPlanOrSpaceTime == SPACETIME) xPos = point.time - textBoxWidth/2;
    if (xPos < boxSpacing) xPos = boxSpacing; // if xPos is offscreen move it on screen for drawing
    if (xPos + textBoxWidth > width) xPos = width - textBoxWidth - boxSpacing;
    // yPos coordinate
    var yPos;
    var differential;
    if (mouseY < height/2) { //if top half of screen, text box below rectangle
      yPos = mouseY + boxDistFromRect;
      differential = 0;
    } else { //if bottom half of screen, text box above rectangle
      yPos = mouseY - boxDistFromRect - textBoxHeight;
      differential = textBoxHeight + boxSpacing;
    }

    // textbox
    stroke(0); //set color to black
    strokeWeight(1);
    fill(255, 200); // transparency for textbox
    rect(xPos - boxSpacing, yPos - boxSpacing, textBoxWidth + boxSpacing, textBoxHeight + boxSpacing); // box around text
    fill(0);
    text(point.talkTurn, xPos, yPos, textBoxWidth, textBoxHeight); //conversation text
    stroke(255);
    line(mouseX - boxDistFromRect, yPos + differential - boxSpacing, mouseX - boxDistFromRect/2, yPos + differential - boxSpacing);
    stroke(0);
    line(mouseX, mouseY, mouseX - boxDistFromRect, yPos + differential - boxSpacing);
    line (mouseX, mouseY, mouseX - boxDistFromRect/2, yPos + differential - boxSpacing);
  }
}