const apiKey = '2Dx58XM3qkz2VlahAG1uyh8YZbMhfURoK5U8kJ735xBW60ua';
const apiKey1 = '2f22ebdf2b14e2b80ce2a459';  // Replace with your API key
const currencySelector = document.getElementById('currency-selector');
const exchangeRateDisplay = document.getElementById('exchange-rate-display');
const loadingModal = document.getElementById("loading-modal");
const blogContainer = document.getElementById("blog-container");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const chatboxContainer = document.getElementById('chatbox-container');
const openChatboxButton = document.getElementById('open-chatbox');
const closeChatboxButton = document.getElementById('close-chatbox');
const chatboxMessages = document.getElementById('chatbox-messages');
const chatboxInput = document.getElementById('chatbox-input');
const sendButton = document.getElementById('send-button');

// Fetch random news articles
async function fetchRandomNews() {
    try {
        const apiUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&language=en&country=PH`;
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

// Display articles in the blog container
// Display articles in the blog container
function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    loadingModal.style.display = "none";

    // Limit the number of articles displayed to 12
    const limitedArticles = articles.slice(0, 12);

    if (limitedArticles.length === 0) {
        blogContainer.innerHTML = "<p>No articles available.</p>";
        return;
    }

    limitedArticles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.image || "https://via.placeholder.com/150";
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 200 ? article.title.slice(0, 200) + "..." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDescription = article.description ? article.description.slice(0, 0) + "..." : "No description available.";
        description.textContent = truncatedDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
}
// Fetch news based on search input
async function fetchAndDisplayNews(query) {
    try {
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
    } finally {
        loadingModal.style.display = "none";
    }
}

// Initial random news loading
(async () => {
    try {
        loadingModal.style.display = "block";
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news:", error);
    } finally {
        loadingModal.style.display = "none";
    }
})();

// Event listeners for search functionality
searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query !== "") {
        await fetchAndDisplayNews(query);
    } else {
        alert("Please enter a search query.");
    }
});

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

// Toggle chatbot visibility
openChatboxButton.addEventListener('click', () => {
    chatboxContainer.style.display = 'flex';
    openChatboxButton.style.display = 'none';
});

closeChatboxButton.addEventListener('click', () => {
    chatboxContainer.style.display = 'none';
    openChatboxButton.style.display = 'block';
});

// Function to display messages
function displayMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${sender}: ${text}`;
    chatboxMessages.appendChild(messageDiv);
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight; // Scroll to the bottom
}

// Send user message and fetch AI response
async function sendMessage(message) {
    if (message.trim() === '') return;

    displayMessage('You', message);
    chatboxInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/chat', { // Backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        const data = await response.json();
        displayMessage('AI', data.reply);
    } catch (error) {
        displayMessage('AI', 'Cannot connect to OPENAI API');
    }
}
// Event listeners for sending messages
sendButton.addEventListener('click', () => {
    const message = chatboxInput.value;
    sendMessage(message);
});

chatboxInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

// Function to fetch the USD to PHP exchange rate
const conversionRateElement = document.getElementById('conversion-rate'); // Main container

// Function to fetch USD and other currency rates to PHP
const conversionMarquee = document.getElementById('conversion-marquee'); // Marquee element

// Function to fetch and display multiple currency rates
async function fetchCurrencyRates() {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey1}/latest/USD`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const rates = data.conversion_rates;

    // Create HTML for the different currency rates
    const conversionHTML = `
     1 USD = ${rates.PHP.toFixed(2)} PHP |
      1 AED = ${(rates.PHP / rates.AED).toFixed(2)} PHP |
      1 EUR = ${(rates.PHP / rates.EUR).toFixed(2)} PHP |
      1 JPY = ${(rates.PHP / rates.JPY).toFixed(2)} PHP |
      1 KRW = ${(rates.PHP / rates.KRW).toFixed(2)} PHP |
      1 CNY = ${(rates.PHP / rates.CNY).toFixed(2)} PHP |
      1 INR = ${(rates.PHP / rates.INR).toFixed(2)} PHP |
      1 GBP = ${(rates.PHP / rates.GBP).toFixed(2)} PHP |
      1 AUD = ${(rates.PHP / rates.AUD).toFixed(2)} PHP |
      1 CAD = ${(rates.PHP / rates.CAD).toFixed(2)} PHP |
      1 SGD = ${(rates.PHP / rates.SGD).toFixed(2)} PHP |
      1 HKD = ${(rates.PHP / rates.HKD).toFixed(2)} PHP |
      1 CHF = ${(rates.PHP / rates.CHF).toFixed(2)} PHP |
      1 NZD = ${(rates.PHP / rates.NZD).toFixed(2)} PHP |
      1 THB = ${(rates.PHP / rates.THB).toFixed(2)} PHP |
      1 MYR = ${(rates.PHP / rates.MYR).toFixed(2)} PHP |
      1 ZAR = ${(rates.PHP / rates.ZAR).toFixed(2)} PHP |
      1 SEK = ${(rates.PHP / rates.SEK).toFixed(2)} PHP |
      1 NOK = ${(rates.PHP / rates.NOK).toFixed(2)} PHP |
      1 RUB = ${(rates.PHP / rates.RUB).toFixed(2)} PHP
    `;

    // Insert the HTML into the marquee
    conversionMarquee.innerHTML = conversionHTML;
  } catch (error) {
    console.error('Failed to fetch conversion rates:', error);
    conversionMarquee.textContent = 'Unable to fetch conversion rates.';
  }
}

// Fetch the conversion rates on page load
fetchCurrencyRates();