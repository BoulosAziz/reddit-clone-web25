import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/ui/PostCard";
import "./Profile.css";

function Profile() {
  const { username } = useParams();
  const { user: currentUser, refreshUser } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`/users/${username}`);
        setProfile(res.data.user);
        setPosts(res.data.posts);
        
        // Initialize edit state
        setEditBio(res.data.user.bio || "");
        setEditAvatar(res.data.user.avatar || "");
      } catch (err) {
        console.error(err);
        setError("User not found");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [username]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put("/users/me", {
        bio: editBio,
        avatar: editAvatar
      });
      // Update local state
      setProfile({ ...profile, bio: res.data.bio, avatar: res.data.avatar });
      // Sync global auth state (navbar avatar, etc)
      await refreshUser(); 
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;
  if (!profile) return null;

  const isOwnProfile = currentUser?.username === profile.username;

  return (
    <div className="profile-page">
      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-cover"></div>
        <div className="profile-header-content">
          <div className="profile-avatar-container">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.username} className="profile-avatar-large" />
            ) : (
              <div className="profile-avatar-placeholder">{profile.username[0].toUpperCase()}</div>
            )}
          </div>
          <div className="profile-actions">
            {isOwnProfile && (
              <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
        
        <div className="profile-info">
          <h1 className="profile-username">u/{profile.username}</h1>
          <p className="profile-bio">{profile.bio || "No bio yet"}</p>
          
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-label">Karma</span>
              <span className="stat-value">{profile.karma || 0}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Joined</span>
              <span className="stat-value">{new Date(profile.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs (Simplified) */}
      <div className="profile-content">
        <div className="profile-tabs">
          <button className="tab active">Posts</button>
          <button className="tab">Comments</button>
        </div>
        
        <div className="profile-feed">
          {posts.length > 0 ? (
            posts.map(post => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="empty-feed">
              u/{profile.username} hasn't posted anything yet.
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content profile-edit-modal">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label>Display Name (Bio?)</label>
                <p className="sub-label">Actually updating Bio</p>
                <textarea 
                  value={editBio} 
                  onChange={e => setEditBio(e.target.value)}
                  maxLength={300}
                  className="edit-textarea"
                />
              </div>
              
              <div className="form-group">
                <label>Avatar URL</label>
                <input 
                  type="text" 
                  value={editAvatar} 
                  onChange={e => setEditAvatar(e.target.value)}
                  className="edit-input"
                  placeholder="https://..."
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
