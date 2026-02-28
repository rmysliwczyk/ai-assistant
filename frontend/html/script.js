let messageHistory = [];

async function displayMessageHistory(messages) {
	const messageHistoryDiv = document.querySelector('#message-history-container');
	messageHistoryDiv.innerHTML = "";
	for(let message of messages) {
		const newMessageDiv = document.createElement("div");
		const newRoleDiv = document.createElement("div");
		const newContentP = document.createElement("p");


		newMessageDiv.className = 'message-container';
		newMessageDiv.style.display = "block";

		newRoleDiv.className = 'role-hint-container';
		newRoleDiv.innerText = message.role == "user" ? "You:" : "Assistant:";

		newContentP.innerHTML = message.content;


		newMessageDiv.append(newRoleDiv);
		newMessageDiv.append(newContentP);
		messageHistoryDiv.append(newMessageDiv);
	}
	window.scrollTo(0, document.body.scrollHeight);
}

async function displayLatestResponse(latestResponseText) {
	const latestResponseDiv = document.querySelector('#latest-response');
	if (latestResponseDiv.querySelector('.role-hint-container') == undefined) {
		const newRoleDiv = document.createElement("div");
		newRoleDiv.className = 'role-hint-container';
		newRoleDiv.innerText = "Assistant:";
		latestResponseDiv.append(newRoleDiv);
	}

	const latestResponseContentDiv = latestResponseDiv.querySelector('.latest-response-content-container');
	if (latestResponseContentDiv == undefined) {
		const latestResponseContentDiv = document.createElement("div");
		latestResponseContentDiv.className = 'latest-response-content-container';
		latestResponseContentDiv.innerHTML = marked.parse(latestResponseText);
		latestResponseDiv.append(latestResponseContentDiv);
	} else {
		latestResponseContentDiv.innerHTML = marked.parse(latestResponseText);
	}

	latestResponseDiv.style.display = "block";
}

async function pushLatestResponseToMessageHistory(messages) {
	const latestResponseDiv = document.querySelector('#latest-response');
	const latestResponseContentDiv = latestResponseDiv.querySelector('.latest-response-content-container');
	let latestResponseContent = marked.parse(latestResponseContentDiv.innerHTML);
	if (latestResponseContent.length > 0) {
		messages.push({"role": "assistant", "content": latestResponseContent});
		latestResponseDiv.innerHTML = "";
		latestResponseDiv.style.display = "none";
		displayMessageHistory(messages);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	document.querySelector("#chat-form").addEventListener("submit", async function(event) {
		event.preventDefault();

		let ws = new WebSocket("ws://127.0.0.1:8888/chat");
		let latestResponseChunks = "";

		const submitButton = document.querySelector('input[type="submit"]');
		submitButton.disabled = true;
		submitButton.value = "Generating response..."

		const content = document.querySelector('#content').value;
		const message = { "role": "user", "content": content};
		messageHistory.push(message);

		displayMessageHistory(messageHistory);
		
		ws.onopen = function() {
			ws.send(JSON.stringify(messageHistory))
		}

		document.querySelector('#content').value = "";
		ws.onmessage = function(event) {
			latestResponseChunks += event.data;
			// addToLatestResponse(event.data);
			displayLatestResponse(latestResponseChunks);

			window.scrollTo(0, document.body.scrollHeight);
		};

		ws.onclose = function() {
			pushLatestResponseToMessageHistory(messageHistory)
			submitButton.disabled = false;
			submitButton.value = "Send message"
		}
	});
})
