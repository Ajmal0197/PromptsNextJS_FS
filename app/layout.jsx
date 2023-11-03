import Nav from "@components/Nav";
import AuthSessionProvider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "PromptProvider",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </AuthSessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
