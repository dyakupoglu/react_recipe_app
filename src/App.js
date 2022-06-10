import { useState, useEffect } from 'react';
import Recipe from './Components/Recipe';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`);
        const data = await response.json();

        setRecipes(data.hits);
    }

    const updateSearch = (e) => {
        setSearch(e.target.value);
    }

    const getSearch = (e) => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

    return (
        <div className="App">
            <div className='navbar'>Cook-<span>ing</span></div>
            <form onSubmit={getSearch} className='search-form'>
                <input placeholder='Enter a name of ingredient' className='search-bar' type="text" value={search} onChange={updateSearch} />
                <button className='search-button' type='submit'>Search</button>
            </form>
            <div className="recipes">
                {recipes.map((recipe) => (
                    <Recipe
                        key={recipe.recipe.label}
                        title={recipe.recipe.label}
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
