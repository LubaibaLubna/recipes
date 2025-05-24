import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const AddRecipe = () => {
  const { user } = useContext(AuthContext); 

  const handleAddRecipe = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

   
    const categories = formData.getAll('categories');

    const newRecipe = {
      ...data,
      categories,
      userEmail: user?.email,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      likeCount: 0, 
    };

    
    fetch('https://recipe-book-server-xi.vercel.app/recipes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newRecipe),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId || data.acknowledged) {
          Swal.fire({
            title: 'Recipe added successfully!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          form.reset();
        }
      });
  };

  return (
    <div className="py-10 px-24 bg-gray-300">
      <div className="p-12 text-center space-y-4">
        <h1 className="text-3xl text-green-800 font-semibold">Add New Recipe</h1>
        <p>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its
          layout...
        </p>
      </div>

      <form onSubmit={handleAddRecipe}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <fieldset className="fieldset bg-base-300 border-base-300 rounded-box border p-4">
            <label className="label">Name</label>
            <input name="name" type="text" className="input w-full" placeholder="Enter recipe name" required />
          </fieldset>

       
          <fieldset className="fieldset bg-base-300 border-base-300 rounded-box border p-4">
            <label className="label">Ingredients</label>
            <input name="ingredients" type="text" className="input w-full" placeholder="Enter ingredients" required />
          </fieldset>

         
          <fieldset className="fieldset bg-base-300 border-base-300 rounded-box border p-4">
            <label className="label">Instructions</label>
            <input name="instructions" type="text" className="input w-full" placeholder="Enter instructions" required />
          </fieldset>

     
          <fieldset className="fieldset bg-base-300 border-base-300 rounded-box border p-4">
            <label className="label">Cuisine Type</label>
            <select name="cuisineType" className="select w-full" required>
              <option value="">Select Cuisine Type</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Others">Others</option>
            </select>
          </fieldset>

       
          <fieldset className="fieldset bg-base-300 border-base-300 rounded-box border p-4">
            <label className="label">Preparation Time (minutes)</label>
            <input name="preparationTime" type="number" min="1" className="input w-full" required />
          </fieldset>

          <fieldset className="fieldset bg-base-300 border-base-300 rounded-box border p-4">
            <label className="label mb-2">Categories</label>
            <div className="flex flex-wrap gap-3">
              {['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Other'].map(category => (
                <label key={category} className="cursor-pointer flex items-center gap-2">
                  <input type="checkbox" name="categories" value={category} className="checkbox checkbox-sm" />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box border my-6 p-4">
          <label className="label">Photo URL</label>
          <input name="photo" type="text" className="input w-full" required />
        </fieldset>

        <input type="submit" className="btn w-full bg-green-800 text-white" value="Add Recipe" />
      </form>
    </div>
  );
};

export default AddRecipe;
