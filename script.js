const recipes = [
    { name: "Tacos", author: "Chef Carlos", culture: "Mexican" },
    { name: "Pasta Carbonara", author: "Chef Luigi", culture: "Italian" },
    { name: "Butter Chicken", author: "Chef Anjali", culture: "Indian" }
];

function sortAndDisplayRecipes(sortBy, targetId) {
    const sorted = [...recipes].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    const list = document.getElementById(targetId);
    list.innerHTML = sorted.map(recipe => `<li>${recipe.name} by ${recipe.author} (${recipe.culture})</li>`).join('');
}

// Example: Use this function for each page
// sortAndDisplayRecipes("name", "recipe-list");
