class DrawData {

	constructor() {
		this.drawConversation = new DrawDataConversation();
		this.drawMovement = new DrawDataMovement();
	}

	setDrawData(path) {
		var shade = getPathColor(path.speaker); // get color for path
		if (conversationView_1 || conversationView_2) this.drawConversation.setData(path);
		this.drawMovement.setData(path, shade);
	}

	setConversationBubble() {
		this.drawConversation.setConversationBubble();
	}

}