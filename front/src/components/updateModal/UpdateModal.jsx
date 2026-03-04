import { useState } from 'react';
import './updateModal.scss'
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const UpdateModal = ({ setOpenUpdate, user }) => {
  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [inputs, setInputs] = useState({
    username: user.username,
    email: user.email,
    name: user.name,
    location: user.location || '',
    website: user.website || ''
  })
  const queryClient = useQueryClient(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const upload = async (file) => {
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
    mutationFn: (user) => {
      return makeRequest.put('/users', user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users', user.id])
    }
  })

  const handleUpdate = async (e) => {
    e.preventDefault();

    let coverPicUrl = user.coverPic;
    let profilePicUrl = user.profilePic;

    if (coverPic) coverPicUrl = await upload(coverPic);
    if (profilePic) profilePicUrl = await upload(profilePic);
    
    mutation.mutate({...inputs, coverPic: coverPicUrl, profilePic: profilePicUrl})
    setOpenUpdate(false)
    setCoverPic(null)
    setProfilePic(null)
  }

  return (
    <div className="update-modal">
      <div className="wrapper">
        <div className="header">
          <h1>Update Your Profile</h1>
          <button className="btn-close" onClick={() => setOpenUpdate(false)}>X</button>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="img-container">
                <img 
                  src={
                    coverPic 
                      ? URL.createObjectURL(coverPic) 
                      : (user.coverPic?.includes("http") ? user.coverPic : "/upload/" + user.coverPic)
                  }
                  alt="Cover Preview" 
                />
              </div>
            </label>
            <input type="file" id="cover" style={{display: "none"}} onChange={(e) => setCoverPic(e.target.files[0])} />

            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="img-container profile">
                <img 
                  src={
                    profilePic 
                      ? URL.createObjectURL(profilePic) 
                      : (user.profilePic?.includes("http") ? user.profilePic : "/upload/" + user.profilePic)
                  }
                  alt="Profile Preview" 
                />
              </div>
            </label>
            <input type="file" id="profile" style={{display: "none"}} onChange={(e) => setProfilePic(e.target.files[0])} />
          </div>

          <div className="text-inputs">
            <div className="input-item">
              <label>Name</label>
              <input type="text" value={inputs.name} name='name' onChange={handleChange} />
            </div>
            <div className="input-item">
              <label>Location</label>
              <input type="text" value={inputs.location} name='location' onChange={handleChange} />
            </div>
            <div className="input-item">
              <label>Website</label>
              <input type="text" value={inputs.website} name='website' onChange={handleChange} />
            </div>
          </div>

          <button type='submit' className="btn-save">Save Changes</button>
        </form>
      </div>
    </div>
  );
}