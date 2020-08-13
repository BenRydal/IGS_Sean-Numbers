// Super class with 2 sub-classes drawDataMovement and drawDataConversation
class DrawData {

    constructor() {
        this.drawConversation = new DrawDataConversation();
        this.drawMovement = new DrawDataMovement();
    }

    setDrawData(path) {
        var shade = speakerColor[path.speaker]; // get color for path
        if (conversationView_1 || conversationView_2) this.drawConversation.setData(path);
        this.drawMovement.setData(path, shade);
    }

    setConversationBubble() {
        this.drawConversation.setConversationBubble();
    }

}

class DrawDataMovement {

    constructor() {
        this.bugXPos = -1;
        this.bugYPos = -1;
        this.bugTimePos = -1;
    }

    setData(path, shade) {
        this.resetBug();
        this.draw(PLAN, path.movement, shade);
        this.draw(SPACETIME, path.movement, shade);
        if (this.bugXPos != -1) this.drawBug(shade); // if selected, draw bug
        if (!animation) this.drawSlicer();
    }

    draw(view, points, shade) {
        strokeWeight(5);
        stroke(shade); //stroke(shade, 225);
        noFill(); // important for curve drawing
        beginShape();
        for (var i = 0; i < animationCounter; i++) {
            var point = points[i];
            if (view == PLAN) curveVertex(point.xPos, point.yPos);
            else if (view == SPACETIME) { // text/get bug values
                curveVertex(point.time, point.yPos);
                if (videoIsPlaying) {
                    var videoTime = getMovieCurrentTime();
                    var videoX = map(videoTime, videoStart, videoEnd, timelineStart, timelineEnd);
                    if (videoX >= point.time - bugPrecision && videoX <= point.time + bugPrecision) {
                        this.recordBug(point.xPos, point.yPos, point.time);
                    }
                } else if (mouseY < timelineHeight && mouseX >= point.time - bugPrecision && mouseX <= point.time + bugPrecision) {
                    this.recordBug(point.xPos, point.yPos, point.time);
                } else if (animation && i <= animationCounter - 1) {
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
        strokeWeight(2);
        line(this.bugTimePos, 0, this.bugTimePos, timelineHeight);

    }
}

class DrawDataConversation {

    constructor() {
        this.conversationIsSelected = false;
        this.conversationToDraw = 0; //stores the Point_Conversation object
        this.view = 0
    }

    setData(path) {
        if (path.conversation.length > 0) this.drawRects(path.conversation, path.speaker); // if path has conversation
    }

    setConversationBubble() {
        if (this.conversationIsSelected) this.drawTextBox(); // done last to be overlaid on top
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
        var conversationAnimationRatio = float(animationCounter) / float(animationMaxValue); // for animation of conversation at same speed as movement
        for (var i = 0; i < floor(points.length * conversationAnimationRatio); i++) {
            var point = points[i];
            if (!conversationView_2 && point.talkTurn.charAt(0) != speaker) continue; // only draw rects for selected speaker
            noStroke(); // reset if setDrawText is called previously in loop
            textSize(rectSize); // controls length/size of rect drawn
            var conversationLength = textWidth(point.talkTurn);
            if (conversationLength < minConversationRectLength) conversationLength = minConversationRectLength; // set small strings to minimum
            // setText sets stroke/strokeWeight to highlight rect if selected
            if (overRect(point.xPos, point.yPos - conversationLength, conversationRectWidth, conversationLength)) this.setText(points[i], PLAN); // if over plan
            else if (overRect(point.time, point.yPos - conversationLength, conversationRectWidth, conversationLength)) this.setText(points[i], SPACETIME); // if over spacetime
            fill(speakerColor[point.talkTurn.charAt(0)]);   
            rect(point.xPos, point.yPos - conversationLength, conversationRectWidth, conversationLength); // Plan
            rect(point.time, point.yPos - conversationLength, conversationRectWidth, conversationLength); // Spacetime
        }
    }

    setText(num, view) {
        this.conversationIsSelected = true;
        this.conversationToDraw = num;
        this.view = view;
        stroke(0);
        strokeWeight(4);
    }

    drawTextBox() {
        textFont(font_Lato, keyTextSize);
        textLeading(textSpacing);
        var point = this.conversationToDraw;
        var textBoxHeight = textSpacing * (ceil(textWidth(point.talkTurn) / textBoxWidth)); // lines of talk in a text box rounded up
        // set xPos, constrain prevents drawing off screen
        if (this.view == PLAN) var xPos = constrain(point.xPos - textBoxWidth / 2, boxSpacing, width - textBoxWidth - boxSpacing);
        else if (this.view == SPACETIME) var xPos = constrain(point.time - textBoxWidth / 2, 0, width - textBoxWidth - boxSpacing);
        // set yPos
        if (mouseY < height / 2) { //if top half of screen, text box below rectangle
            var yPos = mouseY + boxDistFromRect;
            var differential = -boxSpacing;
        } else { //if bottom half of screen, text box above rectangle
            var yPos = mouseY - boxDistFromRect - textBoxHeight;
            var differential = textBoxHeight + boxSpacing;
        }
        // textbox
        stroke(0); //set color to black
        strokeWeight(1);
        fill(255, 200); // transparency for textbox
        rect(xPos - boxSpacing, yPos - boxSpacing, textBoxWidth + 2 * boxSpacing, textBoxHeight + 2 * boxSpacing);
        fill(0);
        text(point.talkTurn, xPos, yPos, textBoxWidth, textBoxHeight); // text
        // conversation bubble
        stroke(255);
        strokeWeight(2);
        line(mouseX - boxDistFromRect, yPos + differential, mouseX - boxDistFromRect / 2, yPos + differential);
        stroke(0);
        strokeWeight(1);
        line(mouseX, mouseY, mouseX - boxDistFromRect, yPos + differential);
        line(mouseX, mouseY, mouseX - boxDistFromRect / 2, yPos + differential);
    }
}
