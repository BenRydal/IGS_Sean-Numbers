class Video {

  void draw() {
    if (!videoIsPlaying) {
      tint(255, 130);
      if (animation) jumpToVideoFrame(bugTimePosForVideo);
      else if (overRect(timelineStart, 0, timelineEnd, timelineHeight)) jumpToVideoFrame(mouseX);
    }
    image(ballVideo, timelineStart, 0, width - timelineStart, timelineHeight - 50);
    noTint();
  }

  // always get playing time after pause and jump to playing time after play
  void playPauseMovie(Movie cam) {
    if (videoIsPlaying) {
      cam.pause();
      videoIsPlaying = false;
    } else {
      cam.jump(videoCurrTime);
      cam.play();
      ballVideo.volume(1);
      videoIsPlaying = true;
    }
  }

  void jumpToVideoFrame(float valueToMap) {
    ballVideo.jump(map(valueToMap, timelineStart, timelineEnd, 0, videoDuration));
    ballVideo.play();
    ballVideo.volume(0);
    ballVideo.pause();
  }
}

// Necessary to include for Processing enviornment
void movieEvent(Movie m) {
  m.read();
}
