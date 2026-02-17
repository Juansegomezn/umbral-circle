import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './comments.scss'

export const Comments = () => {
  const {currentUser} = useContext(AuthContext);

  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatum.",
      name: "John Doe",
      userId: 1,
      profilePic: "https://images.pexels.com/photos/4129015/pexels-photo-4129015.jpeg",
      likes: 32,
      date: "4 hours ago",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatum.",
      name: "Jane Doe",
      userId: 2,
      profilePic: "https://images.pexels.com/photos/5711923/pexels-photo-5711923.jpeg",
      likes: 3,
      date: "1 hour ago",
    },
  ];

  return (
    <div className='comments'>
      <div className="write">
        <img src={currentUser.profilePic} alt="Profile Image" />
        <input type="text" placeholder="Write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment) => (<>
        <div className="comment">
          <img src={comment.profilePic} alt="Profile Image" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{comment.date}</span>
        </div>
      </>))}
    </div>
  )
}
