import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import "./storyViewer.scss";


const AVAILABLE_EMOJIS = ["🔥", "❤️", "😂", "😮", "😢", "👏"];

export const StoryViewer = ({ story, setOpen }) => {
  const { currentUser } = useContext(AuthContext);
  const isOwner = currentUser.id === story.userId;
  const [showStats, setShowStats] = useState(false);
  
  const queryClient = useQueryClient();

  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ["storyStats", story.id],
    queryFn: () => makeRequest.get(`/stories/${story.id}/stats`).then((res) => res.data),
    enabled: isOwner,
  });

  const viewMutation = useMutation({
    mutationFn: () => makeRequest.post(`/stories/${story.id}/view`),
  });

  const reactMutation = useMutation({
    mutationFn: (emoji) => makeRequest.post(`/stories/${story.id}/react`, { emoji }),
    onSuccess: () => {
      queryClient.invalidateQueries(["storyStats", story.id]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => makeRequest.delete(`/stories/${story.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["stories"]);
      setOpen(null);
    },
  });

  useEffect(() => {
    if (!isOwner) {
      viewMutation.mutate();
    }
  }, [story.id]);

  const handleReact = (emoji) => {
    if (isOwner) return;
    reactMutation.mutate(emoji);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="storyViewerOverlay">
      <div className="viewerContainer">
        {/* Viewer Header */}
        <div className="viewerHeader">
          <div className="userInfo">          
            <img src={currentUser.profilePic} alt={currentUser.name} />
            <div className="userText">
              <span className="name">{story.name}</span>
              <span className="username">@{story.username || 'user'}</span>
            </div>
          </div>
          <div className="actions">
            {isOwner && (
              <button className="deleteBtn" onClick={handleDelete} title="Delete Story">
                <DeleteIcon />
              </button>
            )}
            <button className="closeBtn" onClick={() => setOpen(null)}>
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="contentWrapper">
          {story.contentType === "video" ? (
            <video src={`/upload/${story.contentUrl}`} controls autoPlay playsInline />
          ) : (
            <img src={`/upload/${story.contentUrl}`} alt="Story Content" />
          )}
        </div>

        {/* Interaction Bar */}
        <div className="viewerFooter">
          {isOwner ? (
            <div className="ownerControls">
              <button className="toggleStatsBtn" onClick={() => setShowStats(!showStats)}>
                <VisibilityIcon />
                <span>{stats?.length || 0} Views & Reactions</span>
              </button>
            </div>
          ) : (
            <div className="reactionBar">
              {AVAILABLE_EMOJIS.map((emoji) => (
                <button key={emoji} className="emojiBtn" onClick={() => handleReact(emoji)}>
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stats Drawer */}
        {isOwner && showStats && (
          <div className="statsDrawer">
            <div className="drawerHeader">
              <h3>Viewed by</h3>
              <button onClick={() => setShowStats(false)}><CloseIcon size="small" /></button>
            </div>
            <div className="drawerContent">
              {loadingStats ? (
                <div className="drawerLoader"><CircularProgress size={24} style={{ color: '#F43F5E' }} /></div>
              ) : stats?.length === 0 ? (
                <p className="noViews">No views yet.</p>
              ) : (
                stats?.map((viewer) => (
                  <div className="viewerItem" key={viewer.userId}>
                    <div className="itemUser">
                      <img src={viewer.profilePic ? `/upload/${viewer.profilePic}` : "/assets/defaultAvatar.png"} alt={viewer.name} />
                      <span>{viewer.name}</span>
                    </div>
                    {viewer.emoji && <span className="itemEmoji">{viewer.emoji}</span>}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};