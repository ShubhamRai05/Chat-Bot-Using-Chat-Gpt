const apiKey = process.env.REACT_APP_API_KEY; 
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
      // ... (previous code)

      const responseData = await response.json();
      console.log("API Response Data:", responseData); // Log the response data

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
