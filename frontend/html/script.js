let messageHistory = [];

async function displayMessageHistory(messages) {
	const messageHistoryDiv = document.querySelector('#messages-container');
	messageHistoryDiv.innerHTML = "";
	for(let message of messages) {
		const newMessageDiv = document.createElement("div");
		const newHeaderDiv = document.createElement("div");
		const newContentDiv = document.createElement("div");

		newMessageDiv.className = 'message-container';
		newMessageDiv.style.display = "block";

		newHeaderDiv.className = 'message-header';
		newHeaderDiv.innerText = message.role == "user" ? "You:" : "Assistant:";

		newContentDiv.className = 'message-content';
		newContentDiv.innerHTML = message.content;

		newMessageDiv.append(newHeaderDiv);
		newMessageDiv.append(newContentDiv);
		messageHistoryDiv.append(newMessageDiv);
	}
	window.scrollTo(0, document.body.scrollHeight);
}


async function displayLatestResponse(latestResponseText) {
	const messageContainers = document.querySelectorAll('.message-container')
	const latestResponseContainer = messageContainers.item(messageContainers.length - 1)
	const latestResponseContentDiv = latestResponseContainer.querySelector('.message-content');
	latestResponseContentDiv.innerHTML = latestResponseText;
}


document.addEventListener("DOMContentLoaded", function() {
	document.querySelector("#chat-form").addEventListener("submit", async function(event) {
		event.preventDefault();

		let ws = new WebSocket("ws://assistant.mysliwczykrafal.pl:80/chat");
		let latestResponseChunks = "";

		const submitButton = document.querySelector('input[type="submit"]');
		submitButton.disabled = true;
		submitButton.value = "Generating response..."

		const content = document.querySelector('#content').value;
		messageHistory.push({"role": "user", "content": content});

		displayMessageHistory(messageHistory);
		
		ws.onopen = function() {
			ws.send(JSON.stringify(messageHistory))
			messageHistory.push({"role": "assistant", "content": ""})
			displayMessageHistory(messageHistory);
		}

		document.querySelector('#content').value = "";
		ws.onmessage = function(event) {
			latestResponseChunks += event.data;
			messageHistory.at(-1).content = marked.parse(latestResponseChunks);
			displayLatestResponse(messageHistory.at(-1).content);
			window.scrollTo(0, document.body.scrollHeight);
		};

		ws.onclose = function() {
			messageHistory.at(-1).content = marked.parse(latestResponseChunks);
			submitButton.disabled = false;
			submitButton.value = "Send message"
		}
	});
})
