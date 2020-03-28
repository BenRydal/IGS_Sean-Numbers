class Keys {

    drawKeys() {
        textFont(font_PlayfairReg, keyTextSize);
        this.drawSpeakerKeys();
        this.drawbuttons();
        this.drawTitles();
    }

    drawSpeakerKeys() {
        var currXPos = timelineStart;
        strokeWeight(5);
        for (var i = 0; i < paths.length; i++) {
            var path = paths[i];
            stroke(getPathColor(path.speaker));
            noFill();
            rect(currXPos, speakerKeysHeight, buttonWidth, buttonWidth);
            fill(getPathColor(path.speaker));
            if (path.show) rect(currXPos, speakerKeysHeight, buttonWidth, buttonWidth);
            fill(0);
            noStroke();
            var name = getFullName(path.speaker);
            text(name, currXPos + buttonWidth, speakerKeysHeight - buttonWidth / 5);
            currXPos += (buttonWidth + textWidth(name) + buttonSpacing);
        }
    }

    drawbuttons() {
        var currXPos = timelineStart + buttonSpacing / 2;
        fill(animation ? 0 : 150);
        // Button 1
        text(button_1, currXPos, buttonsHeight);
        noFill();
        stroke(animation ? 0 : 150);
        strokeWeight(1);
        rect(currXPos - buttonSpacing / 2, buttonsHeight, textWidth(button_1) + buttonSpacing, buttonSpacing * 1.5);
        noStroke();
        currXPos += textWidth(button_1) + buttonSpacing * 2;
        // Button 2
        fill(conversationView_1 ? 0 : 150);
        text(button_2, currXPos, buttonsHeight);
        noFill();
        stroke(conversationView_1 ? 0 : 150);
        strokeWeight(1);
        rect(currXPos - buttonSpacing / 2, buttonsHeight, textWidth(button_2) + buttonSpacing, buttonSpacing * 1.5);
        noStroke();
        currXPos += textWidth(button_2) + buttonSpacing * 2;
        // Button 3
        fill(conversationView_2 ? 0 : 150);
        text(button_3, currXPos, buttonsHeight);
        noFill();
        stroke(conversationView_2 ? 0 : 150);
        strokeWeight(1);
        rect(currXPos - buttonSpacing / 2, buttonsHeight, textWidth(button_3) + buttonSpacing, buttonSpacing * 1.5);
        noStroke();
        currXPos += textWidth(button_3) + buttonSpacing * 2;
        // Button 4
        fill(videoMode ? 0 : 150);
        text(button_4, currXPos, buttonsHeight);
        noFill();
        stroke(videoMode ? 0 : 150);
        strokeWeight(1);
        rect(currXPos - buttonSpacing / 2, buttonsHeight, textWidth(button_4) + buttonSpacing, buttonSpacing * 1.5);
        noStroke();
        currXPos += textWidth(button_4) + buttonSpacing * 2;
        // Button 5
        textFont(font_PlayfairItalic);
        fill(howToRead ? 0 : 150);
        text(button_5, currXPos, buttonsHeight);
        noFill();
        stroke(howToRead ? 0 : 150);
        strokeWeight(1);
        rect(currXPos - buttonSpacing / 2, buttonsHeight, textWidth(button_5) + buttonSpacing, buttonSpacing * 1.5);
        noStroke();
    }

    drawTitles() {
        fill(0);
        textFont(font_Playfairbold, titleTextSize);
        text(titleMsg, buttonWidth, timelineHeight);
        textFont(font_PlayfairItalic, infoTextSize);
        text(infoMsg, buttonWidth, buttonsHeight - buttonWidth, timelineStart - 6 * buttonSpacing, height);
    }
}
