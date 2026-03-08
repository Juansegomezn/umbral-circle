import './post.scss'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Comments } from '../comments/Comments';
import moment from 'moment';
import { makeRequest } from '../../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export const Post = ({post}) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {currentUser} = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['likes', post.id], 
    queryFn: () =>
      makeRequest.get(`/likes?postId=${post.id}`).then((res) => {
        return res.data;
      })
  })

  const likeMutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes", { params: { postId: post.id } });
      return makeRequest.post('/likes', { postId: post.id });
    },
    // Step 1: Update state optimistically before the server responds
    onMutate: async (liked) => {
      await queryClient.cancelQueries({ queryKey: ['likes', post.id] });

      const previousLikes = queryClient.getQueryData(['likes', post.id]);

      queryClient.setQueryData(['likes', post.id], (old) => {
        if (liked) {
          return old.filter((like) => like.userId !== currentUser.id);
        }
        return [...(old || []), { userId: currentUser.id, postId: post.id }];
      });

      return { previousLikes };
    },
    // Step 2: If the server returns an error
    onError: (err, liked, context) => {
      queryClient.setQueryData(['likes', post.id], context.previousLikes);
    },
    // Step 3: Regardless of the outcome, synchronize with the reality
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', post.id] });
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete(`/posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  })

  const handleLike = () => {
    const isLiked = data?.some(like => like.userId === currentUser.id);
    likeMutation.mutate(isLiked);
  }

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  }
  
  return (
    <div className='post'>
      <div className="container">
        <div className="user">
          <div className="user-info">
            <img src={post.profilePic} alt="Profile Image" />
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{textDecoration:'none', color:'inherit'}}>
                <span className='name'>{post.name}</span>
              </Link>
              <span className='date'>{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {post.userId === currentUser.id && (
            <div className="more">
              <MoreHorizIcon className='more-icon' onClick={() => setMenuOpen(!menuOpen)} />
              {menuOpen && (
                <>
                  <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
                  <div className="delete-container" onClick={handleDelete}>
                    <DeleteOutlineIcon className="delete-icon" />
                    <span>Delete</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="content">
          <p>{post.description}</p>
          {post.img && (
            <img 
              src={post.img.includes("http") ? post.img : "/upload/" + post.img} 
              alt="Post content" 
            />
          )}
        </div>
        <div className="info">
          <div className="item" onClick={handleLike}>
            {data?.some(like => like.userId === currentUser.id) 
              ? <FavoriteOutlinedIcon style={{color:'#F43F5E'}}/> 
              : <FavoriteBorderOutlinedIcon />
            }
            {data?.length || 0} Likes
          </div>
          <div className="item" onClick={() => {setCommentOpen(!commentOpen)}}>
            <SmsOutlinedIcon />
            {post.commentCount} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id}/>}
      </div>
    </div>
  )
}
