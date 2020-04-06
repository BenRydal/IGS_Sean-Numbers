/**********************************************************************************************
Conceptually, KalturaPlayer and YoutubePlayer are implementations of a VideoPlayer interface
(but because JS is dynamically typed, we don't actually need to declare a VideoPlayer interface)

Any additional implementation of VideoPlayer should have the following methods:
    seekTo(time), play(), pause(), mute(), unMute(), getCurrentTime()

Note the params variable passed into the constructor, this is designed to be a dictionary
containing any relevant settings and id's that are used to initailize the player to the
correct video.
**********************************************************************************************/

// This is the VideoPlayer implementation that utilizes the Kaltura Player Javascript API
class KalturaPlayer {
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
                'controlBarContainer.plugin': false,
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

    seekTo(time) { this.player.sendNotification('doSeek', time); }

    play() { this.player.sendNotification('doPlay'); }

    pause() { this.player.sendNotification('doPause'); }

    mute() { this.player.sendNotification('changeVolume', 0); }

    unMute() { this.player.sendNotification('changeVolume', 1); }

    getCurrentTime() { return this.player.evaluate('{video.player.currentTime}'); }
}

// This is the VideoPlayer implementation that utilizes the Youtube Player API
class YoutubePlayer {
    constructor(params) {
        this.targetId = params['targetId'];
        this.videoId = params['videoId'];
        this.initialize();
    }

    initialize() {
        this.player = new YT.Player(this.targetId, {
            videoId: this.videoId,
            playerVars: {
                controls: 0,
                disablekb: 1,
            }
        });
    }

    seekTo(time) { this.player.seekTo(time, true); }

    play() { this.player.playVideo(); }

    pause() { this.player.pauseVideo(); }

    mute() { this.player.mute(); }

    unMute() { this.player.unMute(); }

    getCurrentTime() { return this.player.getCurrentTime(); }
}