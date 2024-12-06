const apiKey = "8cb0057cacf8462a83154287de1b586d";
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=10&addRecipeInformation=true`;

async function fetchRecipes() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
const recipes = data.results.map(recipe => ({
            name: recipe.title,
            author: recipe.creditsText || "Unknown Author",
            culture: recipe.cuisines[0] || "Unknown Culture"
        }));

        // Populate pages
        populateRecipes(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function populateRecipes(recipes) {
    const alphabeticalList = document.getElementById("recipe-list");
    const authorList = document.getElementById("author-list");
    const cultureList = document.getElementById("culture-list");

    if (alphabeticalList) {
        sortAndDisplayRecipes(recipes, "name", alphabeticalList);
    }
    if (authorList) {
        sortAndDisplayRecipes(recipes, "author", authorList);
    }
    if (cultureList) {
        sortAndDisplayRecipes(recipes, "culture", cultureList);
    }
}

function sortAndDisplayRecipes(recipes, sortBy, targetElement) {
    const sorted = [...recipes].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    targetElement.innerHTML = sorted.map(recipe => `<li>${recipe.name} by ${recipe.author} (${recipe.culture})</li>`).join('');
}

// Fetch recipes when the page loads
fetchRecipes();
