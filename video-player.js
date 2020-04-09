/**********************************************************************************************
Conceptually, KalturaPlayer and YoutubePlayer are implementations of a VideoPlayer interface
(but because JS is dynamically typed, we don't actually need to declare a VideoPlayer interface)

Any additional implementation of VideoPlayer should have the following methods:
    seekTo(time), play(), pause(), mute(), unMute(), getCurrentTime()

Note the params variable passed into the constructors, this is designed to be a dictionary
containing any relevant settings and id's that are used to initailize the player to the
correct video.
**********************************************************************************************/


// This is the VideoPlayer implementation that utilizes the Kaltura Player Javascript API
// Note to use a Kaltura Player, a script must be imported of the format:
//     <script src="https://cdnapi.kaltura.com/p/{partner_id}/sp/{partnerId}00/embedIframeJs/uiconf_id/{uiconf_id}/partner_id/{partnerId}"></script>
class KalturaPlayer {

    // For a KalturaPlayer, Main.js should have:
    // videoPlatform = 'Kaltura';
    // videoParams = { wid: 'your_wid_here', uiconf_id: 'your_uiconf_id_here', entry_id: 'your_entry_id_here' };
    constructor(params) {
        this.targetId = params['targetId'];
        this.wid = params['wid'];
        this.uiconf_id = params['uiconf_id'];
        this.entry_id = params['entry_id'];
        this.initialize();
    }

    initialize() {
        kWidget.embed({
            'targetId': this.targetId,
            'wid': this.wid,
            'uiconf_id': this.uiconf_id,
            'entry_id': this.entry_id,
            'flashvars': { // flashvars allows you to set runtime uiVar configuration overrides.
                'controlBarContainer.plugin': false, // hides controls on the video
                'disableOnScreenClick': true,
                'largePlayBtn.plugin': false,
                'autoPlay': false
            },
            'params': { // params allows you to set flash embed params such as wmode, allowFullScreen etc
                'wmode': 'transparent'
            }
        });
        this.player = document.getElementById(this.targetId);
    }

    seekTo(time) {
        this.player.sendNotification('doSeek', time);
    }

    play() {
        this.player.sendNotification('doPlay');
    }

    pause() {
        this.player.sendNotification('doPause');
    }

    mute() {
        this.player.sendNotification('changeVolume', 0);
    }

    unMute() {
        this.player.sendNotification('changeVolume', 1);
    }

    getCurrentTime() {
        return this.player.evaluate('{video.player.currentTime}');
    }
}


// This is the VideoPlayer implementation that utilizes the Youtube Player API
// Note to use a Youtube Player, the Youtube iFrame Player API must be loaded of the format: 
// <script type="text/javascript" src="https://www.youtube.com/iframe_api"></script>

class YoutubePlayer {

    // For a YoutubePlayer, Main.js should have:
    // videoPlatform = 'Youtube';
    // videoParams = { videoId: 'your_videoId_here' };
    constructor(params) {
        this.targetId = params['targetId'];
        this.videoId = params['videoId'];
        this.initialize();
    }

    initialize() {
        this.player = new YT.Player(this.targetId, {
            videoId: this.videoId,
            playerVars: {
                controls: 0, // hides controls on the video
                disablekb: 1, // disables keyboard controls on the video
            }
        });
    }

    seekTo(time) {
        this.player.seekTo(time, true);
    }

    play() {
        this.player.playVideo();
    }

    pause() {
        this.player.pauseVideo();
    }

    mute() {
        this.player.mute();
    }

    unMute() {
        this.player.unMute();
    }

    getCurrentTime() {
        return this.player.getCurrentTime();
    }
}

// Updates time selected in video for animation or when mouse is clicked
function updateVideoScrubbing() {
    if (animation) videoPlayer.seekTo(map(bugTimePosForVideo, timelineStart, timelineEnd, 0, videoDuration));
    else if (!videoIsPlaying && overRect(timelineStart, 0, timelineEnd, timelineHeight)) videoPlayer.seekTo(map(mouseX, timelineStart, timelineEnd, 0, videoDuration));
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