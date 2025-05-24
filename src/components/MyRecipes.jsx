import React, { useEffect, useState, useContext } from 'react';
import RecipeCard from './RecipeCard';
import { AuthContext } from '../provider/AuthProvider';

const MyRecipes = () => {
  const { user } = useContext(AuthContext); 
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(`https://recipe-book-server-xi.vercel.app/recipes?email=${user.email}`);
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error('Error loading recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, [user]);

  const handleDelete = (id) => {
    setRecipes(prev => prev.filter(recipe => recipe._id !== id));
  };

  const handleUpdate = (id) => {
    console.log('Update this recipe:', id);
  };

  if (loading) return <div className="text-center py-10">Loading your recipes...</div>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          You haven't added any recipes yet.
        </p>
      )}
    </div>
  );
};

export default MyRecipes;
