const apiKey = 'SIY1uG9KyJsGTw0zUUWbtrmm_bimvkGt-XEWWC8GDbV5QLXc';
const blogContainer = document.getElementById("blog-container");
const loadingModal = document.getElementById("loading-modal"); // Loading modal reference

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