import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import './share.scss'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ImageIcon from '@mui/icons-material/Image';
import MapIcon from '@mui/icons-material/Map';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

export const Share = () => {
  const {currentUser} = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState("")
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post('/posts', newPost)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
  })

  const handleShare = (e) => {
    e.preventDefault();
    mutation.mutate({description})
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input 
            type="text" 
            placeholder={`What's on your mind ${currentUser.name}?`} 
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input 
              type="file" 
              id="file" 
              style={{display:"none"}} 
              onChange={(e) => setFile(e.target.files[0])}
            />
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
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}
