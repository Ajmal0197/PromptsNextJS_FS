import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  //This is a common pattern in database design when dealing with relationships between different types of data.
  creator: {
    type: Schema.Types.ObjectId, // Data type for MongoDB ObjectId
    ref: "User", // Reference to the "User" model
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."], // Must not be empty
  },
  tag: {
    type: String,
    required: [true, "Tag is required."], // Must not be empty
  },
});

// Create a Mongoose model for the "Prompt" schema or reuse an existing model if it exists
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
