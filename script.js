const apikey = 'be0441c336f7420483eafebb34c27465';

const blogContainer = document.getElementById ("blog-container");
const 

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize10&apiKey=${apikey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    } catch(error){
        console.error("Error fetching random news", error)
        return []
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML= ""
    articles.forEach((article) =>{
        const blogCard = document.createElement ("div")
        blogCard.classList.add("blog-card")
        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2")
        const TruncatedTitle = article.title.length > 30? article.title.slice(0, 30) + "...." : article.title;
    title.textContent = TruncatedTitle;
        const description = document.createElement("p")
        const TruncatedDescription = article.description.length > 120? article.description.slice(0, 120) + "...." : article.description;
        description.textContent  = TruncatedDescription;

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)

        blogCard.addEventListener('click', ()=> {
            window.open(article.url, "_blank");
        })
        blogContainer.appendChild(blogCard);

    })

}

(async() =>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles)
    } catch(error){
        console.error("Error fetching random news", error);
    }
}) ();