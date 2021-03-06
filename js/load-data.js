function setData() {
    setGUI();
    processData();
    animationMaxValue = Math.min(...rowCounts); // set animationMaxVlaue to the smallest data file
}

function setGUI() {
    setBaseValues();
    setTextSizes();
    setConversationValues();
    setVideoValues();
}

function setBaseValues() {
    timelineStart = width * 0.4638; // scale factors
    timelineEnd = width * 0.9638;
    timelineHeight = height * .8466;
    buttonSpacing = width / 71;
    buttonWidth = buttonSpacing;
    speakerKeysHeight = timelineHeight + (height - timelineHeight) / 5;
    buttonsHeight = timelineHeight + (height - timelineHeight) / 2;
    bugPrecision = 3;
    bugSize = width / 56;
}

function setTextSizes() {
    keyTextSize = width / 70;
    titleTextSize = width / 55;
    infoTextSize = width / 100;
}

function setConversationValues() {
    rectSize = 0.5;
    conversationRectWidth = width / 156;
    minConversationRectLength = width / 282;
    textBoxWidth = width / 3.5; // width of text and textbox drawn
    textSpacing = width / 57; // textbox leading
    boxSpacing = width / 141; // general textBox spacing variable
    boxDistFromRect = width / 28.2; // distance from text rectangle of textbox
}

function setVideoValues() {
    var video = select('#moviePlayer').position(timelineStart, 0); // position video in upper left corner on timeline
    videoWidthOnPause = width / 5;
    videoHeightOnPause = width / 6;
    videoWidthOnPlay = width - timelineStart;
    videoHeightOnPlay = height * .74;
    videoWidthPlayCounter = videoWidthOnPause;
    videoHeightPlayCounter = videoHeightOnPause;
}

// Initialization for the video player
function setupMovie(movieDiv, platform, params) {
    params['targetId'] = movieDiv; // regardless of platform, the videoPlayer needs a target div
    // Based on the specified platform, chose the appropriate type of videoPlayer to use
    switch (platform) {
        case "Kaltura":
            videoPlayer = new KalturaPlayer(params);
            break;
        case "Youtube":
            videoPlayer = new YoutubePlayer(params);
            break;
    }
}


function processData() {
    for (var i = 0; i < dataTables.length; i++) { // loop through all files in directory
        loadDataTable(dataTables[i], fileNames[i].charAt(0)); // Use first letter of file name to associate with speaker
    }
}

// Loads each speaker p5.Table as Path object to paths ArrayList. Path object is a person/path with movement and conversation Point objects, speaker and boolean show
function loadDataTable(data, speaker) {
    var movement = []; // holds location data for each path
    var conversation = []; // holds conversaton data and location data for conversation for each path
    var rowCount = data.getRowCount();
    rowCounts.push(rowCount / dataSamplingRate); // add number of data points to rowCounts list to set animation

    // loop through table
    for (var i = 0; i < rowCount; i++) {
        // if there is a conversation turn, add it to conversation ArrayList
        var turn = data.getString(i, "talk");
        if (turn.length > 0) {
            var convoToAdd = new Point_Conversation();
            convoToAdd.xPos = data.getNum(i, "x") * width / xScaleFactor; // divide by scale factors to fit screen correctly
            convoToAdd.yPos = data.getNum(i, "y") * height / yScaleFactor;
            convoToAdd.time = map(i, 0, rowCount, timelineStart, timelineEnd);
            convoToAdd.talkTurn = turn;
            conversation.push(convoToAdd);
        }
        if (i % dataSamplingRate == 0) { // only add to movement list based on sampling rate (reduces data)
            var mvmntToAdd = new Point_Movement();
            mvmntToAdd.xPos = data.getNum(i, "x") * width / xScaleFactor; // scale factors to fit screen correctly
            mvmntToAdd.yPos = data.getNum(i, "y") * height / yScaleFactor;
            mvmntToAdd.time = map(i, 0, rowCount, timelineStart, timelineEnd);
            movement.push(mvmntToAdd); // always add to movement and only sometimes add to conversationPoints
        }
    }
    var s = new Path(speaker);
    s.movement = movement;
    s.conversation = conversation;
    paths.push(s);
}