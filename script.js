var table;

var generated = [];

function initMomir(json) {
	table = json;
}

function press(cost) {
	generate(cost);
}

function generate(cost) {
	let creatures = table[cost];
	if (creatures) {
		let cardName = randomItem(creatures);
		generated.push(cardName);
		updateClipboard(cardName);
		// clipboardFailed(cardName);
	} else {
		message('No creatures available at ' + cost + '!', 'red');
	}
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function updateClipboard(cardName) {
	navigator.clipboard.writeText(cardName).then(function() {
		message('Success! Card name copied to clipboard.', 'green');
	}, function() {
		clipboardFailed(cardName);
	});	
}

function message(text, color) {
	let message = document.createElement('div');
	message.classList.add('message');
	message.style.background = color;
	message.style.color = 'white';
	message.innerText = text;
	document.getElementById('log').appendChild(message);
	fadeOut(message);
}

function clipboardFailed(cardName) {
	let message = document.createElement('div');
	message.classList.add('message');
	message.style.background = 'orange';
	message.style.color = 'white';
	let text = document.createElement('div');
	text.innerText = 'Copy to clipboard failed! Your card is:';
	message.appendChild(text);
	let input = document.createElement('input');
	input.value = cardName;
	message.appendChild(input);
	let button = document.createElement('button');
	button.innerText = 'Close';
	button.onclick = function() {
		message.remove();
	};
	message.appendChild(button);
	document.getElementById('log').appendChild(message);
	setTimeout(function() {
		input.select();
	}, 10);
}

window.onkeydown = function(event) {
	switch (event.key) {
	case '1': case '2': case '3': case '4': case '5':
	case '6': case '7': case '8': case '9':
		generate(event.key);
		break;
	case '0':
		generate(10);
		break;
	default:
	}
}

const MESSAGE_LIFETIME = 5000;
const FADE_TIME = 1000;

function fadeOut(node) {
	setTimeout(function () {
		let time = Date.now();
		var fadeEffect = setInterval(function () {
			opacity = Math.max(0, 1 - (Date.now() - time) / FADE_TIME);
			if (opacity > 0) {
				node.style.opacity = opacity;
			} else {
				node.remove();
				clearInterval(fadeEffect);
			}
		}, 50);
	}, MESSAGE_LIFETIME);
}
