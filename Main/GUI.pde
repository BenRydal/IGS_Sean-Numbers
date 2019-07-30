void mousePressed() {
  if (introMsg) introMsg = false;
  if (!animation && videoMode && overRect(timelineStart, 0, timelineEnd, timelineHeight)) {
    videoCurrTime = map(mouseX, timelineStart, timelineEnd, 0, videoDuration);
    video.playPauseMovie(ballVideo);
  }
}

void keyPressed() {
  if (key == 'v' || key == 'V') {
    videoMode = !videoMode;
    if (videoIsPlaying) {
      videoCurrTime = 0; // reset time to 0
      video.playPauseMovie(ballVideo);
    }
  }
  if (key == 'c' || key == 'C') showConversation = !showConversation;
  if (key == 'a' || key == 'A') {
    if (animation) numberOfPoints = movement.size()-1;
    else numberOfPoints = 0;
  }
}

boolean overCircle(float x, float y, float diameter) {
  float disX = x - mouseX;
  float disY = y - mouseY;
  if (sqrt(sq(disX) + sq(disY)) < diameter/2 ) {
    return true;
  } else {
    return false;
  }
}

boolean overRect(float x, float y, float boxWidth, float boxHeight) {
  if (mouseX >= x && mouseX <= x + boxWidth &&
    mouseY >= y && mouseY <= y + boxHeight) {
    return true;
  } else {
    return false;
  }
}
