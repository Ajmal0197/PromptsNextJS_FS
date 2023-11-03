// Import required components from the "mongoose" library
import { Schema, model, models } from "mongoose";

// Define a Mongoose schema for a user
const UserSchema = new Schema({
  // Field for email with validation rules
  email: {
    type: String,
    unique: [true, "Email already exists!"], // Must be unique
    required: [true, "Email is required!"], // Must be present
  },
  // Field for username with validation rules
  username: {
    type: String,
    required: [true, "Username is required!"], // Must be present
    match: [
      // Must match a specific pattern (8-20 alphanumeric characters and special characters . and _)
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  // Field for the user's image
  image: {
    type: String,
  },
});

//since unlike regular express server which stays always on, in case of next its created at runtime so
//to avoid model recreation we followed bottom approach
// Create a Mongoose model for the "User" schema or reuse an existing model
const User = models.User || model("User", UserSchema);

// Export the "User" model for use in other parts of the code
export default User;
