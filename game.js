var wins = 0;
var losses = 0;

var maxErrors = 10;

var wordDisplayLettersElement = document.getElementById("word-display-letters");
var guessedLettersElement = document.getElementById("guessed-letters");
var errorCountElement = document.getElementById("error-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");
var alertLineElements = document.getElementsByClassName("alert-line");
var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
var pressAnyKeyToStart = [];
var pressAnyKeyToReset = [];
var youWin = [];
var youLose = [];
var emptyAlert = [];
var game = new Hangman();

document.onkeyup = function(event) {
	var userGuess = event.key;

	if (!game.gameOver) {
		if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
			game.checkGuess(userGuess);
		}
	} else {
		game = new Hangman();
		game.updatePageData();
	}
}

window.setInterval(function() {
}, 800);

function Hangman() {
	this.wordList = [
		"daffodil",
		"hydrangea",
		"tulip",
		"anemone",
		"dahlia",
		"petunia",
		"lavender",
		"marigold",
		"violets",
		"sunflower",
		"irises",
		"hyacinth",
		"plumeria",
		"bougainvillea",
		"wisteria",
		"clematis",
		"gardenia",
		"amaryllis"
	]

	this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
	this.guessedLetters = [];
	this.errors = 0;
	this.visibleLetters = [];
	this.gameOver = false;
	for (var i = 0; i < this.word.length; i++) {
		this.visibleLetters[i] = (false);
	}
}

Hangman.prototype.checkGuess = function(char) {
	this.guessedLetters.push(char);

	var isInWord = false;
	for (var i = 0; i < this.word.length; i++) {
		if (this.word.charAt(i) === char) {
			isInWord = true;
			this.visibleLetters[i] = true;
		}
	}
	if (!isInWord) {
		this.errors++;
	}

	if (this.errors >= maxErrors) {
		losses++;
		this.gameOver = true;
	}

	if (!this.visibleLetters.includes(false)) {
		wins++;
		this.gameOver = true;
	}

	game.updatePageData();
};

Hangman.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.visibleLetters.length; i++) {
		tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
		if (i < (this.visibleLetters.length - 1)) tempString += " ";
	}
	wordDisplayLettersElement.textContent = tempString;

	tempString = "";
	for (var i = 0; i < this.guessedLetters.length; i++) {
		tempString += (this.guessedLetters[i].toUpperCase());
		if (i < (this.guessedLetters.length - 1)) tempString += " ";
	}
	for (var i = tempString.length; i < 50; i++) {
		tempString += " ";
	}
	guessedLettersElement.textContent = tempString;

	tempString = this.errors + " / " + maxErrors;
	for (var i = tempString.length; i < 50; i++) {
		tempString += " ";
	}
	errorCountElement.textContent = tempString;

	tempString = wins + "";
	for (var i = tempString.length; i < 50; i++) {
		tempString += " ";
	}
	winCountElement.textContent = tempString;

	tempString = losses + "";
	for (var i = tempString.length; i < 50; i++) {
		tempString += " ";
	}
	lossCountElement.textContent = tempString;
}

game.updatePageData();