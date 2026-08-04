import { useContext, useRef, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import CircularProgress from '@mui/material/CircularProgress';
import './stories.scss';
import { AddStory } from '../addStory/AddStory';
import { StoryViewer } from '../storyViewer/StoryViewer';

export const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const { isLoading, error, data: stories } = useQuery({
    queryKey: ['stories'],
    queryFn: () => makeRequest.get('/stories').then((res) => res.data)
  });

  const checkScrollLimits = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    if (!isLoading && stories) {
      const timer = setTimeout(() => {
        checkScrollLimits();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [stories, isLoading]);

  const scrollClick = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 500;
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="stories-container">
      {showLeft && <div className="arrow left" onClick={() => scrollClick("left")}>{"<"}</div>}
      
      <div className="stories" ref={scrollRef} onScroll={checkScrollLimits}>
        <div className="story current-user-story">
          <img src={currentUser.profilePic} alt={currentUser.name} />
          <span>New Story</span>
          <button onClick={() => setOpenModal(true)}>+</button>
        </div>

        {error && <div className="story-message">Error loading stories</div>}
        {isLoading ? (
          <div className="story-loader"> <CircularProgress size={30} color="inherit" style={{ color: '#F43F5E' }} /> </div>
        ) : (
        stories?.map((story) => (
            <div className="story" key={story.id} onClick={() => setSelectedStory(story)} style={{ cursor: 'pointer' }}>
              {story.contentType === 'video' ? (
                <video src={story.contentUrl} muted playsInline />
              ) : (
                <img src={story.contentUrl} alt={story.name} />
              )}
              <span className="owner-name">{story.name}</span>
            </div>
          ))
        )}
      </div>

      {showRight && !isLoading && <div className="arrow right" onClick={() => scrollClick("right")}>{">"}</div>}

      {openModal && <AddStory setOpen={setOpenModal} />}
      {selectedStory && (<StoryViewer story={selectedStory} setOpen={setSelectedStory} />)}
    </div>
  );
};