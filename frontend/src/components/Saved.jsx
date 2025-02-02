import React, { useEffect, useState } from 'react';

const Saved = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(5); // Number of recipes per page

  // Fetch saved recipes for the logged-in user
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const userId = localStorage.getItem("userID");
        if (!userId) {
          throw new Error("User not logged in");
        }

        // Fetch saved recipes from the backend
        const response = await fetch(`http://localhost:8000/saved/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch saved recipes");
        }

        const data = await response.json();
        setSavedRecipes(data.recipies || []); // Ensure recipies is an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  // Handle recipe deletion
  const handleDeleteRecipe = async (recipeId) => {
    try {
      const userId = localStorage.getItem("userID");
      if (!userId) {
        throw new Error("User not logged in");
      }

      // Send a DELETE request to remove the recipe
      const response = await fetch(`http://localhost:8000/saved/${userId}/${recipeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      // Remove the deleted recipe from the state
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // Filter recipes based on search term
  const filteredRecipes = savedRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Saved Recipes</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {filteredRecipes.length === 0 ? (
        <p>No saved recipes found.</p>
      ) : (
        <>
          {/* Table */}
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Ingredients</th>
                <th className="py-2 px-4 border-b">Instructions</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecipes.map((recipe) => (
                <tr key={recipe._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{recipe.name}</td>
                  <td className="py-2 px-4 border-b">
                    <ul className="list-disc list-inside">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 border-b">{recipe.instructions}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDeleteRecipe(recipe._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(filteredRecipes.length / recipesPerPage) }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 border rounded ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Saved;