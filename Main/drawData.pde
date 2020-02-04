class DrawData {
  void setDrawData(Path path) {
    color shade = getPathColor(path.speaker); // get color for path
    DrawDataMovement drawMovement = new DrawDataMovement();
    drawMovement.setData(path, shade);
    //DrawDataConversation drawConversation = new DrawDataConversation();
    //drawConversation.setData(path);
  }
}
