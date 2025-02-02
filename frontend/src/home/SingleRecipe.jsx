import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';

const SingleRecipe = () => {
  const { _id, name, imageURL, ingredients, instructions, videoURL } = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // check to see if userID is in local storage
    const userID = localStorage.getItem('userID');
    if (!userID) {
      // if userID is in local storage, redirect to login page
      window.location.replace('http://localhost:5173/login');
    }
  });

  const handleAddToSaved = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userId = localStorage.getItem("userID");
    const recipeId = _id;
    const savedObj = { userId, recipeId };

    try {
      const response = await fetch(`http://localhost:8000/saved`, {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(savedObj)
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe to saved recipes.');
      }

      alert("Recipe added to saved");
    } catch (error) {
      console.error('Error:', error.message);
      alert('Recipe already exists in saved recipes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-28 px-4 lg:px-24 flex flex-col items-center text-center space-y-6">
      {/* Recipe Image */}
      <img src={imageURL} alt={name} className="h-96 w-auto rounded-lg shadow-lg" />

      {/* Recipe Name */}
      <h2 className="text-4xl font-bold mt-4">{name}</h2>

      {/* Ingredients */}
      <div className="w-full max-w-2xl text-left">
        <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Video Tutorial */}
      {videoURL && (
        <div className="w-full max-w-3xl">
          <h3 className="text-xl font-semibold mb-2">Video Tutorial</h3>
          <iframe
            width="100%"
            height="400"
            src={videoURL}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      )}

      {/* Instructions */}
      <div className="w-full max-w-2xl text-left">
        <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
        <p className="text-lg text-gray-700">{instructions}</p>
      </div>

      {/* Add to Saved Recipes Button */}
      <button
        onClick={handleAddToSaved}
        type="submit"
        disabled={isLoading}
        className={`mt-5 px-6 py-2 bg-blue-950 text-white font-medium hover:bg-black transition-all ease-in duration-200 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Adding...' : 'Add to Saved Recipes'}
      </button>
    </div>
  );
};

export default SingleRecipe;
