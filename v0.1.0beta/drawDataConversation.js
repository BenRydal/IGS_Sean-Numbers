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
			fill(getPathColor(point.talkTurn.charAt(0)));
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