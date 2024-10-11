const apikey = 'be0441c336f7420483eafebb34c27465';

const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=12&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if articles exist
        return data.articles || []; // Return an empty array if articles are undefined
    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    
    // Check if there are articles to display
    if (articles.length === 0) {
        blogContainer.innerHTML = "<p>No articles available.</p>";
        return;
    }

    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        
        const img = document.createElement("img");
        img.src = article.urlToImage || "https://via.placeholder.com/150"; // Default image if none exists
        img.alt = article.title;

        const title = document.createElement("h2");
        const TruncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
        title.textContent = TruncatedTitle;

        const description = document.createElement("p");
        const TruncatedDescription = article.description && article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description || "No description available.";
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
