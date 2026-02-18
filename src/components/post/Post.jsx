import './post.scss'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Comments } from '../comments/Comments';

export const Post = ({post}) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const liked = false;

  return (
    <div className='post'>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="Profile Image" />
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{textDecoration:'none', color:'inherit'}}>
                <span className='name'>{post.name}</span>
              </Link>
              <span className='date'>{post.date}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img && <img src={post.img} alt="" />}
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {post.likes} Likes
          </div>
          <div className="item" onClick={() => {setCommentOpen(!commentOpen)}}>
            <SmsOutlinedIcon />
            {post.comments} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  )
}
