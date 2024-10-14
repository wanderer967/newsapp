<<<<<<< HEAD
const apiKey = 'SIY1uG9KyJsGTw0zUUWbtrmm_bimvkGt-XEWWC8GDbV5QLXc';
const blogContainer = document.getElementById("blog-container");
const loadingModal = document.getElementById("loading-modal"); // Loading modal reference
=======
const apiKey = 'SIY1uG9KyJsGTw0zUUWbtrmm_bimvkGt-XEWWC8GDbV5QLXc'; 
const blogContainer = document.getElementById("blog-container");
>>>>>>> 2a3e59c82cf8e882001d5c15137939ded88b41fe

async function fetchRandomNews() {
    try {
        const apiUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&language=en&country=PH`;
        const response = await fetch(apiUrl);

<<<<<<< HEAD
=======
        // Check if the response is OK
>>>>>>> 2a3e59c82cf8e882001d5c15137939ded88b41fe
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
<<<<<<< HEAD
        return data.news || [];
    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
=======

        // Check if articles exist
        return data.news || []; // Return an empty array if articles are undefined
    } catch (error) {
        console.error("Error fetching random news:", error);
        return []; // Return an empty array to avoid further errors
>>>>>>> 2a3e59c82cf8e882001d5c15137939ded88b41fe
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
<<<<<<< HEAD
    loadingModal.style.display = "none"; // Hide the loading modal once the results are displayed
=======
>>>>>>> 2a3e59c82cf8e882001d5c15137939ded88b41fe

    if (articles.length === 0) {
        blogContainer.innerHTML = "<p>No articles available.</p>";
        return;
    }

    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
<<<<<<< HEAD
        img.src = article.image || "https://via.placeholder.com/150";
        img.alt = article.title;

        const title = document.createElement("h2");
        const TruncatedTitle = article.title.length > 90 ? article.title.slice(0, 90) + "..." : article.title;
        title.textContent = TruncatedTitle;

        const description = document.createElement("p");
        const TruncatedDescription = article.description && article.description.length > 1 ? article.description.slice(0, 0) : article.description || "No description available.";
=======
        img.src = article.image || "https://via.placeholder.com/150"; // Default image if none exists
        img.alt = article.title;

        const title = document.createElement("h2");
        const TruncatedTitle = article.title.length > 100 ? article.title.slice(0, 100) + "..." : article.title;
        title.textContent = TruncatedTitle;

        const description = document.createElement("p");
        const TruncatedDescription = article.description && article.description.length > 1 ? article.description.slice(0, 0 ) : article.description || "No description available.";
>>>>>>> 2a3e59c82cf8e882001d5c15137939ded88b41fe
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

<<<<<<< HEAD
=======
// Immediately Invoked Function Expression (IIFE) to fetch and display articles
>>>>>>> 2a3e59c82cf8e882001d5c15137939ded88b41fe
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
<<<<<<< HEAD
    const query = searchInput.value.trim();
=======
    const query = searchInput.value.trim(); // Get the search input
>>>>>>> 2a3e59c82cf8e882001d5c15137939ded88b41fe
    if (query !== "") {
        await fetchAndDisplayNews(query);
    } else {
        alert("Please enter a search query.");
    }
});

async function fetchAndDisplayNews(query) {
    try {
<<<<<<< HEAD
        // Show the loading modal when fetching news
        loadingModal.style.display = "block";

=======
>>>>>>> 2a3e59c82cf8e882001d5c15137939ded88b41fe
        const apiUrl = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${query}&language=en&country=PH`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
<<<<<<< HEAD
        displayBlogs(data.news || []);
    } catch (error) {
        console.error("Error fetching search results:", error);
        loadingModal.style.display = "none"; // Hide the modal in case of error
=======

        // Display filtered news articles based on the search query
        displayBlogs(data.news || []); // Call the same displayBlogs function to show the search results
    } catch (error) {
        console.error("Error fetching search results:", error);
>>>>>>> 2a3e59c82cf8e882001d5c15137939ded88b41fe
    }
}

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
<<<<<<< HEAD
        searchButton.click();
    }
});
=======
        searchButton.click(); // Trigger the search button click event
    }
});
>>>>>>> 2a3e59c82cf8e882001d5c15137939ded88b41fe
