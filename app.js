document.getElementById("search-button").addEventListener("click", fetchRecipes);

async function fetchRecipes() {
    const query = document.getElementById('search').value.trim();
    if (!query) {
        alert('Please enter a recipe name');
        return;
    }
    
    document.getElementById('loader').style.display = 'block';
    document.getElementById('recipe-container').innerHTML = '';
    
    setTimeout(async () => {
        try {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`);
            const data = await response.json();
            
            document.getElementById('loader').style.display = 'none';
            
            if (!data || !data.data || !data.data.recipes.length) {
                alert('No recipes found! Try another search.');
                return;
            }
            
            displayRecipes(data.data.recipes);
        } catch (error) {
            document.getElementById('loader').style.display = 'none';
            alert('Error fetching recipes. Please try again later.');
            console.error(error);
        }
    }, 4000);
}

function displayRecipes(recipes) {
    const container = document.getElementById('recipe-container');
    container.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeEl = document.createElement('div');
        recipeEl.classList.add('recipe');
        recipeEl.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image_url}" alt="${recipe.title}">
            <p><a href="recipe.html?id=${recipe.id}" target="_blank">View Recipe</a></p>
        `;
        container.appendChild(recipeEl);
    });
}