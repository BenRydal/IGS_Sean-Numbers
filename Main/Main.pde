import processing.video.*;
// 428 seconds in deborah ball video, 7 minutes, 8 seconds

/*
String infoMessage = "
 This vis revists a classic example of work by D. Ball that ….
 It dapts an IG approach to focus on one teachers movement and classroom conversation while also allowing for video etc.
 
 On the left is floor plan of classroom
 On right is a timeline in minutes and seconds
 Teachers movement shown over space and space time
 Read space time
 Press c Conversation—each line of talk is conversation turn-length of line is # of words
 Hover over conversation to read/highlight in space time and plan view
 Press v for video to be able to play video in space and time
 Press a for animation
 I to return to this message
 "
 */

ArrayList<Point> movement = new ArrayList(), conversation = new ArrayList(); // holders for movement and conversation points/class
class Point {
  float xPos;
  float yPos;
  float time;
  String conversation;
}
PImage floorPlan; // base map/floor plan
int PLAN = 0, SPACETIME = 1; // constants for 2 views
float timelineStart, timelineEnd, timelineHeight;
PFont font;
int bugPrecision = 5, bugSize = 25;
float bugXPos = -1, bugYPos = -1, bugTimePos = -1;

// Video Variables
Movie ballVideo;
Video video = new Video();
boolean videoMode = false; // boolean indicating whether video is active
boolean videoIsPlaying = false; // boolean indicating if video is playing/stopped
float videoCurrTime = 0; // video current time in seconds
float videoDuration; // video duration set in loadData from video data

// GUI Variables
boolean showConversation = false;
boolean animation = true;
boolean introMsg = true;
boolean conversationIsSelected = false; // true when a conversation is selected in GUI 
int[] conversationToDraw = {0, 0}; // Holds values to draw selected Conversation in GUI
int numberOfPoints = 0; // controls how many points are drawn and works with animation
color [] colors = {#984ea3, #377eb8, #4daf4a, #ff7f00, #e41a1c, #ffff33, #a65628};


void setup() {
  fullScreen(P2D);
  // size(500, 500, P2D);
  pixelDensity(displayDensity());
  font = loadFont("Helvetica-24.vlw");
  textFont(font, 14);
  floorPlan = loadImage("floorPlan.png");
  setData();
  frameRate(30);
}

void draw() {
  updateAnimation();
  image(floorPlan, 0, 0, width, height);
  if (videoMode) video.draw();
  DrawData drawData = new DrawData();
  drawData.setDrawData(movement, conversation);
}

void updateAnimation() {
  if (!introMsg && numberOfPoints < movement.size() -1) {
    numberOfPoints++;
    animation = true;
  } else animation = false;
}
