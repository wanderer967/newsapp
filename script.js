const apiKey = 'SIY1uG9KyJsGTw0zUUWbtrmm_bimvkGt-XEWWC8GDbV5QLXc'; 
const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://api.currentsapi.services/v1/latest-news?pageSize=12&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if articles exist
        return data.news || []; // Return an empty array if articles are undefined
    } catch (error) {
        console.error("Error fetching random news:", error);
        return []; // Return an empty array to avoid further errors
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";

    if (articles.length === 0) {
        blogContainer.innerHTML = "<p>No articles available.</p>";
        return;
    }

    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.image || "https://via.placeholder.com/150"; // Default image if none exists
        img.alt = article.title;

        const title = document.createElement("h2");
        const TruncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = TruncatedTitle;

        const description = document.createElement("p");
        const TruncatedDescription = article.description && article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description || "No description available.";
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

// Immediately Invoked Function Expression (IIFE) to fetch and display articles
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news:", error);
    }
})();
