function toggleJob(container) {
    container.classList.toggle("expanded");
    // reset other containers if only one should be expanded at a time
    document.querySelectorAll('.grid-card-1, .grid-card-2, .grid-card-3').forEach(job => {
        if (job !== container) {
            job.classList.remove('expanded');
        }
    });
}

function toggleImage(card) {
    // Toggle the expanded class for the clicked card
    card.classList.toggle("expanded");

    // Reset other cards
    document.querySelectorAll('.project-card-1, .project-card-2, .project-card-3, .project-card-4').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove("expanded");
        }
    });
}

function menuIcon() {
    const menu = document.querySelector(".nav-links");
    const icon = document.querySelector("#menu-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function() {
    // Display the initial AI message when the chatbox loads
    displayMessage(
        "Hello, I'm JARVIS, William's personal AI assistant. I'm Just A Rather Very Intelligent System designed to answer any questions you may have about William. Can I be of any assistance?", 
        "ai"
    );
});

async function sendMsg() {
    let inputField = document.getElementById("chat-input");
    let message = inputField.value.trim();
    if (message === "") return;

    // Display user message
    displayMessage(message, "user");
    inputField.value = "";

    try {
        let response = await fetch("https://portfolio-final-k8lf.onrender.com/api/chat", {  // Update the API URL if deployed
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        let data = await response.json();
        displayMessage(data.reply, "ai");
    } catch (error) {
        console.error("Error connecting to AI:", error);
        displayMessage("Error: Unable to connect to JARVIS AI.", "ai");
    }
}


// Function to display messages in the chatbox
function displayMessage(message, sender) {
    let chatBox = document.getElementById("chat-msgs");
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);

    // Add icon based on sender
    let iconDiv = document.createElement("div");
    iconDiv.classList.add("chat-icon");

    if (sender === "ai") {
        iconDiv.innerHTML = "<i class='bx bxs-bot'></i>";
    } else {
        // User Icon (Boxicons)
        iconDiv.innerHTML = "<i class='bx bxs-user'></i>";
    }

    let textDiv = document.createElement("div");
    textDiv.classList.add("chat-text");
    textDiv.textContent = message;

    if (sender === "ai") {
        messageDiv.appendChild(iconDiv); // AI icon on left
        messageDiv.appendChild(textDiv);
    } else {
        messageDiv.appendChild(textDiv);
        messageDiv.appendChild(iconDiv); // User icon on right
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
}

// Handle Enter Key
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMsg();
    }
}
