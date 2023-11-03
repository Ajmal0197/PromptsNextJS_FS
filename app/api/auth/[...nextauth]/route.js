// Import the NextAuth library for authentication
import NextAuth from "next-auth";
// Import the GoogleProvider for authentication using Google
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

// Create a handler for authentication using NextAuth
const handler = NextAuth({
  // Configure authentication providers, in this case, Google
  //also add to redirect uir:- https://next-auth.js.org/getting-started/rest-api#post-apiauthsigninprovider

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID, // Read the Google client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Read the Google client secret from environment variables
    }),
  ],

  // Define callbacks for various authentication events
  callbacks: {
    async session({ session }) {
      // Fetch the user's MongoDB document based on their email and store the user's MongoDB ID in the session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        // Connect to the MongoDB database
        await connectToDB();

        // Check if a user with the provided email already exists in the database
        const userExists = await User.findOne({ email: profile.email });

        // If the user doesn't exist, create a new document in MongoDB for the user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true; // Indicate a successful sign-in
      } catch (error) {
        console.log("Error checking if the user exists: ", error.message);
        return false; // Indicate a failed sign-in
      }
    },
  },
});

// Export the handler as both a GET and POST route for authentication
export { handler as GET, handler as POST };
