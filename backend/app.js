const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const multer = require('multer');
const path = require('path');
const profileRoutes = require('./routes/profileRoutes');
const Recipe = require('./models/recipeModel2'); // Assuming you have a Recipe model

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



 
 




// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');
       // const mappedData = mapJsonToSchema(jsonData);
        // try {
        //     const newRecipe = new Recipe(mappedData);
        //     await newRecipe.save();
        //     console.log('Recipe saved successfully');
        // } catch (error) {
        //     console.error('Error saving recipe:', error);
        // } finally {
        //     mongoose.connection.close();
        // }
    
    })

    .catch(err => console.error('MongoDB connection error:', err));

    app.get('/',(req,res)=>{
        res.send("hello from server");
    })
// Serve static files for images (uploads directory)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
