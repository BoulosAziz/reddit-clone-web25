import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const commentCountCache = {};

function PostCard({ post }) {
  const [vote, setVote] = useState(0); // -1, 0, 1
  const [score, setScore] = useState(post.score ?? 123);
  const [commentCount, setCommentCount] = useState(
    typeof post.comments !== 'undefined' ? post.comments : undefined
  );

  useEffect(() => {
    let mounted = true;
    const id = post._id ?? post.id;
    if (!id) return;

    async function load() {
      if (commentCountCache[id] !== undefined) {
        setCommentCount(commentCountCache[id]);
        return;
      }
      try {
        const r = await fetch(`/api/comments/${id}`);
        if (!r.ok) return;
        const data = await r.json();
        if (!mounted) return;
        commentCountCache[id] = (data && data.length) || 0;
        setCommentCount(commentCountCache[id]);
      } catch (err) {
        // ignore, keep fallback
      }
    }

    load();
    return () => { mounted = false; };
  }, [post._id, post.id]);

  function handleUpvote() {
    if (vote === 1) {
      setVote(0);
      setScore((s) => s - 1);
    } else if (vote === -1) {
      setVote(1);
      setScore((s) => s + 2);
    } else {
      setVote(1);
      setScore((s) => s + 1);
    }
  }

  function handleDownvote() {
    if (vote === -1) {
      setVote(0);
      setScore((s) => s + 1);
    } else if (vote === 1) {
      setVote(-1);
      setScore((s) => s - 2);
    } else {
      setVote(-1);
      setScore((s) => s - 1);
    }
  }

  return (
    <article className="post-grid post-card" style={{ background: 'var(--surface)', border: '1px solid var(--card-border)', padding: 12, borderRadius: 6, marginBottom: 12 }}>
      <div className="vote-column" aria-hidden>
        <button className={`vote-btn ${vote === 1 ? 'upvoted' : ''}`} aria-label="upvote" onClick={handleUpvote}>▲</button>
        <div style={{ fontWeight: 700 }}>{score}</div>
        <button className={`vote-btn ${vote === -1 ? 'downvoted' : ''}`} aria-label="downvote" onClick={handleDownvote}>▼</button>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div>
          <div className="thumbnail" aria-hidden />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--muted)' }}>
            <Link to={`/communities/${post.community ?? 'general'}`} className="subreddit-pill" style={{ textDecoration: 'none' }}>r/{post.community ?? 'general'}</Link>
            <span>•</span>
            <span>u/{post.author ?? 'user'}</span>
            <span>•</span>
            <span>{post.time ?? '2h'}</span>
          </div>
          <h3 style={{ margin: '8px 0' }}>
            <Link to={`/posts/${post._id ?? post.id}`} style={{ color: 'var(--text)', textDecoration: 'none' }}>{post.title}</Link>
          </h3>
          <p style={{ color: '#4b5563', marginTop: 8 }}>{post.content ?? post.body}</p>
          <div className="post-actions">
            <Link to={`/posts/${post._id ?? post.id}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{typeof commentCount === 'number' ? commentCount : (post.comments ?? 0)} comments</Link>
            <span>Share</span>
            <span>Save</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
