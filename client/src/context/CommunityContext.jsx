import { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { useAuth } from "./AuthContext";

const CommunityContext = createContext();

export const useCommunity = () => {
  return useContext(CommunityContext);
};

export const CommunityProvider = ({ children }) => {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch joined communities when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchJoinedCommunities();
    } else {
      setJoinedCommunities([]);
    }
  }, [isAuthenticated]);

  const fetchJoinedCommunities = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/communities/user/joined");
      setJoinedCommunities(response.data);
    } catch (error) {
      console.error("Error fetching joined communities:", error);
      setJoinedCommunities([]);
    } finally {
      setLoading(false);
    }
  };

  const addJoinedCommunity = (community) => {
    setJoinedCommunities((prev) => {
      // Check if already exists to avoid duplicates
      if (prev.some((c) => c._id === community._id)) {
        return prev;
      }
      return [...prev, community];
    });
  };

  const removeJoinedCommunity = (communityId) => {
    setJoinedCommunities((prev) =>
      prev.filter((c) => c._id !== communityId)
    );
  };

  const isJoined = (communityId) => {
    return joinedCommunities.some((c) => c._id === communityId);
  };

  const value = {
    joinedCommunities,
    loading,
    fetchJoinedCommunities,
    addJoinedCommunity,
    removeJoinedCommunity,
    isJoined,
  };

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
};
