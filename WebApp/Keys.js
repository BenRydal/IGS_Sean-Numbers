class Keys {

  drawKeys() {
    this.drawSpeakerKeys();
    this.drawAdditionalKeys();
  }

  drawSpeakerKeys() {
    var currXPos = timelineStart;
    strokeWeight(5);
    textSize(20);
    textAlign(LEFT, BOTTOM);
    for (var i = 0; i < paths.length; i ++) {
      var path = paths[i];
      stroke(getPathColor(path.speaker));
      noFill();
      rect(currXPos, speakerKeysHeight, buttonWidth, buttonWidth, 5);
      fill(getPathColor(path.speaker));
      if (path.show) rect(currXPos, speakerKeysHeight, buttonWidth, buttonWidth, 5);
      fill(0);
      noStroke();
      var name = getFullName(path.speaker);
      text(name, currXPos + buttonWidth, speakerKeysHeight + buttonWidth);
      currXPos += (buttonWidth + textWidth(name) + buttonSpacing);
    }
  }

  drawAdditionalKeys() {
    var currXPos = timelineStart;
    textAlign(LEFT, TOP);
    fill(animation ? 0: 150);
    text("Animate", currXPos, additionalKeysHeight);
    currXPos += textWidth("Animate") + buttonSpacing;
    fill(showConversation ? 0: 150);
    text("Conversation", currXPos, additionalKeysHeight);
    currXPos += textWidth("Conversation");
    fill(allConversationView ? 0: 150);
    noStroke();
    text(" (2)", currXPos, additionalKeysHeight);
    currXPos += textWidth(" (2)") + buttonSpacing;
    //fill(videoMode ? 0: 150);
    //text("Video", currXPos, additionalKeysHeight);
    //textAlign(LEFT, TOP);
  }
}