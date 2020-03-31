// Increments animation counter if below max value or sets animation to false/off
function updateAnimation() {
    if (animationCounter < animationMaxValue) animationCounter++;
    else animation = false;
}

// Updates time selected in video for animation or when mouse is clicked
function updateVideoScrubbing() {
    var kdp = document.getElementById('moviePlayer');
    if (animation) kdp.sendNotification('doSeek', map(bugTimePosForVideo, timelineStart, timelineEnd, 0, videoDuration));
    else if (!videoIsPlaying && overRect(timelineStart, 0, timelineEnd, timelineHeight)) kdp.sendNotification('doSeek', map(mouseX, timelineStart, timelineEnd, 0, videoDuration));
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
}

// Plays/pauses video and sets boolean videoIsPlaying
function playPauseMovie() {
    if (videoIsPlaying) {
        var kdp = document.getElementById('moviePlayer');
        kdp.sendNotification('doPause');
        videoIsPlaying = false;
    } else {
        var kdp = document.getElementById('moviePlayer');
        kdp.sendNotification('doSeek', videoCurrTime);
        kdp.sendNotification('doPlay');
        videoIsPlaying = true;
    }
}

// Pauses video, assumes boolean videoIsPlaying is set
function pauseMovie() {
    var kdp = document.getElementById('moviePlayer');
    kdp.sendNotification('doPause');
    videoIsPlaying = false;
}

// Returns the current time of the video
function getMovieCurrentTime() {
    var kdp = document.getElementById('moviePlayer');
    return kdp.evaluate('{video.player.currentTime}');
}

// Initialization for the Kaltura video player
function setupMovie() {
    kWidget.embed({
        'targetId': 'moviePlayer',
        'wid': '_1038472',
        'uiconf_id': '33084471',
        'entry_id': '1_9tp4soob',
        'flashvars': { // flashvars allows you to set runtime uiVar configuration overrides.
            'controlBarContainer.plugin': false,
            'disableOnScreenClick': true,
            'largePlayBtn.plugin': false,
            'autoPlay': false
        },
        'params': { // params allows you to set flash embed params such as wmode, allowFullScreen etc
            'wmode': 'transparent'
        }
    });
}
