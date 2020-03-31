// object that can make changes to the state of the video (play, pause, etc.)
var player;

// Increments animation counter if below max value or sets animation to false/off
function updateAnimation() {
    if (animationCounter < animationMaxValue) animationCounter++;
    else animation = false;
}

// Updates time selected in video for animation or when mouse is clicked
function updateVideoScrubbing() {
    switch(videoPlatform) {
        case "Kaltura":
            if (animation) player.sendNotification('doSeek', map(bugTimePosForVideo, timelineStart, timelineEnd, 0, videoDuration));
            else if (!videoIsPlaying && overRect(timelineStart, 0, timelineEnd, timelineHeight)) player.sendNotification('doSeek', map(mouseX, timelineStart, timelineEnd, 0, videoDuration));
            break;
        case "Youtube":
            if (animation) player.seekTo(map(bugTimePosForVideo, timelineStart, timelineEnd, 0, videoDuration), true);
            else if (!videoIsPlaying && overRect(timelineStart, 0, timelineEnd, timelineHeight)) player.seekTo(map(mouseX, timelineStart, timelineEnd, 0, videoDuration), true);
            break;
    }
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
    switch(videoPlatform) {
        case "Kaltura":
            if (videoIsPlaying) {
                player.sendNotification('doPause');
                videoIsPlaying = false;
            } else {
                player.sendNotification('doSeek', videoCurrTime);
                player.sendNotification('doPlay');
                videoIsPlaying = true;
            }
            break;
        case "Youtube":
            if (videoIsPlaying) {
                player.pauseVideo();
                videoIsPlaying = false;
            } else {
                player.seekTo(videoCurrTime, true);
                player.playVideo();
                videoIsPlaying = true;
            }
            break;
    }
}

// Pauses video, assumes boolean videoIsPlaying is set
function pauseMovie() {
    switch(videoPlatform) {
        case "Kaltura":
            player.sendNotification('doPause');
            break;
        case "Youtube":
            player.pauseVideo();
            break;
    }
    videoIsPlaying = false;
}

// Returns the current time of the video
function getMovieCurrentTime() {
    var currentTime = 0;
    switch(videoPlatform) {
        case "Kaltura":
            currentTime = player.evaluate('{video.player.currentTime}');
            break;
        case "Youtube":
            currentTime = player.getCurrentTime();
            break;
    }
    return currentTime;
}

// Initialization for the video player
function setupMovie() {
    switch(videoPlatform) {
        case "Kaltura":
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
            player = document.getElementById('moviePlayer');
            break;
        case "Youtube":
            player = new YT.Player('moviePlayer', {
                videoId: 'Iu0rxb-xkMk',
                playerVars: {
                    controls: 0,
                    disablekb: 1,
                }
            });
            break;
    }
}
