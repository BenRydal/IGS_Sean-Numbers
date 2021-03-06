// Updates time selected in video for animation or when mouse is clicked
function updateVideoScrubbing() {
    if (animation) videoPlayer.seekTo(map(bugTimePosForVideo, timelineStart, timelineEnd, videoStart, videoEnd));
    else if (!videoIsPlaying && overRect(timelineStart, 0, timelineEnd, timelineHeight)) videoPlayer.seekTo(map(mouseX, timelineStart, timelineEnd, videoStart, videoEnd));
}

// Transition increase size for video
function increaseVideoSize() {
    var video = select('#moviePlayer');
    if (videoWidthPlayCounter < videoWidthOnPlay) {
        videoWidthPlayCounter += videoTransitionCounter;
        video.style('width', videoWidthPlayCounter + '');
    }
    if (videoHeightPlayCounter < videoHeightOnPlay) {
        videoHeightPlayCounter += videoTransitionCounter;
        video.style('height', videoHeightPlayCounter + '');
    }
    videoPlayer.unMute();
}

// Transition decrease size for video
function decreaseVideoSize() {
    var video = select('#moviePlayer');
    if (videoWidthPlayCounter > videoWidthOnPause) {
        videoWidthPlayCounter -= videoTransitionCounter;
        video.style('width', videoWidthPlayCounter + '');
    }
    if (videoHeightPlayCounter > videoHeightOnPause) {
        videoHeightPlayCounter -= videoTransitionCounter;
        video.style('height', videoHeightPlayCounter + '');
    }
    videoPlayer.mute();
}

// Plays/pauses video and sets boolean videoIsPlaying
function playPauseMovie() {
    if (videoIsPlaying) {
        videoPlayer.pause();
        videoIsPlaying = false;
    } else {
        videoPlayer.seekTo(videoCurrTime, true);
        videoPlayer.play();
        videoIsPlaying = true;
    }
}

// Pauses video, assumes boolean videoIsPlaying is set
function pauseMovie() {
    videoPlayer.pause();
    videoIsPlaying = false;
}

// Returns the current time of the video
function getMovieCurrentTime() {
    return videoPlayer.getCurrentTime();
}