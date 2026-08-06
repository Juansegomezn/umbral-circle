import './navbar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import { getImageUrl } from '../../utils/getImageUrl';

export const Navbar = () => {
  const {toggle, darkMode} = useContext(DarkModeContext);
  const {currentUser, logout} = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchText.length < 2) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await makeRequest.get(`/users/search?name=${searchText}`);
        setSearchResults(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const timeoutId = setTimeout(fetchUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    setSearchText("");
    if (!showMobileSearch) setOpenMenu(false);
  };

  const toggleMobileMenu = () => {
    setOpenMenu(!openMenu);
    if (!openMenu) {
      setSearchText("");
      setShowMobileSearch(false);
    }
  };

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

      <div className="search-container">
        <div className={`search ${showMobileSearch ? "mobile-open" : ""}`}>
          {showMobileSearch 
            ? ( <CloseIcon onClick={toggleMobileSearch} className="close-icon" /> ) 
            : ( <SearchOutlinedIcon onClick={toggleMobileSearch} /> )
          }
          <input 
            type="text"
            placeholder='Search people...' 
            className={showMobileSearch ? "show" : ""}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((user) => (
              <div 
                key={user.id} 
                className="result-item" 
                onClick={() => {
                  setShowMobileSearch(false);
                  navigate(`/profile/${user.id}`);
                  setSearchText("");
                }}
              >
                <img src={getImageUrl(user?.coverPic, "defaultCoverPic.jpg")} alt="" />
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="right">
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <MenuOutlinedIcon />
        </div>
        {openMenu && (
          <div className="navbar-dropdown">
            <div className="user" onClick={() => {navigate(`/profile/${currentUser.id}`); setOpenMenu(false)}}>
              <img src={currentUser.profilePic} alt="" />
              <span>{currentUser.name}</span>
            </div>
            <hr />
            <div className="item" onClick={toggle}>
              { darkMode 
                ? <WbSunnyOutlinedIcon onClick={toggle}/>        
                : <BedtimeOutlinedIcon onClick={toggle}/>
              }
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </div>
            <div className="item" onClick={handleLogout}>
              <LogoutOutlinedIcon />
              <span>Logout</span>
            </div>
          </div>
        )}

        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsNoneOutlinedIcon />
        <div className="user" onClick={() => navigate(`/profile/${currentUser.id}`)}>
          <img src={currentUser.profilePic} alt="Profile Image" />
          <span>{currentUser.name}</span>
        </div>
        <LogoutOutlinedIcon onClick={handleLogout} className='logout-icon' />
      </div>
    </div>
  )
}
