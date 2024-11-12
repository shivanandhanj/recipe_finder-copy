const jsonData={
    
    "Recipe Name": "Salem Thatta Vadai",
        "Cuisine": "Indian",
        "Dish Type": "Snack",
        "Category": "Kongunadu",
        "Meal Type": ["Evening Snack"],
        "Cooking Methods": ["Deep Fried", "Sautéed"],
        "Cooking Time": 60,
        "Serving Size": 6,
        "Ingredients": [
          { "name": "Chana Dal", "quantity": 1, "unit": "tbsp" },
          { "name": "Rice Flour", "quantity": 1, "unit": "cup" },
          { "name": "Asafoetida", "quantity": 0.5, "unit": "tsp" },
          { "name": "Red Chili Powder", "quantity": 1, "unit": "tsp" },
          { "name": "Water", "quantity": 0.5, "unit": "cup" },
          { "name": "Sunflower Oil", "quantity":0, "unit": "custom" },
          { "name": "Dry Red Chilli", "quantity": 1, "unit": "no" },
          { "name": "Salt", "quantity": 0.25, "unit": "tsp" },
          { "name": "White Sesame Seeds", "quantity": 0.25, "unit": "tsp" },
          { "name": "Sunflower Oil", "quantity": 2, "unit": "tsp" },
          { "name": "Small Onion (Shallots)", "quantity": 0.5, "unit": "cup" },
          { "name": "Garlic", "quantity": 8, "unit": "cloves" },
          { "name": "Mint Leaves", "quantity": 0.5, "unit": "cup" },
          { "name": "Coriander Leaves", "quantity": 0.5, "unit": "cup" },
          { "name": "Green Chilli", "quantity": 3, "unit": "no" },
          { "name": "Lemon Juice", "quantity": 2, "unit": "tsp" },
          { "name": "Carrot", "quantity": 1, "unit": "no" },
          { "name": "Beetroot", "quantity": 1, "unit": "no" },
          { "name": "Urad Dal (whole)", "quantity": 1, "unit": "tbsp" },
          { "name": "Cumin", "quantity": 1, "unit": "tsp" },
          { "name": "Curry Leaves", "quantity": 2, "unit": "sprigs" },
          { "name": "Chana Dal", "quantity": 1, "unit": "tbsp" },
          { "name": "Salt", "quantity": 1.25, "unit": "tsp" },
          { "name": "Small Onion (Shallots)", "quantity": 4, "unit": "no" },
          { "name": "Garlic", "quantity": 4, "unit": "cloves" },
          { "name": "Coconut Oil", "quantity": 4, "unit": "tbsp" },
          { "name": "Dry Red Chilli", "quantity": 3, "unit": "no" },
          { "name": "Tomato", "quantity": 2, "unit": "no" },
          { "name": "Salt", "quantity": 0.5, "unit": "tsp" },
          { "name": "Salt", "quantity": 1, "unit": "tsp" },
          { "name": "Cumin Powder", "quantity": 0.5, "unit": "tsp" },
          { "name": "Water", "quantity": 1.25, "unit": "tbsp" },
          { "name": "Onion", "quantity": 1, "unit": "no" }
        ],
        "Nutritional Information": {
          "calories": 282,
          "protein": 6.8,
          "fat": 12,
          "carbs": 39,
          "sugar": 8.1,
          "fiber": 6.6
        },
        "Cooking Steps": [
          "Step 1: Toast the urad dal in a pan on medium heat until deeply golden brown. Allow it to cool for a minute before adding it to a blender along with roasted chana dal. Blend until it is a fine powder.",
          "Step 2: In a bowl, add all the ingredients required for the thatta vadai. Then strain the urad dal mixture and add it to the bowl. Add water and knead it into a smooth dough. Portion out the dough into small, even-sized balls.",
          "Step 3: Lightly oil 2 small banana leaves. Place one of the balls between the two leaves and apply even pressure using a flat surface like a dabrah. Press down into a circle that is of an even thickness of around ½ cm. Deep fry them in hot oil until they are deeply golden brown and crispy. Remove them from the oil and drain on paper towels.",
          "Step 4: To a mortar and pestle, add garlic, shallots, and dry red chilli. Process them until they have been crushed and are fragrant. Transfer the mixture to a bowl and add sesame seeds and salt. In a pan, heat coconut oil until it is hot and just smoking. Pour this hot oil into the bowl and let it steep.",
          "Step 5: To a pan, add oil. Once hot, add the shallots and garlic. Sauté for 3 minutes, or until lightly golden and starting to soften. Then add the dry red chilli and toast for 30 seconds until fragrant. Add the tomatoes and cook on high heat for 5-6 minutes. The tomatoes will become soft and mushy. Remove from heat and let it cool slightly before blending into a smooth paste.",
          "Step 6: Add all the ingredients required into a blender and blend until a smooth chutney is formed.",
          "Step 7: Grate everything and toss."
        ],
        "Prep Time": 15,
        "Cook Time": 45,
        "Total Time": 60,
        "Taste/Flavor Profile": "Savory",
        "User Ratings": 4.6,
        "Diet Type": "Vegetarian",
        "Allergies": "None"
      
};


function mapJsonToSchema(json) {
    return {
        title: json["Recipe Name"],
        cuisine: json["Cuisine"],
        dishType: json["Dish Type"],
        category: json["Category"],
        mealType: json["Meal Type"],
        cookingMethods: json["Cooking Methods"],
        duration: json["Total Time"],  // Map to `Total Time` for total duration
        prepTime: json["Prep Time"],
        cookTime: json["Cook Time"],
        servingSize: json["Serving Size"],
        difficulty: json["Difficulty"] || "Medium",  // Provide a default if not specified
        tasteProfile: json["Taste/Flavor Profile"],
        dietType: json["Diet Type"],
        allergies: json["Allergies"],
        userRatings: json["User Ratings"],
        ingredients: json["Ingredients"],
        nutritionalInfo: json["Nutritional Information"],
        // Add an empty string if no instructions
        cookingSteps: json["Cooking Steps"],
        image: json["Image"] || "",  // Optional field
        youtubeLink: json["YouTube Link"] || ""  // Optional field
    };
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        const mappedData = mapJsonToSchema(jsonData);

        try {
            const newRecipe = new Recipe(mappedData);
            await newRecipe.save();
            console.log('Recipe saved successfully');
        } catch (error) {
            console.error('Error saving recipe:', error);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.error('MongoDB connection error:', err));

    app.get('/',(req,res)=>{
        res.send("hello from server");
    })