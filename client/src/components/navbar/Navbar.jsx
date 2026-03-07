import './navbar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export const Navbar = () => {
  const {toggle, darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/" style={{textDecoration:'none'}}>
          <span>Umbral Circle</span>
        </Link>
        <HomeOutlinedIcon />
        { darkMode 
          ? <WbSunnyOutlinedIcon onClick={toggle}/>        
          : <BedtimeOutlinedIcon onClick={toggle}/>
        }
        <AppsOutlinedIcon />
      </div>
      <div className="search">
        <SearchOutlinedIcon />
        <input type="text" placeholder='Search...' />
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsNoneOutlinedIcon />
        <div className="user">
          <img src={currentUser.profilePic} alt="Profile Image" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}
