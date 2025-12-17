import PostCard from "../components/ui/PostCard.jsx";
import { useState } from "react";

const samplePosts = [
  { id: 1, title: "Welcome to the Reddit Clone", body: "This is a sample post.", community: 'reactjs', author: 'alice', score: 420, comments: 12 },
  { id: 2, title: "Second Post", body: "Another example post.", community: 'webdev', author: 'bob', score: 18, comments: 3 },
  { id: 3, title: "Third Post", body: "Yet another post for the feed.", community: 'javascript', author: 'carol', score: 64, comments: 8 },
];

function Home() {
  const [filter, setFilter] = useState('Hot');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Home</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setFilter('Hot')} style={{ fontWeight: filter === 'Hot' ? '700' : '500' }}>Hot</button>
          <button onClick={() => setFilter('New')} style={{ fontWeight: filter === 'New' ? '700' : '500' }}>New</button>
          <button onClick={() => setFilter('Top')} style={{ fontWeight: filter === 'Top' ? '700' : '500' }}>Top</button>
        </div>
      </div>

      {samplePosts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}

export default Home;
