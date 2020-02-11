//add + and - to control speed for animation counter
//test/fix opacity levels

void mousePressed() {
  //if (videoMode) {
  //  if (!animation && overRect(timelineStart, 0, timelineEnd, timelineHeight)) {
  //    videoCurrTime = map(mouseX, timelineStart, timelineEnd, 0, videoDuration);
  //    video.playPauseMovie(ballVideo);
  //  }
  //} else videoMode = false;
  overSpeakerKeys();
  overAdditionalKeys();
}

void overSpeakerKeys() {
  float currXPos = timelineStart;
  textSize(20);
  for (int i = 0; i < paths.size(); i ++) {
    Path path = paths.get(i);
    if (overRect(currXPos, speakerKeysHeight, buttonWidth, buttonWidth)) path.show = !path.show;
    String name = getFullName(path.speaker);
    currXPos += (buttonWidth + textWidth(name) + buttonSpacing);
  }
}

void overAdditionalKeys() {
  float currXPos = timelineStart;
  textSize(20);
  if (overRect(currXPos, additionalKeysHeight, textWidth("Animate"), buttonWidth)) {
    if (animation) {
      animation = false;
      animationCounter = animationMaxValue;
    } else {
      animation = true;
      animationCounter = 0; // reset animation if playing/already played
    }
  } else if (overRect(currXPos + textWidth("Animate") + buttonSpacing, additionalKeysHeight, textWidth("Conversation"), buttonWidth)) showConversation = !showConversation;
  else if (overRect(currXPos + textWidth("AnimateConversation") + buttonSpacing, additionalKeysHeight, textWidth(" (2)"), buttonWidth)) allConversationView = !allConversationView;

  //else if (overRect(currXPos + textWidth("AnimateConversation (2)") + 2*buttonSpacing, additionalKeysHeight, textWidth("Video"), buttonWidth)) {
  //  videoMode = !videoMode;
  //  if (videoIsPlaying) {
  //    videoCurrTime = 0; // reset time to 0
  //    video.playPauseMovie(ballVideo);
  //  }
  //}
}

// returns name as string based on character
String getFullName(char speaker) {
  if (speaker == 'T') return "  Teacher";
  else if (speaker == 'S') return "  Sean";
  else if (speaker == 'M') return "  Mei";
  else if (speaker == 'C') return "  Cassandra";
  else if (speaker == 'N') return "  Nathan";
  else return "name";
}

// returns a color based on character
color getPathColor(char speaker) {
  String name = String.valueOf(speaker); // get/cast speaker as string
  int val = speakerColor.get(name); // get number from name to set color
  return colorShades[val];
}

// Tests if over circle with x, y and diameter
boolean overCircle(float x, float y, float diameter) {
  float disX = x - mouseX;
  float disY = y - mouseY;
  if (sqrt(sq(disX) + sq(disY)) < diameter/2 ) {
    return true;
  } else {
    return false;
  }
}

// Tests if over rectangle with x, y, and width/height
boolean overRect(float x, float y, float boxWidth, float boxHeight) {
  if (mouseX >= x && mouseX <= x + boxWidth &&
    mouseY >= y && mouseY <= y + boxHeight) {
    return true;
  } else {
    return false;
  }
}
