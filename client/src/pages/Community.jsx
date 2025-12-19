import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PostCard from "../components/ui/PostCard.jsx";
import axios from "../api/axios";
import { useCommunity } from "../context/CommunityContext";
import "./Community.css";

// Helper to get community emoji icon
const getCommunityIcon = (name) => {
  const icons = {
    gaming: "🎮",
    technology: "💻",
    science: "🔬",
    movies: "🎬",
    funny: "😂",
    music: "🎵",
    books: "📚",
    travel: "✈️",
    food: "🍔",
    art: "🎨",
    fitness: "💪",
    programming: "👨‍💻",
    minecraft: "🎮",
    eldenring: "🎮",
    pcgaming: "🖥️",
    hardware: "💻",
    software: "💾",
    television: "📺",
    strangerthings: "📺",
    marvel: "🦸",
    memes: "😂",
    askreddit: "❓",
    space: "🚀",
    biology: "🧬",
    nba: "🏀",
    soccer: "⚽",
    photography: "📷",
    earthporn: "🌍",
    cryptocurrency: "💰",
    investing: "📈",
    wallstreetbets: "💹",
    cooking: "🍳",
    explainlikeimfive: "🧒"
  };
  return icons[name.toLowerCase()] || "📌";
};

// Dummy data for community descriptions
const communityDescriptions = {
  technology: "A place to share and discuss the latest technology news, reviews, and innovations.",
  science: "The best place to discuss scientific discoveries, research, and all things science!",
  gaming: "Your one-stop destination for everything gaming - news, reviews, and discussions.",
  movies: "Discussion and recommendations about movies, TV shows, and cinema.",
  askreddit: "Ask anything, get answers from real people. Share experiences and stories.",
  explainlikeimfive: "Explain Like I'm Five is the best forum for layperson-friendly explanations. Don't Panic!",
  programming: "All about programming, from beginners to experts. Share code, ask questions.",
  music: "Share music, discuss artists, and discover new sounds.",
  fitness: "Get fit, stay healthy, and achieve your fitness goals with the community.",
  food: "Delicious recipes, food photography, and culinary discussions.",
};

// Dummy highlights data
const communityHighlights = {
  explainlikeimfive: [
    {
      title: "ELI5: Monthly Current Events Megathread",
      votes: 8,
      comments: 43
    }
  ],
  technology: [
    {
      title: "Weekly Tech News Discussion",
      votes: 156,
      comments: 89
    }
  ],
  gaming: [
    {
      title: "What are you playing this week?",
      votes: 234,
      comments: 567
    }
  ]
};

// Dummy posts data for communities
const generateDummyPosts = (communityName) => {
  const postTemplates = {
    technology: [
      { title: "New AI breakthrough announced by researchers", body: "Scientists have developed a new AI model that can...", votes: 1234, comments: 89 },
      { title: "Apple announces latest product lineup", body: "In today's event, Apple revealed...", votes: 2156, comments: 234 },
      { title: "Is quantum computing finally here?", body: "After years of development, companies are now...", votes: 876, comments: 156 },
      { title: "Best programming languages to learn in 2024", body: "Based on market trends and job opportunities...", votes: 543, comments: 78 },
      { title: "SpaceX successfully launches new satellite", body: "Yesterday's launch marked another milestone...", votes: 1890, comments: 123 }
    ],
    gaming: [
      { title: "Just finished this masterpiece, what an experience!", body: "I can't believe how good this game was...", votes: 3421, comments: 567 },
      { title: "What's everyone playing this weekend?", body: "Looking for recommendations for...", votes: 890, comments: 234 },
      { title: "New game announcement has me hyped!", body: "The trailer just dropped and it looks amazing...", votes: 2134, comments: 345 },
      { title: "Tips for beginners?", body: "Just started playing and feeling overwhelmed...", votes: 456, comments: 89 },
      { title: "My gaming setup after years of collecting", body: "Finally happy with how it turned out...", votes: 5678, comments: 432 }
    ],
    science: [
      { title: "New study reveals surprising findings about sleep", body: "Researchers have discovered that...", votes: 2345, comments: 178 },
      { title: "Mars rover sends back stunning images", body: "The latest photos from Mars show...", votes: 3456, comments: 234 },
      { title: "Climate change study shows alarming trends", body: "New data suggests that...", votes: 1234, comments: 456 },
      { title: "Breakthrough in cancer research", body: "Scientists have identified a new treatment...", votes: 4567, comments: 567 },
      { title: "Physics question: Can someone explain this?", body: "I've been trying to understand...", votes: 678, comments: 123 }
    ],
    explainlikeimfive: [
      { title: "ELI5: How do \"buy now pay later\" companies make money if there's no interest?", body: "Companies like Klarna, Afterpay, and Affirm...", votes: 789, comments: 143 },
      { title: "ELI5: Why do we get hiccups?", body: "What actually causes hiccups and why...", votes: 456, comments: 67 },
      { title: "ELI5: How does noise cancellation work?", body: "I don't understand how headphones can cancel sound...", votes: 1234, comments: 89 },
      { title: "ELI5: What is the difference between RAM and storage?", body: "I keep hearing these terms but...", votes: 567, comments: 45 },
      { title: "ELI5: How do planes stay in the air?", body: "I know it has something to do with lift but...", votes: 2345, comments: 178 }
    ],
    movies: [
      { title: "Just saw the new release - here are my thoughts", body: "Without spoilers, I thought it was...", votes: 1456, comments: 234 },
      { title: "Underrated movies that deserve more love", body: "Here's my list of hidden gems...", votes: 2345, comments: 345 },
      { title: "What's the best movie you've seen this year?", body: "Looking for recommendations...", votes: 890, comments: 167 },
      { title: "This scene still gives me goosebumps every time", body: "The cinematography in this movie is just...", votes: 3456, comments: 456 },
      { title: "Upcoming releases I'm excited about", body: "2024 is looking like a great year for cinema...", votes: 678, comments: 89 }
    ],
    programming: [
      { title: "What language should I learn first?", body: "Complete beginner here, looking for advice...", votes: 567, comments: 123 },
      { title: "Just landed my first dev job!", body: "After months of learning and applying...", votes: 2345, comments: 189 },
      { title: "How do you deal with imposter syndrome?", body: "Even after years of coding, I still feel like...", votes: 1234, comments: 234 },
      { title: "Cool project I built over the weekend", body: "Made a simple app that does...", votes: 890, comments: 67 },
      { title: "Best practices for clean code", body: "Here are some tips I've learned...", votes: 3456, comments: 345 }
    ],
    askreddit: [
      { title: "What's a skill you learned that changed your life?", body: "", votes: 4567, comments: 1234 },
      { title: "People who work night shifts, what's it like?", body: "", votes: 2345, comments: 678 },
      { title: "What's your biggest regret?", body: "", votes: 1234, comments: 456 },
      { title: "What conspiracy theory do you believe might be true?", body: "", votes: 5678, comments: 2345 },
      { title: "What's the weirdest dream you've ever had?", body: "", votes: 890, comments: 234 }
    ]
  };

  const defaultPosts = [
    { title: `Welcome to r/${communityName}!`, body: "This is a great community for discussing all things related to " + communityName, votes: 234, comments: 45 },
    { title: "Discussion thread", body: "Let's talk about " + communityName, votes: 567, comments: 89 },
    { title: "Question for the community", body: "What are your thoughts on...", votes: 123, comments: 34 },
    { title: "Check this out!", body: "Found this interesting article about " + communityName, votes: 890, comments: 123 },
    { title: "New to this community", body: "Hi everyone! Just joined and excited to learn more", votes: 345, comments: 67 }
  ];

  const templates = postTemplates[communityName.toLowerCase()] || defaultPosts;
  
  return templates.map((template, index) => ({
    _id: `dummy-post-${communityName}-${index}`,
    title: template.title,
    body: template.body,
    author: {
      _id: `user-${index}`,
      username: `user_${Math.random().toString(36).substring(7)}`
    },
    community: {
      name: communityName
    },
    upvotes: Array(template.votes).fill(null),
    downvotes: Array(Math.floor(template.votes * 0.1)).fill(null),
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    commentCount: template.comments
  }));
};

function Community() {
  const { name } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [community, setCommunity] = useState(null);
  const [filter, setFilter] = useState('Best');
  const [highlightsExpanded, setHighlightsExpanded] = useState(true);
  
  const { isJoined, addJoinedCommunity, removeJoinedCommunity, fetchJoinedCommunities } = useCommunity();

  useEffect(() => {
    async function fetchCommunityData() {
      try {
        setLoading(true);
        // Try to fetch real community data
        const res = await axios.get(`/communities?name=${name}`);
        const foundCommunity = res.data.find(c => c.name.toLowerCase() === name.toLowerCase());
        
        if (foundCommunity) {
          setCommunity(foundCommunity);
          try {
            const postsRes = await axios.get(`/posts?community=${foundCommunity._id}`);
            // Filter on frontend for double safety (in case backend is stale or returns global feed)
            const realPosts = postsRes.data.filter(post => {
              const postCommunityId = post.community?._id || post.community;
              return postCommunityId && String(postCommunityId) === String(foundCommunity._id);
            });
            const dummyPosts = generateDummyPosts(name);
            // Combine real and dummy posts
            setPosts([...realPosts, ...dummyPosts]);
          } catch (e) {
            console.error("Error fetching community posts:", e);
            const dummyPosts = generateDummyPosts(name);
            setPosts(dummyPosts);
          }
        } else {
          // Create dummy community if not found
          setCommunity({
            _id: `dummy-${name}`,
            name: name,
            description: communityDescriptions[name.toLowerCase()] || `Welcome to r/${name} - a community for discussing ${name}.`,
            members: Array(Math.floor(Math.random() * 50000) + 1000).fill(null),
            createdAt: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
          });
          const dummyPosts = generateDummyPosts(name);
          setPosts(dummyPosts);
        }
      } catch (err) {
        console.error("Failed to fetch community", err);
        // Create dummy community on error
        setCommunity({
          _id: `dummy-${name}`,
          name: name,
          description: communityDescriptions[name.toLowerCase()] || `Welcome to r/${name} - a community for discussing ${name}.`,
          members: Array(Math.floor(Math.random() * 50000) + 1000).fill(null),
          createdAt: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
        });
        
        // Use dummy posts on error too
        const dummyPosts = generateDummyPosts(name);
        setPosts(dummyPosts);
      } finally {
        setLoading(false);
      }
    }
    fetchCommunityData();
  }, [name]);

  const handleJoinToggle = async () => {
    if (!community) return;
    
    try {
      if (isJoined(community._id)) {
        await axios.post(`/communities/${community._id}/leave`);
        removeJoinedCommunity(community._id);
      } else {
        await axios.post(`/communities/${community._id}/join`);
        addJoinedCommunity(community);
      }
      await fetchJoinedCommunities();
    } catch (err) {
      console.error("Failed to join/leave community", err);
      if (err.response?.status === 401) {
        alert("Please login to join communities");
      }
    }
  };

  if (loading) {
    return (
      <div className="community-page">
        <div className="community-main">
          <p style={{ padding: '2rem', textAlign: 'center' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="community-page">
        <div className="community-main">
          <p style={{ padding: '2rem', textAlign: 'center' }}>Community not found</p>
        </div>
      </div>
    );
  }

  const memberCount = community.members?.length || 0;
  const weeklyVisitors = Math.floor(memberCount * 0.08) + Math.floor(Math.random() * 1000);
  const weeklyContributions = Math.floor(memberCount * 0.005) + Math.floor(Math.random() * 100);
  const joined = isJoined(community._id);
  const highlights = communityHighlights[name.toLowerCase()] || [];

  return (
    <div className="community-page">
      <div className="community-main">
        {/* Banner */}
        <div className="community-banner"></div>

        {/* Header */}
        <div className="community-header">
          <div className="community-header-content">
            <div className="community-avatar">
              {getCommunityIcon(name)}
            </div>
            <div className="community-info">
              <h1 className="community-title">r/{name}</h1>
              <div className="community-actions">
                <button className="btn-create-post" onClick={() => window.location.href=`/create?community=${name}`}>
                  + Create Post
                </button>
                <button 
                  className={`btn-join-community ${joined ? 'joined' : ''}`}
                  onClick={handleJoinToggle}
                >
                  {joined ? 'Joined' : 'Join'}
                </button>

              </div>
            </div>
          </div>
        </div>



        {/* Community Highlights */}
        {highlights.length > 0 && (
          <div className="community-highlights">
            <div className="highlights-header" onClick={() => setHighlightsExpanded(!highlightsExpanded)}>
              <div className="highlights-title">
                🎯 Community highlights
              </div>
              <span>{highlightsExpanded ? '▲' : '▼'}</span>
            </div>
            {highlightsExpanded && highlights.map((highlight, index) => (
              <div key={index} className="highlight-item">
                <div className="highlight-title">{highlight.title}</div>
                <div className="highlight-meta">
                  {highlight.votes} votes • {highlight.comments} comments
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts */}
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="community-empty-state">
            <h3>No posts yet</h3>
            <p>Be the first to create a post in r/{name}!</p>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="community-sidebar">
        <div className="community-about">
          <h3 className="about-title">{community.name} | About</h3>
          
          <p className="about-description">{community.description}</p>
          
          <div className="about-meta">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
            </svg>
            <span>Created {new Date(community.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          
          <div className="about-meta">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <span>Public</span>
          </div>

          <div className="community-stats">
            <div className="stat-item">
              <span className="stat-value">{weeklyVisitors.toLocaleString()}</span>
              <span className="stat-label">Weekly visitors</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{weeklyContributions.toLocaleString()}</span>
              <span className="stat-label">Weekly contributions</span>
            </div>
          </div>

          <div className="community-bookmarks">
            <div className="bookmarks-header">COMMUNITY BOOKMARKS</div>
            <button className="btn-detailed-rules">Detailed Rules</button>
          </div>

          <div className="request-section">
            <div className="request-header">
              <span className="request-title">REQUEST AN EXPLANATION</span>
              <span>▼</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
