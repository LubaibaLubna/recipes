import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCuisine, setSelectedCuisine] = useState("All");

    useEffect(() => {
        fetch('https://recipe-book-server-xi.vercel.app/recipes')
            .then(res => res.json())
            .then(data => {
                setRecipes(data);
                setFilteredRecipes(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch recipes', err);
                setLoading(false);
            });
    }, []);

    const handleCuisineChange = (e) => {
        const cuisine = e.target.value;
        setSelectedCuisine(cuisine);
        if (cuisine === "All") {
            setFilteredRecipes(recipes);
        } else {
            setFilteredRecipes(recipes.filter(recipe => recipe.cuisineType === cuisine));
        }
    };

    const cuisineTypes = ["All", ...new Set(recipes.map(recipe => recipe.cuisineType))];

    if (loading) {
        return <div className="text-center py-10">Loading recipes...</div>;
    }

    if (!filteredRecipes.length) {
        return <div className="text-center py-10">No recipes found for selected cuisine.</div>;
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-center">
                <label className="block mt-1 mr-4 font-medium text-lg">Cuisine Type:</label>
                <select
                    value={selectedCuisine}
                    onChange={handleCuisineChange}
                    className="select select-bordered w-full max-w-xs"
                >
                    {cuisineTypes.map((type, idx) => (
                        <option key={idx} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredRecipes.map((recipe, index) => (
                    <Fade key={recipe._id} triggerOnce delay={index * 50}>
                        <div className="card bg-base-100 shadow-lg border rounded-md overflow-hidden flex flex-col">
                            <img
                                src={recipe.photo}
                                alt={recipe.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className='h-52'>
                                <div className="p-4 flex-grow h-38">
                                    <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
                                    <p className="text-sm line-clamp-4">{recipe.instructions}</p>
                                </div>
                                <div className="p-2 text-center">
                                    <Link to={`/recipes/${recipe._id}`}>
                                        <button className="btn bg-green-800 text-white w-full">
                                            See Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>
        </div>
    );
};

export default AllRecipes;
