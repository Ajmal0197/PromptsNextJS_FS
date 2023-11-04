//this page will render as SSR and will help in SEO, we are further breaking down in component structure that can be made as client component on need
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Unleash your creativity with the AI Prompt Generator, your ultimate
        source of inspiration for writing, art, programming, and more. Whether
        you&apos;re a writer seeking fresh story ideas, an artist looking for new
        visual concepts, or a developer in need of coding challenges, our
      </p>

      {/* FEED COMPONENT */}
      <Feed />
    </section>
  );
};

export default Home;

// TODO:
// 1. Implement Search (search by prompt/tag/username)
// 2. Implement Click on tag (on clicking tag put it in search bar also display all feeds related to that tag)
// 3. Implement View Other profiles (view other profiles with there created feeds)
