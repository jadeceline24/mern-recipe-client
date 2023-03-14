import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {userGetUserId} from '../hooks/userGetUserId';
import {useCookies} from 'react-cookie';

export const Home = () => {
  const userID = userGetUserId();
  const [recipes, setRecipe] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(['access_token']);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recipes');
        setRecipe(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchsaveRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/saveRecipe/id/${userID}`,
        );
        setSavedRecipes(response.data.saveRecipe);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    if (cookies.access_token) 
    fetchsaveRecipe();
    
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        'http://localhost:3001/recipes',
        {
          recipeID,
          userID,
        },
        {headers: {authorization: cookies.access_token}},
      );
      setSavedRecipes(response.data.saveRecipe);
    } catch (err) {
      console.log(err);
    }
  };
  const isRecipeSaved = (id) => savedRecipes.includes(id);
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
