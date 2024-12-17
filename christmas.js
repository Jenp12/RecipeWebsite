const apiKey = "8cb0057cacf8462a83154287de1b586d"; // My Spoonacular API key
const christmasApiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3&tags=christmas`;

async function fetchChristmasRecipes() {
    try {
        const response = await fetch(christmasApiUrl);
        const data = await response.json();

        if (data.recipes) {
            displayChristmasRecipes(data.recipes);
        } else {
            console.error("No recipes found.");
            document.getElementById("christmas-recipes").innerHTML = "<p>No Christmas recipes available at the moment.</p>";
        }
    } catch (error) {
        console.error("Error fetching Christmas recipes:", error);
        document.getElementById("christmas-recipes").innerHTML = "<p>Failed to load recipes. Please try again later.</p>";
    }
}

function displayChristmasRecipes(recipes) {
    const container = document.getElementById("christmas-recipes");
    container.innerHTML = ""; // Clear previous recipes

    recipes.forEach(recipe => {
        const recipeCard = `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                <h3>${recipe.title}</h3>
                <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
            </div>
        `;
        container.innerHTML += recipeCard;
    });
}

document.getElementById("fetch-christmas-btn")?.addEventListener("click", fetchChristmasRecipes);
