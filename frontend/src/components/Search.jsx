import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Use the data loaded by the router
  const loaderData = useLoaderData();

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submit (to trigger a new search)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
        navigate(`/recipe-search?search=${encodeURIComponent(searchTerm)}`);
    }
};

useEffect(() => {
    // check to see if userID is in local storage
    const userID = localStorage.getItem('userID');
    if (!userID) {
      // if userID is in local storage, redirect to login page
      window.location.replace('http://localhost:5173/login');
    }
  });

  useEffect(() => {
    console.log("Loader Data in Component:", loaderData);
    if (loaderData) {
      if (loaderData.length === 0) {
        setError("No recipes found.");
      } else {
        setRecipes(loaderData);
      }
      setLoading(false);
    } else {
      setError("Failed to fetch recipes.");
      setLoading(false);
    }
  }, [loaderData]);
  

  useEffect(() => {
    // If there's a search term in the URL, set it in the search input field
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, []);

  if (loading) {
    return <div className="text-center mt-28">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-28 text-red-500">{error}</div>;
  }

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>Search Results</h2>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for recipes"
          className="p-2 w-full border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Search</button>
      </form>

      {/* Displaying the recipes */}
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {recipes.length > 0 ? (
          recipes.map((recipe, i) => (
            <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg">
              <Link to={`/recipe/${recipe._id}`}>
                <img src={recipe.imageURL} alt={recipe.name} className='w-full h-96 object-cover' />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{recipe.name}</div>
                  <div className="text-gray-700 text-base">
                    <p className="font-semibold">Ingredients:</p>
                    <ul className="list-disc list-inside">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <p className="font-semibold mt-2">Instructions:</p>
                    <p 
                        className="overflow-hidden text-ellipsis whitespace-pre-line" 
                        style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 4, // Limit to 4 lines
                            overflow: 'hidden'
                                }}
                    >
                        {recipe.instructions}
                    </p>
                    {recipe.videoURL && (
                      <div className="mt-2">
                        <a
                          href={recipe.videoURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Watch Video
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>
            <h2 className='font-bold'>No Results.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
