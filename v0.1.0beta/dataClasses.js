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