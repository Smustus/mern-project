import { useLoaderData } from "react-router";
import useAuth from "../utility/useAuth";
import { useEffect } from "react";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = useLoaderData() as any[];
  const { user } = useAuth();

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <>
      <h2>Welcome, {user}</h2>
      {posts && posts.length > 0 && (
        <ul className="list-disc pl-6 mt-4">
          {posts.map((post, i) => (
            <li key={i}>{post.title}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
