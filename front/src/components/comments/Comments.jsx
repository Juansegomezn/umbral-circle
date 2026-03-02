import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import './comments.scss'
import { makeRequest } from '../../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

export const Comments = ({postId}) => {
  const {currentUser} = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['comments', postId], 
    queryFn: () =>
      makeRequest.get(`/comments?postId=${postId}`).then((res) => {
        return res.data;
      })
  })

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post('/comments', newComment)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId])
    }
  })

  const handleComment = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert("Please enter a description before sharing.");
      return;
    }

    mutation.mutate({ description, userId: currentUser.id, postId });
    setDescription('');
  }

  return (
    <div className='comments'>
      <div className="write">
        <img src={currentUser.profilePic} alt="Profile Image" />
        <input type="text" placeholder="Write a comment" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleComment}>Send</button>
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
