const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");
const typingIndicator = document.getElementById("typing-indicator");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const userMessage = input.value;
    if (!userMessage.trim()) return;

    appendMessage("You", userMessage, "user");
    input.value = "";
    showTypingIndicator();

    fetch("/get_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
    })
        .then((response) => response.json())
        .then((data) => {
            hideTypingIndicator();
            appendMessage("ChatBot", data.response, "bot");
        })
        .catch((error) => {
            hideTypingIndicator();
            console.error("Error:", error);
        });
});

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        form.dispatchEvent(new Event("submit"));
    }
});

function appendMessage(sender, message, type) {
    const p = document.createElement("p");
    p.classList.add(type);
    p.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messages.appendChild(p);
    messages.scrollTop = messages.scrollHeight; // Auto-scroll
}

function showTypingIndicator() {
    typingIndicator.style.display = "flex";
}

function hideTypingIndicator() {
    typingIndicator.style.display = "none";
}

// Listen for enter key or send button click
document.getElementById("sendButton").addEventListener("click", function () {
    const inputField = document.getElementById("userInput");
    const userMessage = inputField.value.trim();
    
    if (userMessage) {
        appendMessage("user", userMessage); // Show user's message
        simulateBotResponse(userMessage);   // Simulate bot response
        inputField.value = "";             // Clear the input field
    }
});

function toggleChatbot() {
    const chatbotContainer = document.getElementById("chatbot-container");
    if (chatbotContainer.style.display === "none" || !chatbotContainer.style.display) {
        chatbotContainer.style.display = "block";
    } else {
        chatbotContainer.style.display = "none";
    }
}

