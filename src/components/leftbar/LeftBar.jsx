import './leftBar.scss'
import FriendsIcon from '../../assets/friends.svg'
import GroupsIcon from '../../assets/groups.svg'
import MarketPlaceIcon from '../../assets/marketplace.svg'
import WatchIcon from '../../assets/watch.svg'
import MemoriesIcon from '../../assets/memories.svg'
import EventsIcon from '../../assets/events.svg'
import GamingIcon from '../../assets/gaming.svg'
import GalleryIcon from '../../assets/gallery.svg'
import VideosIcon from '../../assets/videos.svg'
import MessagesIcon from '../../assets/messages.svg'
import FundIcon from '../../assets/fundraiser.svg'
import TutorialsIcon from '../../assets/tutorials.svg'
import CoursesIcon from '../../assets/courses.svg'
import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'

export const LeftBar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className='leftBar'>
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={currentUser.profilePic} alt="Profile Image" />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={FriendsIcon} alt="Friends Icon" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={GroupsIcon} alt="Groups Icon" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={MarketPlaceIcon} alt="Marketplace Icon" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={WatchIcon} alt="Watch Icon" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={MemoriesIcon} alt="Memories Icon" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your Shortcuts</span>
          <div className="item">
            <img src={EventsIcon} alt="Events Icon" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={GamingIcon} alt="Gaming Icon" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={GalleryIcon} alt="Gallery Icon" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={VideosIcon} alt="Videos Icon" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={MessagesIcon} alt="Messages Icon" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={FundIcon} alt="Fund Icon" />
            <span>Fund</span>
          </div>
          <div className="item">
            <img src={TutorialsIcon} alt="Tutorials Icon" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={CoursesIcon} alt="Courses Icon" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  )
}