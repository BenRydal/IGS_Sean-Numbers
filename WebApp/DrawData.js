class DrawData {

  setDrawData(path) {
    var shade = getPathColor(path.speaker); // get color for path
    var drawMovement = new DrawDataMovement();
    drawMovement.setData(path, shade);
    var drawConversation = new DrawDataConversation();
    drawConversation.setData(path);
  }

}