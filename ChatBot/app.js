const apiKey = "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"; // Replace with your API key
const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const chatArea = document.getElementById("chat-area");

sendButton.addEventListener("click", sendMessage);

function appendMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.innerText = message;
  chatArea.appendChild(messageDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

async function sendMessage() {
  const userMessage = userInput.value;
  if (userMessage.trim() !== "") {
    appendMessage("You: " + userMessage);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: userMessage,
        max_tokens: 50,
      }),
    });

    const responseData = await response.json();
    const botResponse = responseData.choices[0].text;

    appendMessage("Bot: " + botResponse);

    userInput.value = "";
  }
}

// Clear chat area
document.getElementById("clear-button").addEventListener("click", () => {
  chatArea.innerHTML = "";
});
