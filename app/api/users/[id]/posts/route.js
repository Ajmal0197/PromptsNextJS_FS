import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    console.log("paramsparamsGETMYPOST", params); //paramsparamsGETMYPOST { id: '6544d8da59e30f84d3b16154' }
    await connectToDB(); //in nextjs api call we need to connect every time to db because here it acts as lambda function(ie: server dies after api is called)
    const prompts = await Prompt.find({ creator: params?.id }).populate(
      "creator"
    ); //The "creator" field is likely a reference to the "User" collection, so this operation fetches user-related data for each prompt.
    return NextResponse.json(prompts, { status: 200 }); //or: return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch all prompts!" },
      { status: 500 }
    );
  }
};
