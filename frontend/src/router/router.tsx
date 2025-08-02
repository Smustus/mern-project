import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import App from "../App";
import PostDetails from "../pages/PostDetails";
import CreatePost from "../pages/CreatePost";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () => {
          try {
            const res = await fetch("http://localhost:5001/api/posts");
            if (!res.ok) throw new Error("Failed to fetch posts");
            return res.json();
          } catch (error) {
            console.error("Error fetching posts: ", error);
            return [];
          }
        },
      },
    ],
  },
  {
    path: "/create",
    Component: App,
    children: [
      {
        index: true,
        Component: CreatePost,
      },
    ],
  },
  {
    path: "/post/:id",
    Component: App,
    children: [
      {
        index: true,
        Component: PostDetails,
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `http://localhost:5001/api/posts/${params.id}`
            ); // id
            if (!res.ok) throw new Error("Failed to fetch posts");
            return res.json();
          } catch (error) {
            console.error("Error fetching posts: ", error);
            return [];
          }
        },
      },
    ],
  },
]);

export default router;
