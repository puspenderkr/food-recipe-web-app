import appkey from './env.js';
const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
let APP_ID = '6ddf344c';
// let APP_KEY = 'a2f327b0a6b901f4777a4e63e9638074';


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery)
    fetchApi();
})

async function fetchApi() {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${appkey}&ingr=0-8`

    const response = await fetch(url);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {
    container.classList.remove('initial')
    let generatedHTML = '';
    results.map(result =>{
         generatedHTML += 
         `
         <div class="item">
         <img src="${result.recipe.image}" alt="">
         <div class="flex-container">
             <h1 class="title">${result.recipe.label}</h1>
             <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
         </div>
         <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
         <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found"}</p>
         <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
     </div>
         `
    })
    searchResultDiv.innerHTML = generatedHTML;
}