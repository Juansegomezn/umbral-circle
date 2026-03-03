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
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export const Profile = () => {
  const { id } = useParams();
  const userId = Number(id);
  const {currentUser} = useContext(AuthContext);
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['users', userId], 
    queryFn: () =>
      makeRequest.get(`/users/find/${userId}`).then((res) => {
        return res.data;
      })
  })

  return (
    <div className='profile'>
      <div className="images">
        <img className='cover' src={data?.coverPic} alt="Background Image" />
        <img className='profile-pic' src={data?.profilePic} alt="Profile Image" />
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
            <span>{data?.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data?.location}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data?.website}</span>
              </div>
            </div>
            { currentUser.id === userId 
              ? <button className='btn-update'>Update</button>
              : <button>Follow</button>
            }
          </div>
          <div className="right">
            <EmailIcon />
            <MoreVertOutlinedIcon />
          </div>
        </div>
      <Posts userId={userId}/>
      </div>
    </div>
  )
}
