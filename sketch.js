// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let video;

let modelURL = "./model/model.json";

let label;
let confidence;
let maus = "🐭";
let mausX = 30;
let incrX = 5;

let tabOpened = false;

function preload() {
	classifier = ml5.imageClassifier(modelURL);
	label = "Das Model lädt"
  }

function setup() 
{
	createCanvas(900, 600);
	video = createCapture(VIDEO)
	video.hide();

	textSize(32);
	textAlign(CENTER, CENTER)
	fill(0, 0, 255)

	classifyVideo();
}

function draw()
{
	background(0)
	image(video, 0, 0, width, height)
	text(label, width/2, height - 50)
	text(confidence, width/2, height - 20)

	text(maus, mausX, height - 30)

	if (label == "iphone" && confidence >= 90 + "%") {
		openApple()
	}

	else if (label == "high5" && confidence >= 90 + "%") {
		highFive()
	}

	else if (label == "mouse" && confidence >= 90 + "%") {
		mouseRun()
	}
}

function classifyVideo() {
	classifier.classify(video, gotResult)
};

function gotResult(error, result) {
	if(error) {
		console.error(error);
		return;
	} 
	classifyVideo();
	label = result[0].label;
	confidence = nf(result[0].confidence * 100, 0, 2) + "%";
	// console.log(result)
}

function openApple() {

	if(!tabOpened) {
		window.open('https://www.apple.com', '_blank');
	}

	tabOpened = true;
}


function highFive() {
	push()
	textSize(82);
	text("High Five ✋", width/2, height/2);
	pop()
}

function mouseRun() {
	if (mausX >= 200 || mausX <= 20) {
		incrX *= -1
	}

		mausX += incrX
}