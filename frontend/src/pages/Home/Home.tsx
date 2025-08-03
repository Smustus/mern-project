import { useLoaderData } from "react-router";
import { useEffect } from "react";
import useAuth from "../../utility/useAuth";
import PostCard from "../../components/PostCard/PostCard";
import RateLimitUI from "../../components/RateLimitUI/RateLimitUI";
import "./Home.css";

const Home = () => {
  const posts = useLoaderData() as Post[];
  const { user } = useAuth();

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  if (!posts) return <div className="home-message">Loading posts...</div>;
  if (posts.length === 0)
    return <div className="home-message">No posts found.</div>;

  return (
    <div className="home-container">
      <h2 className="welcome-message">Welcome, {user}</h2>
      {posts && posts.length > 0 ? (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post._id} className="posts-list-item">
              <PostCard {...post} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="home-message">No posts found.</div>
      )}
      <RateLimitUI />
    </div>
  );
};

export default Home;
