
async function fetchRecipeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    if (!recipeId) {
        alert('Invalid Recipe ID');
        return;
    }

    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`);
        const data = await response.json();
        if (!data || !data.data || !data.data.recipe) {
            alert('Recipe not found!');
            return;
        }
        const recipe = data.data.recipe;
        document.getElementById('recipe-title').textContent = recipe.title;
        document.getElementById('recipe-image').src = recipe.image_url;
        
        const ingredientsList = document.getElementById('recipe-ingredients');
        ingredientsList.innerHTML = '';
        recipe.ingredients.forEach(ing => {
            const li = document.createElement('li');
            li.textContent = `${ing.quantity || ''} ${ing.unit} ${ing.description}`;
            ingredientsList.appendChild(li);
        });
    } catch (error) {
        alert('Error loading recipe details. Please try again later.');
        console.error(error);
    }
}

function goBack() {
    window.history.back();
}

fetchRecipeDetails();