

import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const RecipeCard = ({ recipe }) => {
    const {
        _id,
        name,
        photo,
        instructions,
        ingredients,
        cuisineType,
        preparationTime,
        category,
        likeCount
    } = recipe;


    const handleDelete = (_id) => {
        console.log(_id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            console.log(result.isConfirmed)


            if (result.isConfirmed) {

                fetch(`http://localhost:5000/recipes/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your recipe has been deleted.",
                                icon: "success"
                            });
                        }

                    })


            }
        });
    }





    return (
        <div className="card bg-base-100 shadow-md border p-4">
            <figure>
                <img src={photo} alt={name} className="w-full h-60 object-cover rounded" />
            </figure>
            <div className="card-body text-left">
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                <p><strong>Ingredients:</strong> {ingredients}</p>
                <p><strong>Instructions:</strong> {instructions}</p>
                <p><strong>Cuisine Type:</strong> {cuisineType}</p>
                <p><strong>Preparation Time:</strong> {preparationTime} mins</p>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Likes:</strong> {likeCount}</p>

                <div className="flex justify-end gap-2 mt-4">
                    <Link to={`/update-recipe/${recipe._id}`} className="btn btn-sm">Update</Link>
                    <button onClick={() => handleDelete(_id)} className="btn btn-error btn-sm">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;



