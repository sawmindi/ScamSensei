// Importing connect and disconnect from mongoose using ES Module syntax
import mongoose from 'mongoose';

const { connect, disconnect } = mongoose;

// Function to connect to the database
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        throw new Error('Cannot connect to DB', error);
    }
}

// Function to disconnect from the database
async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        throw new Error('Error disconnecting from database', error);
    }
}

// Exporting the functions
export { disconnectFromDatabase, connectToDatabase };
