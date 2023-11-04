import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
//https://nextjs.org/docs/app/api-reference/file-conventions/route

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB(); //in nextjs api call we need to connect every time to db because here it acts as lambda function(ie: server dies after api is called)
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return NextResponse.json(newPrompt, { status: 201 }); //or: return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create a new prompt!" },
      { status: 500 }
    );
  }
};
