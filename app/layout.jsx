import Nav from "@components/Nav";
import AuthSessionProvider from "@components/Provider";
import "@/app/ui/global.css";
import { inter, roboto_mono } from "@/app/ui/font.js";

//In the component, you define the metadata object, which contains default metadata tags for your application. The title property specifies the title of your application, while the description property provides a brief description. These metadata tags are important for search engine optimization (SEO) and can be overridden for specific routes if needed.
export const metadata = {
  title: "PromptProvider",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
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

//STEP BY STEP LEARNING: https://nextjs.org/learn/dashboard-app/getting-started
