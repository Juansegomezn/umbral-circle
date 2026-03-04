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
    location: user.location,
    website: user.website
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
        <h1>Update Your Profile</h1>
        <button className="btn-close" onClick={() => setOpenUpdate(false)}>
          X
        </button>
        <form onSubmit={handleUpdate}>
          <input type="text" placeholder={user.username} name='username' onChange={handleChange}/>
          <input type="text" placeholder={user.email} name='email' onChange={handleChange}/>
          <label>Cover Picture</label>
          <input type="file" onChange={(e) => setCoverPic(e.target.files[0])} />
          <label>Profile Picture</label>
          <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
          <input type="text" placeholder={user.name} name='name' onChange={handleChange}/>
          <input type="text" placeholder={user.location} name='location' onChange={handleChange}/>
          <input type="text" placeholder={user.website} name='website' onChange={handleChange}/>
          <button type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
}