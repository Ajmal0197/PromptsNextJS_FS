import { checkEnvironment } from "@utils/helper";

// Dynamic metadata
export async function generateMetadata({ params, searchParams }, parent) {
  //   console.log("generateMetadata1", params,searchParams,parent);

  let username;
  if (Object.keys(params).length > 0) {
    const response = await fetch(
      `${checkEnvironment()}/api/users/${params?.id}/posts`
    );
    const data = await response.json();
    username = data[0]?.creator?.username;
  }
  return {
    title: `Prompts by:${username}` || "Profile",
    default: "Profile",
  };
}

const RootLayout = ({ children }) => {
  return <div>{children}</div>;
};

export default RootLayout;
