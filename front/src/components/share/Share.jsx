import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import './share.scss'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ImageIcon from '@mui/icons-material/Image';
import MapIcon from '@mui/icons-material/Map';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import CancelIcon from '@mui/icons-material/Cancel';

export const Share = () => {
  const {currentUser} = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState("")
  const queryClient = useQueryClient();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log('Error uploading file', err);
    }
  };

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post('/posts', newPost)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
  })

  const handleShare = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert("Please enter a description before sharing.");
      return;
    }
    
    let imgUrl = '';
    if (file) { imgUrl = await upload(); }
    
    mutation.mutate({description, img: imgUrl})
    
    setDescription("");
    setFile(null);
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
            value={description}
          />
        </div>
        <hr />
        {file && (
          <div className="img-container">
            <img className="file-preview" alt="" src={URL.createObjectURL(file)} />
            <CancelIcon className="cancel-img" onClick={() => setFile(null)} />
          </div>
        )}
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
            <button onClick={handleShare} disabled={!description.trim()}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}
