import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/ui/PostCard";
import "./SavedPosts.css";

function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchSavedPosts();
  }, [isAuthenticated, navigate]);

  const fetchSavedPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/posts/saved");
      setSavedPosts(response.data);
    } catch (error) {
      console.error("Error fetching saved posts:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = (postId) => {
    // Update local state immediately for better UX
    setSavedPosts(prev => prev.filter(post => post._id !== postId));
  };

  if (loading) {
    return (
      <div className="saved-posts-container">
        <div className="loading-spinner">Loading your saved posts...</div>
      </div>
    );
  }

  return (
    <div className="saved-posts-container">
      <div className="saved-posts-header">
        <h1>Saved Posts</h1>
        <p className="saved-posts-count">
          {savedPosts.length} {savedPosts.length === 1 ? "post" : "posts"} saved
        </p>
      </div>

      {savedPosts.length > 0 ? (
        <div className="saved-posts-feed">
          {savedPosts.map((post) => (
            <PostCard 
              key={post._id} 
              post={post} 
              onUnsave={handleUnsave}
              isSavedPage={true}
            />
          ))}
        </div>
      ) : (
        <div className="saved-posts-empty">
          <div className="empty-icon">🔖</div>
          <h2>No saved posts yet</h2>
          <p>Posts you save will appear here for easy access later.</p>
          <button 
            className="explore-btn" 
            onClick={() => navigate("/")}
          >
            Explore Posts
          </button>
        </div>
      )}
    </div>
  );
}

export default SavedPosts;
