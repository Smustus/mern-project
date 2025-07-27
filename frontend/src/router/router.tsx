import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import App from "../App";
import About from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
        /* loader: async () => {
          const res = await fetch("/api/posts");
          if (!res.ok) throw new Error("Failed to fetch posts");
          return res.json();
        }, */
      },
      { path: "about", Component: About },
    ],
  },
]);

export default router;
