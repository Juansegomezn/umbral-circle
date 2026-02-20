import './profile.scss'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Posts } from '../../components/posts/Posts';

export const Profile = () => {
  return (
    <div className='profile'>
      <div className="images">
        <img className='cover' src="https://images.pexels.com/photos/1435075/pexels-photo-1435075.jpeg" alt="Background Image" />
        <img className='profile-pic' src="https://images.pexels.com/photos/5711923/pexels-photo-5711923.jpeg" alt="Profile Image" />
      </div>
      <div className="profile-container">
        <div className="us-info">
          <div className="left">
            <a href="https://www.facebook.com">
              <FacebookRoundedIcon fontSize="large" />
            </a>
            <a href="https://www.instagram.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="https://www.twitter.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="https://www.linkedin.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="https://www.pinterest.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>Jane Doe</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>www.janedoe.com</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailIcon />
            <MoreVertOutlinedIcon />
          </div>
        </div>
      <Posts />
      </div>
    </div>
  )
}
