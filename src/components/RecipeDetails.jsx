import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/recipes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Recipe not found');
        return res.json();
      })
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, user]);

  const handleLike = () => {
    if (likeLoading) return;

    setLikeLoading(true);
    fetch(`http://localhost:5000/recipes/${id}/like`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to like');
        return res.json();
      })
      .then(updatedRecipe => {
        setRecipe(updatedRecipe);
      })
      .catch(err => alert(err.message))
      .finally(() => setLikeLoading(false));
  };

  if (loading) return <div className="text-center py-10">Loading recipe details...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!recipe) return <div className="text-center py-10">Recipe not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md my-10">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-6">
        &larr; Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

      <img
        src={recipe.photo}
        alt={recipe.name}
        className="w-full h-64 object-cover rounded-md mb-6"
      />

      <div className="mb-4">
        <strong>Ingredients:</strong>
        <p>{recipe.ingredients}</p>
      </div>

      <div className="mb-4">
        <strong>Instructions:</strong>
        <p>{recipe.instructions}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <strong>Cuisine Type:</strong>
          <p>{recipe.cuisineType}</p>
        </div>
        <div>
          <strong>Preparation Time:</strong>
          <p>{recipe.preparationTime} minutes</p>
        </div>
      </div>

      <div className="mb-4">
        <strong>Category:</strong>
        <p>{Array.isArray(recipe.categories) ? recipe.categories.join(', ') : recipe.categories}</p>
      </div>

      <div className="mb-4">
        <strong>Like Count:</strong> {recipe.likeCount || 0}
      </div>

      <button
        onClick={handleLike}
        disabled={likeLoading}
        className="btn btn-primary"
      >
        {likeLoading ? 'Liking...' : 'Like'}
      </button>
    </div>
  );
};

export default RecipeDetails;
