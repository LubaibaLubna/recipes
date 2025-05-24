import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateRecipe = () => {
    const recipe = useLoaderData();
    const navigate = useNavigate();

    const {
        _id,
        name,
        instructions,
        ingredients,
        cuisineType,
        photo,
        categories = [],
        preparationTime,
    } = recipe;

const handleUpdateRecipe = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formdata = new FormData(form);
  const updatedRecipe = Object.fromEntries(formdata.entries());
  updatedRecipe.categories = formdata.getAll("categories");

  try {
    const response = await fetch(`http://localhost:5000/recipes/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRecipe),
    });

    const data = await response.json();
    console.log("Update response:", data);

    if (response.ok && data) {
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Recipe updated successfully",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      navigate("/my-recipes");
    }
  } catch (error) {
    console.error("Error updating recipe:", error);
  }
};


    return (
        <div className="py-10 px-8 md:px-24 bg-gray-100 min-h-screen">
            <div className="p-6 text-center space-y-2">
                <h1 className="text-3xl text-green-800 font-semibold">Update Recipe</h1>
                <p className="text-gray-600">Edit the fields below and submit to update your recipe.</p>
            </div>

            <form onSubmit={handleUpdateRecipe}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <fieldset className="bg-white p-4 rounded shadow">
                        <label className="label">Name</label>
                        <input name="name" defaultValue={name} className="input input-bordered w-full" required />
                    </fieldset>

                    <fieldset className="bg-white p-4 rounded shadow">
                        <label className="label">Ingredients</label>
                        <input name="ingredients" defaultValue={ingredients} className="input input-bordered w-full" required />
                    </fieldset>

                    <fieldset className="bg-white p-4 rounded shadow">
                        <label className="label">Instructions</label>
                        <textarea name="instructions" defaultValue={instructions} className="textarea textarea-bordered w-full" required />
                    </fieldset>

                    <fieldset className="bg-white p-4 rounded shadow">
                        <label className="label">Cuisine Type</label>
                        <select name="cuisineType" defaultValue={cuisineType} className="select select-bordered w-full" required>
                            <option value="">Select...</option>
                            <option value="Indian">Indian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Italian">Italian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Other">Other</option>
                        </select>
                    </fieldset>

                    <fieldset className="bg-white p-4 rounded shadow">
                        <label className="label">Preparation Time (minutes)</label>
                        <input name="preparationTime" defaultValue={preparationTime} type="number" min="1" className="input input-bordered w-full" required />
                    </fieldset>

                    <fieldset className="bg-white p-4 rounded shadow">
                        <label className="label">Categories</label>
                        <div className="flex flex-wrap gap-4">
                            {["Breakfast", "Lunch", "Dinner", "Dessert", "Other"].map((cat) => (
                                <label key={cat} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="categories"
                                        value={cat}
                                        defaultChecked={Array.isArray(categories) && categories.includes(cat)}
                                        className="checkbox checkbox-sm"
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <fieldset className="bg-white p-4 rounded shadow my-6">
                    <label className="label">Photo URL</label>
                    <input name="photo" defaultValue={photo} className="input input-bordered w-full" required />
                </fieldset>

                <button  type="submit" className="btn btn-success w-full">
                    Update Recipe
                </button>
            </form>
        </div>
    );
};

export default UpdateRecipe;
