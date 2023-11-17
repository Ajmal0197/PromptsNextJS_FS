// https://nextjs.org/learn/dashboard-app/adding-authentication

// Import the NextAuth library for authentication
import NextAuth from "next-auth";
// Import the GoogleProvider for authentication using Google
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import CredentialsProvider from "next-auth/providers/credentials";

// Create a handler for authentication using NextAuth
const handler = NextAuth({
  // Configure authentication providers, in this case, Google
  //also add to redirect uir:- https://next-auth.js.org/getting-started/rest-api#post-apiauthsigninprovider

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID, // Read the Google client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Read the Google client secret from environment variables
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),

    // USAGE:
    // signIn("credentials", { //"credentials" = "id" in CredentialsProvider
    //   email,
    //   password,
    // });
    // signOut() //will make user unauthenticated
    // register API: app/api/auth/register/route.js
    /*

    MAKING PROTECTED ROUTE:
      import { useSession } from "next-auth/react";
      const session = useSession();

      if (session.status === "loading") {
        return <p>Loading...</p>;
      }

      if (session.status === "unauthenticated") {
        router?.push("/dashboard/login");
      }

      if (session.status === "authenticated") {
        router?.push("/");
      }
    */

    //for logging in without 3rd party provider (ie registration)
    //below will authenticate user we can check it using "useSession" Hook in component
    CredentialsProvider({
      id: "credentials", // Unique identifier for this provider
      name: "Credentials", // Human-readable name for the provider
      async authorize(credentials) {
        //credentials contains users request
        //Check if the user exists.
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          // If the user exists, check if the provided password is correct
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
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

  pages: {
    error: "/", // on error in authentication go to dashboard
  },
});

// Export the handler as both a GET and POST route for authentication
export { handler as GET, handler as POST };
