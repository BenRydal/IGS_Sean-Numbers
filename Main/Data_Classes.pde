// Holds data for movement points derived from table
class Point_Movement {
  float xPos;
  float yPos;
  float time;
}

// Holds data for conversation points derived from table
class Point_Conversation {
  float xPos;
  float yPos;
  float time;
  String talkTurn; // spoken words/conversation
}

// Path has list of movement and conversation points, speaker, and boolean indicating if it is showing
class Path {
  ArrayList<Point_Movement> movement;
  ArrayList<Point_Conversation> conversation;
  char speaker;
  boolean show;

  Path(char speaker) {
    this.movement = new ArrayList<Point_Movement>();
    this.conversation = new ArrayList<Point_Conversation>();
    this.show = true;
    this.speaker = speaker;
  }
}
