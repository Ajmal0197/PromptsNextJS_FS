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
        you're a writer seeking fresh story ideas, an artist looking for new
        visual concepts, or a developer in need of coding challenges, our
      </p>

      {/* FEED COMPONENT */}
      <Feed />
    </section>
  );
};

export default Home;
