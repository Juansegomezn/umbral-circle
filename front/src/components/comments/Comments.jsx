import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './comments.scss'
import { makeRequest } from '../../axios';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

export const Comments = ({postId}) => {
  const {currentUser} = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ['comments', postId], 
    queryFn: () =>
      makeRequest.get(`/comments?postId=${postId}`).then((res) => {
        return res.data;
      })
  })

  console.log(data);
  

  return (
    <div className='comments'>
      <div className="write">
        <img src={currentUser.profilePic} alt="Profile Image" />
        <input type="text" placeholder="Write a comment" />
        <button>Send</button>
      </div>
      
      {isLoading && <p>Loading comments...</p>}
      {error && <p>Error loading comments: {error.message}</p>}
      {!isLoading && !error && (
        data?.length > 0 ? (
          data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic} alt={comment.name} />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.description}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet</p>
        )
      )}
    </div>
  )
}
