import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

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

    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://recipe-book-server-xi.vercel.app/recipes/${id}`);
        if (!res.ok) throw new Error('Recipe not found');
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, user]);

  const handleLike = async () => {
    if (!recipe || recipe.userEmail === user?.email) return;

    try {
      setLikeLoading(true);
      const res = await fetch(`https://recipe-book-server-xi.vercel.app/recipes/${id}/like`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to like');

      const updatedRecipe = await res.json();
      setRecipe(updatedRecipe);
    } catch (err) {
      alert(err.message);
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading recipe details...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!recipe) return <div className="text-center py-10">Recipe not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md my-10">
      <button onClick={() => navigate(-1)} className="btn bg-green-800 text-white mb-6">
        &larr; Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

      <p className="text-lg text-gray-600 mb-4">
        {recipe.likeCount || 0} {recipe.likeCount === 1 ? 'person likes' : 'people like'} this recipe
      </p>

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

      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          disabled={likeLoading || recipe.userEmail === user?.email}
          className="text-red-500 text-2xl hover:scale-110 transition-transform duration-200"
          title={
            recipe.userEmail === user?.email
              ? "You can't like your own recipe"
              : "Like this recipe"
          }
        >
          {likeLoading ? (
            <span className="loading loading-spinner text-red-500"></span>
          ) : (
            <>
              {recipe.likeCount > 0 ? <FaHeart /> : <FaRegHeart />}
            </>
          )}
        </button>
        <span className="text-gray-600">
          {recipe.likeCount || 0} Likes
        </span>
      </div>
    </div>
  );
};

export default RecipeDetails;
