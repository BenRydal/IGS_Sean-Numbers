// Increments animation counter if below max value or sets animation to false/off
function updateAnimation() {
    if (animationCounter < animationMaxValue) animationCounter++;
    else animation = false;
}

// Updates time selected in video for animation or when mouse is clicked
function updateVideoScrubbing() {
    var kdp = document.getElementById('kalturaPlayer');
    if (animation) kdp.sendNotification('doSeek', map(bugTimePosForVideo, timelineStart, timelineEnd, 0, videoDuration));
    else if (!videoIsPlaying && overRect(timelineStart, 0, timelineEnd, timelineHeight)) kdp.sendNotification('doSeek', map(mouseX, timelineStart, timelineEnd, 0, videoDuration));
}

// Transition increase size for video
function increaseVideoSize() {
    var video = select('#kalturaPlayer');
    if (videoWidthPlayCounter < videoWidthOnPlay) {
        videoWidthPlayCounter += videoTransitionCounter;
        video.style('width', videoWidthPlayCounter + '');
    }
    if (videoHeightPlayCounter < videoHeightOnPlay) {
        videoHeightPlayCounter += videoTransitionCounter;
        video.style('height', videoHeightPlayCounter + '');
    }
}

// Transition decrease size for video
function decreaseVideoSize() {
    var video = select('#kalturaPlayer');
    if (videoWidthPlayCounter > videoWidthOnPause) {
        videoWidthPlayCounter -= videoTransitionCounter;
        video.style('width', videoWidthPlayCounter + '');
    }
    if (videoHeightPlayCounter > videoHeightOnPause) {
        videoHeightPlayCounter -= videoTransitionCounter;
        video.style('height', videoHeightPlayCounter + '');
    }
}

// Plays/pauses video and sets boolean videoIsPlaying
function playPauseMovie() {
    var video = select('#kalturaPlayer');
    if (videoIsPlaying) {
        var kdp = document.getElementById('kalturaPlayer');
        kdp.sendNotification('doPause');
        videoIsPlaying = false;
    } else {
        var kdp = document.getElementById('kalturaPlayer');
        kdp.sendNotification('doSeek', videoCurrTime);
        kdp.sendNotification('doPlay');
        videoIsPlaying = true;
    }
}