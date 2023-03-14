import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {userGetUserId} from '../hooks/userGetUserId';

export const SaveRecipe = () => {
  const userID = userGetUserId();
  const [savedRecipes, setSavedRecipes] = useState([]);
  useEffect(() => {
    const fetchsaveRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/saveRecipe/${userID}`,
        );
        setSavedRecipes(response.data.saveRecipe);
      } catch (error) {
        console.log(error);
      }
    };
    fetchsaveRecipe();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.instructions}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
