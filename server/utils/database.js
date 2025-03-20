import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const connected = await connect(process.env.DATABASE_URL);
    if (connected) {
      console.log("Database successfully connected");
    }
  } catch (error) {
    console.log("Error in connecting database");
  }
};
export default connectDB;
