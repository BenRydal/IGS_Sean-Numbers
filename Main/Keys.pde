class Keys {

  void drawKeys () {
    drawSpeakerKeys();
    drawAdditionalKeys();
  }

  void drawSpeakerKeys() {
    float currXPos = timelineStart;
    strokeWeight(5);
    textSize(20);
    textAlign(LEFT, BOTTOM);
    for (int i = 0; i < paths.size(); i ++) {
      Path path = paths.get(i);
      stroke(getPathColor(path.speaker));
      noFill();
      rect(currXPos, speakerKeysHeight, buttonWidth, buttonWidth);
      fill(getPathColor(path.speaker));
      if (path.show) rect(currXPos, speakerKeysHeight, buttonWidth, buttonWidth);
      fill(0);
      String name = getFullName(path.speaker);
      text(name, currXPos + buttonWidth, speakerKeysHeight + buttonWidth);
      currXPos += (buttonWidth + textWidth(name) + buttonSpacing);
    }
  }

  void drawAdditionalKeys() {
    float currXPos = timelineStart;
    textAlign(LEFT, TOP);
    fill(animation ? 0: 150);
    text("Animate", currXPos, additionalKeysHeight);
    currXPos += textWidth("Animate") + buttonSpacing;
    fill(showConversation ? 0: 150);
    text("Conversation", currXPos, additionalKeysHeight);
    currXPos += textWidth("Conversation");
    fill(allConversationView ? 0: 150);
    text(" (2)", currXPos, additionalKeysHeight);
    currXPos += textWidth(" (2)") + buttonSpacing;
    //fill(videoMode ? 0: 150);
    //text("Video", currXPos, additionalKeysHeight);
    //textAlign(LEFT, TOP);
  }
}
