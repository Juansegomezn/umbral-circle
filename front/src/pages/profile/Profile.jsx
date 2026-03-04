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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { UpdateModal } from '../../components/updateModal/UpdateModal';

export const Profile = () => {
  const { id } = useParams();
  const userId = Number(id);
  const {currentUser} = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [openUpdate, setOpenUpdate] = useState(false);

  const { isLoading, error, data: userData } = useQuery({
    queryKey: ['users', userId], 
    queryFn: () =>
      makeRequest.get(`/users/find/${userId}`).then((res) => {
        return res.data;
      })
  })

  const { data: relationshipsData } = useQuery({
    queryKey: ['relationships', userId], 
    queryFn: () =>
      makeRequest.get(`/relationships?followedUserId=${userId}`).then((res) => {
        return res.data;
      })
  })
  
  const isFollowing = relationshipsData?.includes(currentUser.id);

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return makeRequest.delete("/relationships", { params: { followedUserId: userId } });
      return makeRequest.post('/relationships', { followedUserId: userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['relationships', userId]);
    }
  })

  const handleFollow = () => {
    mutation.mutate(isFollowing);
  }

  return (
    <div className='profile'>
      <div className="images">
        <img className='cover' src={userData?.coverPic.includes("http") ? userData?.coverPic : "/upload/" + userData?.coverPic} alt="Background Image" />
        <img className='profile-pic' src={userData?.profilePic.includes("http") ? userData?.profilePic : "/upload/" + userData?.profilePic} alt="Profile Image" />
      </div>
      <div className="profile-container">
        <div className="us-info">
          <div className="left">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookRoundedIcon fontSize="large" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{userData?.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{userData?.location}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{userData?.website}</span>
              </div>
            </div>
            { currentUser.id === userId 
              ? <button className='btn-update' onClick={() => setOpenUpdate(true)}>Update</button>
              : 
              <button 
                className={isFollowing ? 'btn-unfollow' : ''} 
                onClick={handleFollow}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            }
          </div>
          <div className="right">
            <EmailIcon />
            <MoreVertOutlinedIcon />
          </div>
        </div>
      <Posts userId={userId}/>
      </div>
    {openUpdate && <UpdateModal setOpenUpdate={setOpenUpdate} user={userData} />}    
    </div>
  )
}
