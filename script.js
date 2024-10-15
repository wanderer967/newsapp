require('dotenv').config();
const apiKey1 = 'SIY1uG9KyJsGTw0zUUWbtrmm_bimvkGt-XEWWC8GDbV5QLXc';
const blogContainer = document.getElementById("blog-container");
const loadingModal = document.getElementById("loading-modal"); // Loading modal reference

async function fetchRandomNews() {
    try {
        const apiUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey1}&language=en&country=PH`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.news || [];
    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    loadingModal.style.display = "none"; // Hide the loading modal once the results are displayed

    if (articles.length === 0) {
        blogContainer.innerHTML = "<p>No articles available.</p>";
        return;
    }

    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.image || "https://via.placeholder.com/150";
        img.alt = article.title;

        const title = document.createElement("h2");
        const TruncatedTitle = article.title.length > 90 ? article.title.slice(0, 90) + "..." : article.title;
        title.textContent = TruncatedTitle;

        const description = document.createElement("p");
        const TruncatedDescription = article.description && article.description.length > 1 ? article.description.slice(0, 0) : article.description || "No description available.";
        description.textContent = TruncatedDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news:", error);
    }
})();

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query !== "") {
        await fetchAndDisplayNews(query);
    } else {
        alert("Please enter a search query.");
    }
});

async function fetchAndDisplayNews(query) {
    try {
        // Show the loading modal when fetching news
        loadingModal.style.display = "block";

        const apiUrl = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${query}&language=en&country=PH`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayBlogs(data.news || []);
    } catch (error) {
        console.error("Error fetching search results:", error);
        loadingModal.style.display = "none"; // Hide the modal in case of error
    }
}

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

// Toggle Chatbox Visibility
function toggleChatbox() {
    const chatbox = document.getElementById("chatbox-container");
    const openButton = document.getElementById("open-chatbox");
    if (chatbox.style.display === "none" || chatbox.style.display === "") {
        chatbox.style.display = "flex";
        openButton.style.display = "none";
    } else {
        chatbox.style.display = "none";
        openButton.style.display = "block";
    }
}

// Send Message to AI
async function sendMessage() {
    const input = document.getElementById("chatbox-input");
    const message = input.value.trim();
    if (message === "") return;
    
    addMessageToChat("You", message);
    input.value = ""; // Clear input field

    // Send the message to the AI backend
    try {
        const aiResponse = await fetchAIResponse(message);
        addMessageToChat("AI", aiResponse);
    } catch (error) {
        addMessageToChat("AI", "Oops! Something went wrong.");
        console.error("Error with AI request:", error);
    }
}

// Add message to chatbox
function addMessageToChat(sender, message) {
    const chatboxMessages = document.getElementById("chatbox-messages");
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatboxMessages.appendChild(messageElement);
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight; // Scroll to bottom
}

// Handle Enter key press in chat input
function handleChatboxKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

const apiKey = process.env.OPENAI_API_KEY;  // Securely loading API key from environment variable

async function fetchAIResponse(message, retries = 3, delay = 1000) {
    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,  // Use API key securely from the environment
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  // Use the latest model
                prompt: message,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        if (response.status === 429) {
            if (retries > 0) {
                console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
                return fetchAIResponse(message, retries - 1, delay * 2);  // Exponential backoff
            } else {
                throw new Error("Too many requests. Please try again later.");
            }
        }

        if (!response.ok) {
            throw new Error(`API error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            return data.choices[0].text.trim();
        } else {
            throw new Error("No choices returned from API.");
        }

    } catch (error) {
        console.error("Error with AI request:", error);
        return "Sorry, I couldn't process your request.";
    }
}



// Toggle Chatbox Visibility
function toggleChatbox() {
    const chatbox = document.getElementById("chatbox-container");
    const openButton = document.getElementById("open-chatbox");
    if (chatbox.style.display === "none" || chatbox.style.display === "") {
        chatbox.style.display = "flex";
        openButton.style.display = "none";
    } else {
        chatbox.style.display = "none";
        openButton.style.display = "block";
    }
}
