import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './share.scss'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ImageIcon from '@mui/icons-material/Image';
import MapIcon from '@mui/icons-material/Map';

export const Share = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="item">
                <ImageIcon />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <PeopleAltIcon />
              <span>Tag Friends</span>
            </div>
            <div className="item">
              <MapIcon />
              <span>Add Place</span>
            </div>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}
