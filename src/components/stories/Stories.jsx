import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import './stories.scss'

export const Stories = () => {
  const {currentUser} = useContext(AuthContext);
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  
  // Dummy Data
  const stories = [
    {
      id: 1,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/18178432/pexels-photo-18178432.jpeg',
    },
    {
      id: 2,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/18178432/pexels-photo-18178432.jpeg',
    },
    {
      id: 3,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/18178432/pexels-photo-18178432.jpeg',
    },
    {
      id: 4,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/28862962/pexels-photo-28862962.jpeg',
    },
    {
      id: 3,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/18178432/pexels-photo-18178432.jpeg',
    },
    {
      id: 4,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/18178432/pexels-photo-18178432.jpeg',
    },
    {
      id: 3,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/18178432/pexels-photo-18178432.jpeg',
    },
    {
      id: 4,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/18178432/pexels-photo-18178432.jpeg',
    },
    {
      id: 3,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/18178432/pexels-photo-18178432.jpeg',
    },
    {
      id: 4,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/18178432/pexels-photo-18178432.jpeg',
    },
  ];

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

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
      <div className="stories" ref={scrollRef} onScroll={handleScroll}>
        <div className="story" key={currentUser.id}>
          <img src={currentUser.profilePic} alt={currentUser.name} />
          <span>{currentUser.name}</span>
          <button>+</button>
        </div>
        {stories.map((story) => (
          <div className="story" key={story.id}>
            <img src={story.img} alt={story.name} />
            <span>{story.name}</span>
          </div>
        ))}
      </div>
      {showRight && <div className="arrow right" onClick={() => scrollClick("right")}>{">"}</div>}
    </div>
  );
}
