import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import App from "../App";
  import Home from "../home/Home";
  import About from "../home/About";
  import Saved from "../components/Saved";
  import Login from "../components/Login";
  import Signup from "../components/Signup";
  import SingleRecipe from "../home/SingleRecipe";
  import Search from "../components/Search";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/saved",
          element: <Saved />,
        },
        {
          path: "/recipe/:id",
          element: <SingleRecipe/>,
          loader: ({ params }) => fetch(`http://localhost:8000/recipe/${params.id}`),
        },
        {
          path: "/recipe-search",
          element: <Search />,
          loader: async ({ request }) => {
            const url = new URL(request.url);
            console.log("Full URL in loader:", url.toString()); // Debugging log
        
            const searchTerm = url.searchParams.get("search");
            console.log("Loader received search term:", searchTerm); // Debugging log
        
            if (!searchTerm) {
                console.error("No search term provided in loader!");
                return [];
            }
        
            const response = await fetch(`http://localhost:8000/recipe-search?search=${encodeURIComponent(searchTerm)}`);
        
            if (!response.ok) {
                throw new Error("Failed to fetch recipes.");
            }
        
            const data = await response.json();
            console.log("Recipes received from API:", data); // Debugging log
            return data;
        },        
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
  ]);
  
  export default router;