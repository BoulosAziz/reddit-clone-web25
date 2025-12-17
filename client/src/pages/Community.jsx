import { useParams } from "react-router-dom";
import PostCard from "../components/ui/PostCard.jsx";

const samplePosts = [
  { id: 11, title: "Community Post 1", body: "Post inside the community." },
  { id: 12, title: "Community Post 2", body: "Another community post." },
];

function Community() {
  const { name } = useParams();

  return (
    <div>
      <h1>r/{name}</h1>
      <p>Welcome to r/{name} — sample community page.</p>
      {samplePosts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}

export default Community;
