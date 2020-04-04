import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {

  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('margarita');
  const [found, setFound] = useState(true);


  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    var response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
    var data = await response.json();
    //check if drink exists
    if (data.drinks == null) {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
      data = await response.json();
      setFound(false);
      console.log(data);
      setRecipe(data.drinks);
    }
    else {
      setFound(true);
      console.log(data);
      setRecipe(data.drinks);
    }
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  };

  if (found == true) {
    var msg = "";
    var msg2 = "";
  }
  else {
    var msg = "Sorry drink not found.";
    var msg2 = "Try this instead: ";
  }

  return (
    <div className="App">
      <h1 className="title">Cocktail Search</h1>
      <form onSubmit={getSearch} className="search_form">
        <input className="search_bar" type="text"
          value={search} onChange={updateSearch} />
        <button
          className="search_button" type="submit">Search</button>
      </form>
      <h2 className="error_msg">{msg}</h2>
      <h2 className="error_msg">{msg2}</h2>
      <div className="drinks">
        {recipe.map(recipe => (
          <Recipe
            key={recipe.idDrink}
            name={recipe.strDrink}
            inst={recipe.strInstructions}
            img={recipe.strDrinkThumb}
            glass={recipe.strGlass}

            ingredients={[recipe.strIngredient1, recipe.strIngredient2, recipe.strIngredient3, recipe.strIngredient4, recipe.strIngredient5,
            recipe.strIngredient6, recipe.strIngredient7, recipe.strIngredient8, recipe.strIngredient9, recipe.strIngredient10,
            recipe.strIngredient11, recipe.strIngredient12, recipe.strIngredient13, recipe.strIngredient14, recipe.strIngredient15]}

            amounts={[recipe.strMeasure1, recipe.strMeasure2, recipe.strMeasure3, recipe.strMeasure4, recipe.strMeasure5, recipe.strMeasure6,
            recipe.strMeasure7, recipe.strMeasure8, recipe.strMeasure9, recipe.strMeasure10, recipe.strMeasure11, recipe.strMeasure12,
            recipe.strMeasure13, recipe.strMeasure14, recipe.strMeasure15]}
          />))}
      </div>
    </div>
  );
}

export default App;
