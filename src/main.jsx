import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css";

import AuthProvider from './provider/AuthProvider.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './layouts/MainLayout.jsx';
import Home from './components/Home.jsx';
import AddRecipe from './components/AddRecipe.jsx';
import AllRecipes from './pages/AllRecipes.jsx';
import ContactUs from './pages/ContactUs.jsx';
import MyRecipes from './components/MyRecipes.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import UpdateRecipe from './components/UpdateRecipe.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "allRecipes",
        loader: () => fetch(`https://recipe-book-server-xi.vercel.app/recipes`),
        Component: AllRecipes,
      },
      {
        path: "addRecipe",
        Component: () => (
          <ProtectedRoute>
            <AddRecipe></AddRecipe>
          </ProtectedRoute>
        ),
      },

      {
        path: 'recipes/:id',
        Component: () => (
          <ProtectedRoute>
            <RecipeDetails></RecipeDetails>
          </ProtectedRoute>
        ),
      },

      {
        path: "myRecipes",
        Component: () => (
          <ProtectedRoute>
            <MyRecipes></MyRecipes>
          </ProtectedRoute>
        ),
      },
      {
        path: '/auth/register',
        Component: Register
      },
      {
        path: '/auth/login',
        Component: Login
      },
      {
        path: "/update-recipe/:id",
        element: <ProtectedRoute><UpdateRecipe /></ProtectedRoute>,
        loader: ({ params }) => fetch(`https://recipe-book-server-xi.vercel.app/recipes/${params.id}`)
      },

    
    ],
  },
    {
        path: "contactUs",
        Component: ContactUs,
      },
]);

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-5">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  </StrictMode>,
);
