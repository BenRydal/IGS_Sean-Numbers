class DrawData {

  constructor() {
    this.drawConversation = new DrawDataConversation();
    this.drawMovement = new DrawDataMovement();
  }

  setDrawData(path) {
    var shade = getPathColor(path.speaker); // get color for path
    this.drawMovement.setData(path, shade);
    this.drawConversation.setData(path);
  }

  setConversationBubble() {
    this.drawConversation.setConversationBubble();
  }

}