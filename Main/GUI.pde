// returns name as string based on character
String getFullName(char speaker) {
  if (speaker == 'T') return "  Teacher";
  else if (speaker == 'S') return "  Sean";
  else if (speaker == 'M') return "  Mei";
  else if (speaker == 'C') return "  Cassandra";
  else if (speaker == 'N') return "  Nathan";
  else return "name";
}

// returns a color based on character
color getPathColor(char speaker) {
  String name = String.valueOf(speaker); // get/cast speaker as string
  int val = speakerColor.get(name); // get number from name to set color
  return colorShades[val];
}

// Tests if over circle with x, y and diameter
boolean overCircle(float x, float y, float diameter) {
  float disX = x - mouseX;
  float disY = y - mouseY;
  if (sqrt(sq(disX) + sq(disY)) < diameter/2 ) {
    return true;
  } else {
    return false;
  }
}

// Tests if over rectangle with x, y, and width/height
boolean overRect(float x, float y, float boxWidth, float boxHeight) {
  if (mouseX >= x && mouseX <= x + boxWidth &&
    mouseY >= y && mouseY <= y + boxHeight) {
    return true;
  } else {
    return false;
  }
}
