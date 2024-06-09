import app from "./app.js";

import { connectToDatabase } from './db/connection.js'; 
// Database connection
connectToDatabase()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));


