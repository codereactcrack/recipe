import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState('');
  const [recipe, setRecipe] = useState([]);
  const APP_ID = import.meta.env.VITE_APP_ID;
  const APP_KEY =import.meta.env.VITE_APP_KEY;

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${data}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data2 = await response.json();
    setRecipe(data2.hits);
  };

  const searchRecipe = () => {
    if (data === '') return;
    getRecipes();
    setData('');
  };

  return (
    <div className="app-container">
      <h1 className="header">Recipe Finder</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search recipe"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button className="search-button" onClick={searchRecipe}>
          Search
        </button>
      </div>

      <div className="recipe-container">
        {recipe.map((data, index) => (
          <div key={index} className="recipe-card">
            <h2 className="recipe-title">{data.recipe.label}</h2>
            <div className="recipe-cuisine">{data.recipe.cuisineType[0]}</div>
            <div className="recipe-calories">Calories: {data.recipe.calories.toFixed(2)}</div>
            <img src={data.recipe.image} alt="food" className="recipe-image" />
            <div className="recipe-type">Type: {data.recipe.dishType}</div>
            <div className="recipe-ingredients">
              <h3>Ingredients:</h3>
              <ul>
                {data.recipe.ingredientLines.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <a
              href={data.recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="recipe-source"
            >
              Source: {data.recipe.source}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
