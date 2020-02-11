// returns name as string based on character
function getFullName(speaker) {
  if (speaker == 'T') return "  Teacher";
  else if (speaker == 'S') return "  Sean";
  else if (speaker == 'M') return "  Mei";
  else if (speaker == 'C') return "  Cassandra";
  else if (speaker == 'N') return "  Nathan";
  else return "name";
}

// returns a color based on character
function getPathColor(speaker) {
  var val = speakerColor[speaker]; // get number from name to set color
  return color(colorShades[val]);
}

// Tests if over circle with x, y and diameter
function overCircle(x, y, diameter) {
  var disX = x - mouseX;
  var disY = y - mouseY;
  if (sqrt(sq(disX) + sq(disY)) < diameter/2 ) {
    return true;
  } else {
    return false;
  }
}

// Tests if over rectangle with x, y, and width/height
function overRect(x, y, boxWidth, boxHeight) {
  if (mouseX >= x && mouseX <= x + boxWidth &&
    mouseY >= y && mouseY <= y + boxHeight) {
    return true;
  } else {
    return false;
  }
}