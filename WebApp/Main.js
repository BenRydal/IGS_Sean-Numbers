// import processing.video.*;

// DATA
var paths = []; // holder for each person
var rowCounts = []; // list to sort max/min number of movement points in each path
var animationMaxValue;
var floorPlan; // floor plan
var PLAN = 0, SPACETIME = 1; // constants to indicate plan or space-time views
var timelineStart, timelineEnd, timelineHeight;
var bugTimePosForVideo; // to draw slicer line when video is playing

//// Video Variables
//Movie ballVideo;
//Video video = new Video();
var videoMode = false; // indicates if video is active
var videoIsPlaying = false; // indicates if video is playing/stopped
//float videoCurrTime = 0; // video current time in seconds
//float videoDuration; // video duration set in loadData from video data

// GUI Variables
var font;
var speakerColor = {}; // hash for speaker color
var colorShades = ['#984ea3', '#377eb8', '#4daf4a', '#e41a1c', '#ff7f00']; // Teacher, Sean, Mei, Cassandra, Nathan
var showConversation = false, animation = true; // indicates conversation selected and program animating
var allConversationView = false;
var animationCounter = 0; // controls animation
var conversationRectWidth = 9, minConversationRectLength = 5;
var buttonSpacing, buttonWidth, speakerKeysHeight, additionalKeysHeight;
var bugPrecision, bugSize;

function preload() {
    preloadCSVs();
}

function setup() {
    //fullscreen(P3D);
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    pixelDensity(displayDensity());
    font = loadFont('data/Rufina-Regular.ttf');
    textFont(font, 14);
    floorPlan = loadImage("data/floorPlan.png");
    setData();
    frameRate(30);
}

function draw() {
    updateAnimation();
    image(floorPlan, 0, 0, width, height);
    // if (videoMode) video.draw();
    var keys = new Keys();
    keys.drawKeys();
    var drawData = new DrawData();
    for (var i = 0; i < paths.length; i++) {
     var path = paths[i];
     if (path.show) drawData.setDrawData(path);
    }
    drawData.setConversationBubble();
}

function updateAnimation() {
    if (animationCounter < animationMaxValue) animationCounter++;
    else animation = false;
}