function mousePressed() {
    textSize(keyTextSize);
    // Controls video when clicking on timeline
    if (videoMode && !animation && overRect(timelineStart, 0, timelineEnd, timelineHeight)) {
        videoCurrTime = map(mouseX, timelineStart, timelineEnd, 0, videoDuration);
        playPauseMovie();
    }
    overSpeakerKeys();
    overButtons();
}

// Loop through all speakers/test if mouse clicked and update accordingly
function overSpeakerKeys() {
    var currXPos = timelineStart;
    for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var name = getFullName(path.speaker);
        if (overRect(currXPos, speakerKeysHeight, buttonWidth + textWidth(name), buttonWidth)) path.show = !path.show;
        currXPos += (buttonWidth + textWidth(name) + buttonSpacing);
    }
}

// Loop through all button/test if mouse clicked and update accordingly
function overButtons() {
    var currXPos = timelineStart + buttonSpacing / 2;
    if (overRect(currXPos, buttonsHeight, textWidth(button_1), buttonWidth)) overAnimateButton();
    else if (overRect(currXPos + textWidth(button_1) + 2 * buttonSpacing, buttonsHeight, textWidth(button_2) + buttonSpacing, buttonWidth)) {
        conversationView_1 = !conversationView_1;
        conversationView_2 = false;
    } else if (overRect(currXPos + textWidth(button_1 + button_2) + 4 * buttonSpacing, buttonsHeight, textWidth(button_3) + buttonSpacing, buttonWidth)) {
        conversationView_2 = !conversationView_2;
        conversationView_1 = false;
    } else if (overRect(currXPos + textWidth(button_1 + button_2 + button_3) + 6 * buttonSpacing, buttonsHeight, textWidth(button_4) + buttonSpacing, buttonWidth)) {
        videoMode = !videoMode;
        var video = select('#moviePlayer');
        video.style('display', (videoMode ? 'block' : 'none'));
        if (videoMode) {
            video.style('width', videoWidthOnPause + ''); // reset width/height
            video.style('height', videoHeightOnPause + '');
        } else {
            videoCurrTime = 0; // reset time to 0
            pauseMovie();
        }
    } else if (overRect(currXPos + textWidth(button_1 + button_2 + button_3 + button_4) + 8 * buttonSpacing, buttonsHeight, textWidth(button_5) + buttonSpacing, buttonWidth)) overHowToReadButton();

}

// Test if over buttons and send to drawKeyMessages with respective String/message
function overButtonsMSGS() {
    textSize(keyTextSize);
    textFont(font_PlayfairReg);
    noStroke();
    var currXPos = timelineStart + buttonSpacing / 2;
    if (overRect(currXPos, buttonsHeight, textWidth(button_1), buttonWidth)) drawKeyMSG(animateMSG);
    else if (overRect(currXPos + textWidth(button_1) + 2 * buttonSpacing, buttonsHeight, textWidth(button_2) + buttonSpacing, buttonWidth)) drawKeyMSG(conversation_1_MSG);
    else if (overRect(currXPos + textWidth(button_1 + button_2) + 4 * buttonSpacing, buttonsHeight, textWidth(button_3) + buttonSpacing, buttonWidth)) drawKeyMSG(conversation_2_MSG);
    else if (overRect(currXPos + textWidth(button_1 + button_2 + button_3) + 6 * buttonSpacing, buttonsHeight, textWidth(button_4) + buttonSpacing, buttonWidth)) drawKeyMSG(videoMSG);
    else if (overRect(currXPos + textWidth(button_1 + button_2 + button_3 + button_4) + 8 * buttonSpacing, buttonsHeight, textWidth(button_5) + buttonSpacing, buttonWidth)) drawHowToReadMSG(); // draw how to read message differently
}

// Draw text for button message/information
function drawKeyMSG(msg) {
    var textBoxHeight = textSpacing * (ceil(textWidth(msg) / textBoxWidth)); // lines of talk in a text box rounded
    var textBoxStart = buttonsHeight - (textBoxHeight + 2 * boxSpacing);
    stroke(0); //set color to black
    strokeWeight(1);
    fill(255, 225); // transparency for textbox
    var xPos = 0;
    if (width - mouseX < textBoxWidth / 2) xPos = width - textBoxWidth / 2 - 2 * boxSpacing;
    else xPos = mouseX;
    rect(xPos - boxSpacing - textBoxWidth / 2, textBoxStart, textBoxWidth + 2 * boxSpacing, textBoxHeight + 2 * boxSpacing);
    fill(0);
    noStroke();
    text(msg, xPos - textBoxWidth / 2, textBoxStart + boxSpacing, textBoxWidth, textBoxWidth);
}

function drawHowToReadMSG() {
    var textBoxHeight = textSpacing * (ceil(textWidth(howToReadMSG_1) / textBoxWidth)); // lines of talk in a text box rounded
    var textBoxStart = height / 5;
    var xPos = width / 2.1;
    stroke(0); //set color to black
    strokeWeight(1);
    fill(255, 225); // transparency for textbox
    rect(xPos - boxSpacing, textBoxStart, textBoxWidth + 2 * boxSpacing, textBoxHeight + 2 * boxSpacing);
    fill(0);
    noStroke();
    text(howToReadMSG_1, xPos, textBoxStart + boxSpacing, textBoxWidth, textBoxWidth); // draw message in space-tiem view
    drawKeyMSG(howToReadMSG_2); // draw message above how to read button
}


function overHowToReadButton() {
    if (!howToRead) {
        for (var i = 0; i < paths.length; i++) {
            var path = paths[i];
            if (path.speaker != 'T') path.show = false;
            else path.show = true; // ensure teacher path is showed
        }
        conversationView_1 = false; // hide conversation if showing
        conversationView_2 = false;
    }
    howToRead = !howToRead;
}

function overAnimateButton() {
    if (animation) {
        animation = false;
        animationCounter = animationMaxValue;
    } else {
        animation = true;
        animationCounter = 0; // reset animation if playing/already played
    }
}

// Tests if over circle with x, y and diameter
function overCircle(x, y, diameter) {
    var disX = x - mouseX;
    var disY = y - mouseY;
    if (sqrt(sq(disX) + sq(disY)) < diameter / 2) {
        return true;
    } else {
        return false;
    }
}

// Tests if over rectangle with x, y, and width/height
function overRect(x, y, boxWidth, boxHeight) {
    if (mouseX >= x && mouseX <= x + boxWidth &&
        mouseY >= y && mouseY <= y + boxHeight) {
        return true;
    } else {
        return false;
    }
}

// returns name as string based on character
function getFullName(speaker) {
    if (speaker == 'T') return "  Teacher";
    else if (speaker == 'S') return "  Sean";
    else if (speaker == 'M') return "  Mei";
    else if (speaker == 'C') return "  Cassandra";
    else if (speaker == 'N') return "  Nathan";
    else return "name";
}

// returns a color based on character
function getPathColor(speaker) {
    var val = speakerColor[speaker]; // get number from name to set color
    return color(colorShades[val]);
}
