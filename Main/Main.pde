// import processing.video.*;

// DATA 
ArrayList<Path> paths = new ArrayList(); // holder for each person
IntList rowCounts = new IntList(); // list to sort max/min number of movement points in each path
int animationMaxValue;
PImage floorPlan; // floor plan
int PLAN = 0, SPACETIME = 1; // constants to indicate plan or space-time views
float timelineStart, timelineEnd, timelineHeight;
float bugTimePosForVideo; // to draw slicer line when video is playing

//// Video Variables
//Movie ballVideo;
//Video video = new Video();
//boolean videoMode = false; // indicates if video is active
//boolean videoIsPlaying = false; // indicates if video is playing/stopped
//float videoCurrTime = 0; // video current time in seconds
//float videoDuration; // video duration set in loadData from video data

// GUI Variables
PFont font;
IntDict speakerColor = new IntDict(); // hash for speaker color
color [] colorShades = {#984ea3, #377eb8, #4daf4a, #e41a1c, #ff7f00}; // Teacher, Sean, Mei, Cassandra, Nathan
boolean showConversation = false, animation = true; // indicates conversation selected and program animating
boolean allConversationView = false;
int animationCounter = 0; // controls animation
int conversationRectWidth = 9, minConversationRectLength = 5;
float buttonSpacing, buttonWidth, speakerKeysHeight, additionalKeysHeight;
int bugPrecision, bugSize;


void setup() {
  fullScreen(P3D);
  pixelDensity(displayDensity());
  font = loadFont("BookAntiqua-48.vlw");
  textFont(font, 14);
  floorPlan = loadImage("floorPlan.png");
  setData();
  frameRate(30);
}

void draw() {
  updateAnimation();
  image(floorPlan, 0, 0, width, height);
  // if (videoMode) video.draw();
  Keys keys = new Keys();
  keys.drawKeys();
  DrawData drawData = new DrawData();
  for (int i = 0; i < paths.size(); i++) {
    Path path = paths.get(i);
    if (path.show) drawData.setDrawData(path);
  }
}

void updateAnimation() {
  if (animationCounter < animationMaxValue) animationCounter++;
  else animation = false;
}
