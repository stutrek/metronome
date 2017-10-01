var bpmValue = document.getElementById('bpm-value');
var bpmSlider = document.getElementById('bpm-slider');

var startStopButton = document.getElementById('start-stop');

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

if (localStorage.getItem('metronome-bpm')) {
	bpmSlider.value = bpmValue.value = localStorage.getItem('metronome-bpm');
}


var playing = null;
var bpm = +bpmValue.value;

function click () {
	// create Oscillator node
	var oscillator = audioCtx.createOscillator();
	oscillator.frequency.value = 440; // value in hertz
	oscillator.connect(audioCtx.destination);

	oscillator.start();
	oscillator.stop(audioCtx.currentTime + 0.001);
}

startStopButton.addEventListener('click', function () {
	if (playing) {
		this.innerHTML = 'Start';
		this.classList.remove('playing');
		clearInterval(playing);
		playing = null;
	} else {
		this.innerHTML = 'Stop';
		this.classList.add('playing');
		playing = setInterval(click, (1000 * 60) / bpm);
	}

});

function handleChange () {
	bpmSlider.value = bpmValue.value = this.value;
	bpm = +bpmValue.value;

	localStorage.setItem('metronome-bpm', bpm);

	if (playing) {
		clearInterval(playing);
		playing = setInterval(click, (1000 * 60) / bpm);
	}
}

bpmValue.addEventListener('change', handleChange);
bpmSlider.addEventListener('input', handleChange);
