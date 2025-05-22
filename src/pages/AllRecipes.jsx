

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllRecipes = ({_id}) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/recipes')
            .then(res => res.json())
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch recipes', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading recipes...</div>;
    }

    if (!recipes.length) {
        return <div className="text-center py-10">No recipes found.</div>;
    }

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map(recipe => (
                <div
                    key={recipe._id}
                    className="card bg-base-100 shadow-lg border rounded-md overflow-hidden flex flex-col"
                >
                    <img
                        src={recipe.photo}
                        alt={recipe.name}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex-grow">
                        <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>

                        <p className="text-sm mb-3 line-clamp-3">{recipe.instructions}</p>
                    </div>
                    <div className="p-4 border-t text-center">
                        <Link to={`/recipes/${recipe._id}`}>  <button
                        
                            className="btn btn-primary w-full"
                        >
                            See Details
                        </button></Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllRecipes;
