import mongoose from "mongoose";

const connection = {
  isConnected: false,
};

const connectToMongoDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI environment variable is not set.");
    return;
  }

  try {
    if (connection.isConnected) {
      console.log("MongoDB is already connected!");
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);

    db.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      connection.isConnected = false;
    });

    db.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
      connection.isConnected = true;
    });

    connection.isConnected = db.connections[0].readyState === 1; // 1 = connected
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongoDB;
