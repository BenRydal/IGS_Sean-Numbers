/*
This data visualization uses an approach called interaction geography to revisit a famous example in teacher education known as the case of "Sean Numbers" from the work of renown teacher educator Dr. Deborah Loewenberg Ball. Sean Numbers describes a class discussion in an elementary school classroom which begins when one student, Sean, offers a conjecture that the number “6” is both an odd and an even number. Subsequently, the class discussion focuses on a debate about even and odd numbers, in which other students disagree with Sean’s conjecture. The case is an example of the importance of and challenges teachers face with respecting children’s thinking, with supporting mathematical discourse and reasoning, and with implementing accountable argumentation.

CREDITS/LICENSE INFORMATION: This software is  licensed under the GNU General Public License Version 2.0. See the GNU General Public License included with this software for more details. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. Data used with special permission from Mathemathics Learning and Learning to Teach, University of Michigan. IGS software originally developed by Ben Rydal Shapiro at Vanderbilt University as part of his dissertation titled Interaction Geography & the Learning Sciences. Copyright (C) 2018 Ben Rydal Shapiro, and contributers. To reference or read more about this work please see: https://etd.library.vanderbilt.edu/available/etd-03212018-140140/unrestricted/Shapiro_Dissertation.pdf
*/


//******* INPUT VARIABLES *******
var fileNames = ['Cassandra.csv', 'Mei.csv', 'Nathan.csv', 'Sean.csv', 'Teacher.csv']; // holds list of filenames, first letter of file is used to associate with speaker
var speakerColor = { // dictionary to associate colors to people
    "T": 0, // Teacher
    "S": 1, // Sean
    "M": 2, // Mei
    "C": 3, // Cassandra
    "N": 4 //  Nathan
};
var colorShades = ['#984ea3', '#377eb8', '#4daf4a', '#e41a1c', '#ff7f00']; // Purple, Blue, Green, Red, Orange
var videoPlatform = 'Kaltura'; // what platform the video is being hosted on
var videoParams = { // parameters that uniquely identify the video, platform specific
    wid: '_1038472',
    uiconf_id: '33084471',
    entry_id: '1_9tp4soob'
};
var videoDuration = 429; // video duration in seconds
var xScaleFactor = 1440; // scale factors to scale floor plan/data correctly
var yScaleFactor = 900;
var dataSamplingRate = 10; // rate data is sampled, increase to speed up program

//******* DATA *******
var dataTables = []; // holds # of files for data processing
var paths = []; // holder for each person
var rowCounts = []; // list to sort max/min number of movement points in each path
var animationMaxValue;
var floorPlan, floorPlanWithKey; // floor plans
var PLAN = 0,
    SPACETIME = 1; // constants to indicate plan or space-time views
var timelineStart, timelineEnd, timelineHeight;
var bugTimePosForVideo; // to draw slicer line when video is playing
var animationCounter = 0; // controls animation
var bugPrecision, bugSize;

//******* GUI *******
var font_PlayfairReg, font_PlayfairItalic, font_PlayfairBold, font_Lato;
var buttonSpacing, buttonWidth, speakerKeysHeight, buttonsHeight;
// 5 Modes
var animation = true,
    conversationView_1 = false,
    conversationView_2 = false,
    videoMode = false,
    howToRead = false;
// 5 Buttons correspond to modes
var button_1 = "Animate",
    button_2 = "Conversation 1",
    button_3 = "Conversation 2",
    button_4 = "Video",
    button_5 = "How to Read";
var keyTextSize, titleTextSize, infoTextSize, rectSize;
var conversationRectWidth, minConversationRectLength;
var textBoxWidth, textSpacing, boxSpacing, boxDistFromRect;

//******* VIDEO *******
var videoIsPlaying = false; // indicates if video is playing/stopped
var videoCurrTime = 0; // video current time in seconds
var videoWidthOnPause, videoHeightOnPause, videoWidthOnPlay, videoHeightOnPlay; // permanent video width/heights
var videoWidthPlayCounter, videoHeightPlayCounter; // allows for transition between video width/heights
var videoTransitionCounter = 40; // speed of video size transitions
var videoPlayer; // instantiated in setupMovie method in Video.js

//******* MESSAGES *******
// Buttons
var howToReadMSG_1 = "The left view shows the teachers movement over a floor plan of a 3rd grade classroom. The right view shows the teachers movement over a timeline where the vertical axis corresponds with the vertical dimension of the classroom.";
var howToReadMSG_2 = "Hover over each button to learn about interactive features in this visualization";
var animateMSG = "Press this button to animate movement and conversation over space and time";
var conversation_1_MSG = "Press this button to view individual conversation turns along each movement path. Hover over each conversation turn to read what each person says.";
var conversation_2_MSG = "Press this button to view all conversation turns along each movement path. Hover over each conversation turn to read what each person says.";
var videoMSG = "Press this button to watch video from this classroom discussion. Click anywhere on the timeline to play and pause video.";
// Title
var titleMsg = "Classroom Interaction Geography";
var infoMsg = "Revisiting the case of 'Sean Numbers' by Ben Rydal Shapiro & Christine Hsieh, Original Data Collected by Dr. Deborah Loewenberg Ball and used with special permission from Mathematics Teaching and Learning to Teach, University of Michigan";


// Holds data for movement points derived from table
class Point_Movement {
    constructor(xPos, yPos, time) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.time = time;
    }
}

// Holds data for conversation points derived from table
class Point_Conversation {
    constructor(xPos, yPos, time, talkTurn) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.time = time;
        this.talkTurn = talkTurn; //spoken words/conversation
    }
}

// Path has list of movement and conversation points, speaker, and boolean indicating if it is showing
class Path {
    constructor(speaker) {
        this.movement = []; //storing Point_Movement objects
        this.conversation = []; //storing Point_Conversation objects
        this.show = true;
        this.speaker = speaker;
    }
}


// Loads fonts, floor plan, and CSV file into p5.Table objects so that they can manipulated later
function preload() {
    for (var i = 0; i < fileNames.length; i++) { // loop through all files in directory
        var fileName = 'data/interaction/' + fileNames[i];
        var dataTable = loadTable(fileName, "header");
        dataTables.push(dataTable);
    }
    font_PlayfairReg = loadFont("data/PlayfairDisplay-Regular.ttf");
    font_PlayfairItalic = loadFont("data/PlayfairDisplay-Italic.ttf");
    font_Playfairbold = loadFont("data/PlayfairDisplay-Bold.ttf");
    font_Lato = loadFont("data/Lato-Light.ttf");
    floorPlan = loadImage("data/floorplan.png");
    // Set up the video element
    var movie = createDiv(); // create the div that will hold the video
    movie.id('moviePlayer');
    movie.style('display', 'none');
    setupMovie('moviePlayer', videoPlatform, videoParams); // set up the videoPlayer
}

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    pixelDensity(displayDensity());
    textFont(font_Lato, 14);
    textAlign(LEFT, TOP);
    setData();
}

function draw() {
    if (animationCounter < animationMaxValue) animationCounter++; // updates animation
    else animation = false;
    image(floorPlan, 0, 0, width, height);
    var keys = new Keys();
    keys.drawKeys();
    var drawData = new DrawData();
    for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        if (path.show) drawData.setDrawData(path);
    }
    drawData.setConversationBubble();
    if (howToRead) overButtonsMSGS();
    if (videoMode) {
        updateVideoScrubbing();
        if (videoIsPlaying) increaseVideoSize();
        else decreaseVideoSize();
    }
}
