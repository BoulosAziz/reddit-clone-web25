import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";

const commentCountCache = {};

function PostCard({ post, onDelete }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [vote, setVote] = useState(0); // -1, 0, 1
  const [score, setScore] = useState(post.score ?? 123);
  const [summary, setSummary] = useState(post.summary || null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    // Initialize vote state based on user
    if (user && post) {
      if (post.upvotes?.includes(user.id || user._id)) {
        setVote(1);
      } else if (post.downvotes?.includes(user.id || user._id)) {
        setVote(-1);
      } else {
        setVote(0);
      }
    }
    
    return () => mounted = false;
  }, [post, user]);

  async function handleUpvote() {
    if (!user) {
      alert("Please login to vote");
      return;
    }

    try {
      const newVote = vote === 1 ? 0 : 1;
      setVote(newVote);
      
      // Optimistic update
      if (vote === 1) {
         setScore(s => s - 1);
      } else if (vote === -1) {
         setScore(s => s + 2);
      } else {
         setScore(s => s + 1);
      }

      await axios.post(`/posts/${post._id}/vote`, { type: 'upvote' });
    } catch (error) {
      console.error("Error voting:", error);
      // Revert on error could be added here
    }
  }

  async function handleDownvote() {
    if (!user) {
      alert("Please login to vote");
      return;
    }

    try {
      const newVote = vote === -1 ? 0 : -1;
      setVote(newVote);
      
      // Optimistic update
      if (vote === -1) {
        setScore(s => s + 1);
      } else if (vote === 1) {
        setScore(s => s - 2);
      } else {
        setScore(s => s - 1);
      }

      await axios.post(`/posts/${post._id}/vote`, { type: 'downvote' });
    } catch (error) {
      console.error("Error voting:", error);
    }
  }

  async function handleSummarize() {
    if (summary || loadingSummary) return; // Already have summary or loading
    
    setLoadingSummary(true);
    try {
      const response = await axios.post(`/posts/${post._id}/summarize`);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Failed to generate summary');
    } finally {
      setLoadingSummary(false);
    }
  }

  async function handleDelete(e) {
    if (e) e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await axios.delete(`/posts/${post._id}`);
      if (onDelete) {
        onDelete(post._id);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  }

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on interactive elements
    if (e.target.closest('button') || e.target.closest('.action-btn') || e.target.closest('a') || e.target.closest('.vote-btn')) {
      return;
    }
    navigate(`/posts/${post._id}`);
  };

  return (
    <article className="post-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="vote-column" onClick={(e) => e.stopPropagation()}>
        <button className={`vote-btn ${vote === 1 ? 'upvoted' : ''}`} aria-label="upvote" onClick={handleUpvote}>▲</button>
        <div className="vote-score">{score}</div>
        <button className={`vote-btn down ${vote === -1 ? 'downvoted' : ''}`} aria-label="downvote" onClick={handleDownvote}>▼</button>
      </div>
      
      <div className="post-content">
        <div className="post-meta">
          {post.community && (
            <>
              <Link to={`/communities/${post.community?.name || post.community}`} className="subreddit-link" onClick={(e) => e.stopPropagation()}>
                r/{post.community?.name || post.community}
              </Link>
              <span>•</span>
            </>
          )}
          <span style={{ color: '#787c7e' }}>Posted by u/{post.author?.username || post.author || 'deleted'}</span>
          <span>•</span>
          <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'just now'}</span>
        </div>

        <h3 className="post-title">{post.title}</h3>
        
        {post.content && <div className="post-body">{post.content}</div>}

        {/* Display media if exists */}
        {post.mediaType === 'image' && post.mediaUrl && (
          <div className="post-media">
            <img src={post.mediaUrl} alt={post.title} className="post-image" />
          </div>
        )}
        
        {post.mediaType === 'video' && post.mediaUrl && (
          <div className="post-media">
            <video controls className="post-video">
              <source src={post.mediaUrl} />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Display link if exists */}
        {post.linkUrl && (
          <a href={post.linkUrl} target="_blank" rel="noopener noreferrer" className="post-link-card" onClick={(e) => e.stopPropagation()}>
            <div className="link-icon">🔗</div>
            <div className="link-info">
              <div className="link-url">
                {(() => {
                  try {
                    return new URL(post.linkUrl).hostname;
                  } catch {
                    return 'External Link';
                  }
                })()}
              </div>
              <div className="link-full">{post.linkUrl}</div>
            </div>
            <div className="link-arrow">→</div>
          </a>
        )}

        <div className="post-actions">
          {post.content && post.content.length > 200 && !summary && (
            <div className="action-btn ai-btn" onClick={(e) => handleSummarize(e)}>
              {loadingSummary ? '⏳ Summarizing...' : '🤖 Summarize'}
            </div>
          )}
          <div className="action-btn" onClick={(e) => {
             e.stopPropagation();
             navigate(`/posts/${post._id}?focus=comments`);
           }}>
             {/* Prioritize details array length, fallback to feed count, fallback to 0 */}
             💬 {post.comments?.length >= 0 ? post.comments.length : (post.commentCount || 0)} Comments
          </div>
          <div className="action-btn">
             ↪ Share
          </div>
          <div className="action-btn">
             🔖 Save
          </div>
          {user && post.author && (post.author._id === user.id || post.author._id === user._id || post.author === user.id || post.author === user._id) && (
            <div className="action-btn delete-btn" onClick={(e) => handleDelete(e)}>
              🗑️ Delete
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default PostCard;
