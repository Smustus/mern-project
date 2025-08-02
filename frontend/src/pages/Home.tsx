import { useLoaderData } from "react-router";
import useAuth from "../utility/useAuth";
import { useEffect } from "react";
import PostCard from "../components/PostCard";

const Home = () => {
  const posts = useLoaderData() as Post[];
  const { user } = useAuth();

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  if (!posts) return <div>Loading...</div>;
  if (posts.length === 0) return <div>No posts found.</div>;

  return (
    <>
      <h2>Welcome, {user}</h2>
      {posts && posts.length > 0 && (
        <ul className="list-disc pl-6 mt-4">
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard {...post} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
