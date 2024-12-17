const apiKey = "8cb0057cacf8462a83154287de1b586d";
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=10&addRecipeInformation=true`;

async function fetchRecipes() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
const recipes = data.results.map(recipe => ({
            name: recipe.title || "Unknown Name",
            author: recipe.creditsText || "Unknown Author",
            culture: recipe.cuisines[0] || "Unknown Culture"
        }));

        // Populate pages
        populateRecipes(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}
// Handle Sign-Up Form Submission
document.getElementById("signup-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Simulate saving user data (you can replace this with API logic)
    console.log("User registered:", { username, password });

    alert("Sign-Up Successful!");

    // Redirect to login page
    window.location.href = "login.html";
});

// Handle Login Form Submission
document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Example: Simple check (replace with actual authentication logic)
    if (username === "test" && password === "1234") {
        alert("Login Successful!");
        // Redirect to a protected page
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password!");
    }
});

function populateRecipes(recipes) {
    const alphabeticalList = document.getElementById("recipe-list");
    const authorList = document.getElementById("author-list");
    const cultureList = document.getElementById("culture-list");

    if (alphabeticalList) {
        sortAndDisplayRecipes(recipes, "name", alphabeticalList);
        } else {
        console.warn("Alphabetical list element not found.");
    }
    if (authorList) {
        sortAndDisplayRecipes(recipes, "author", authorList);
        } else {
        console.warn("Author list element not found.");
    }
    if (cultureList) {
        sortAndDisplayRecipes(recipes, "culture", cultureList);
        } else {
        console.warn("Author list element not found.");
    }
}

function sortAndDisplayRecipes(recipes, sortBy, targetElement) {
    const sorted = [...recipes].sort((a, b) => {
        const valA = a[sortBy] || ""; // Fallback to empty string
        const valB = b[sortBy] || ""; // Fallback to empty string
        return valA.localeCompare(valB);
    });

    targetElement.innerHTML = sorted
        .map(recipe => `<li>${recipe.name} by ${recipe.author} (${recipe.culture})</li>`)
        .join('');
}

// Fetch recipes when the page loads
fetchRecipes();
