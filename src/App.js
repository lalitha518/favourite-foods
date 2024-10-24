import React from "react";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Define the router with paths for Home and About
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="app">
        <Home />
        <Footer />
      </div>
    ),
  },
  {
    path: "/about",
    element: (
      <div className="app">
        <About />
        <Footer />
      </div>
    ),
  },
]);

// The main App component that renders the RouterProvider
const App = () => {
  return (
    <RouterProvider router={appRouter} />
  );
};

export default App;
