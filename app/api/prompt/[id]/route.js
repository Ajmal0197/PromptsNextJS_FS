import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

//get particular prompt data
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });
    return NextResponse.json(prompt, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

//update particular prompt data
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json(); //get request data

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return NextResponse.json("Prompt not found", { status: 404 });
    }

    // Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return NextResponse.json(existingPrompt, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error Updating Prompt" },
      { status: 500 }
    );
  }
};

//delete particular prompt data
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

    if (deletedPrompt) {
      return NextResponse.json("Prompt deleted successfully", { status: 200 });
    } else {
      return NextResponse.json("Prompt not found", { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting prompt" },
      { status: 500 }
    );
  }
};
