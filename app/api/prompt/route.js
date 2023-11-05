import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
//https://nextjs.org/docs/app/api-reference/file-conventions/route

export const GET = async (request) => {
  try {
    await connectToDB(); //in nextjs api call we need to connect every time to db because here it acts as lambda function(ie: server dies after api is called)
    const prompts = await Prompt.find({}).populate("creator"); //The "creator" field in a MongoDB schema represents a relationship with another model through its ObjectId, and "populate" in MongoDB is a method to retrieve and fill in the details of the related "User" model when querying the data, connecting the two models based on the ObjectId reference.
    return NextResponse.json(prompts, { status: 200 }); //or: return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch all prompts!" },
      { status: 500 }
    );
  }
};

/*
RESPONSE:
[
    {
        "_id": "65455a2fc3820a4ecada37c0",
        "creator": {
            "_id": "6544d8da59e30f84d3b16154",
            "email": "ahsan100197@gmail.com",
            "username": "ajmalhasan",
            "image": "https://lh3.googleusercontent.com/a/ACg8ocKX4T7MAixeZh6kVL7CfnkzskH-0me9RoXviEaVnCbHLQ=s96-c",
            "__v": 0
        },
        "prompt": "In Next.js, it's common to define such metadata for each page or component to ensure that every part of your application has the necessary information for search engines and users. This metadata can be used in conjunction with Next.js's Head component to dynamically set the title and meta tags for each page.",
        "tag": "#next. #webdev",
        "__v": 0
    }
]
*/
