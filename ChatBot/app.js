// app.js
import apiKey from "./config";

const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const chatArea = document.getElementById("chat-log");

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

    try {
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
      console.log("API Response Data:", responseData);

      const botResponse = responseData.choices[0]?.text || "No response available";
      appendMessage("Bot: " + botResponse);
    } catch (error) {
      console.error("Error:", error);
      appendMessage("Bot: Oops, something went wrong.");
    }

    userInput.value = "";
  }
}

// Clear chat area
document.getElementById("clear-button").addEventListener("click", () => {
  chatArea.innerHTML = "";
});
