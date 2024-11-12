import React from 'react';


import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';
import SpoonacularRecipeList from './components/SpoonacularRecipeList'; // Import the new component
import Login from './components/logt';
import Contact from './components/contact';

import Search from './components/search';
import Filter from './components/filter';
import Profile from "./components/Profile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Chat from './components/bot';
 // Optional if you want general styles for your app
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import './App.css';
function App() {
  return (
    
    <Router>
     
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<RecipeList />} />  {/* Use 'element' instead of 'component' */}
          <Route path="/add-recipe" element={<AddRecipe />} />  {/* Use 'element' instead of 'component' */}
          <Route path="/recipes/:id" element={<RecipeDetails />} /> {/* Use 'element' instead of 'component' */}
          <Route path="/spoonacular" element={<SpoonacularRecipeList />} /> {/* Route for Spoonacular */}
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/contact" element={<Contact />}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/filter" element={<Filter/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          
        </Routes>
        <Footer />

      </div>
       
    </Router>
  );
}

export default App;
