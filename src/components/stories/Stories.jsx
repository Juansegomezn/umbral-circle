import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './stories.scss'

export const Stories = () => {
  const {currentUser} = useContext(AuthContext);
  
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

  return (
    <div className='stories'>
      <div className="story" key={currentUser.id}>
        <img src={currentUser.profilePic} alt={currentUser.name} />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map(story => (
        <div className="story" key={story.id}>
          <img src={story.img} alt={story.name} />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}
